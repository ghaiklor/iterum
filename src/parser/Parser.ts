import { ArrayExpression } from "../ast/expression/ArrayExpression";
import { AssignmentExpression } from "../ast/expression/AssignmentExpression";
import { BinaryExpression } from "../ast/expression/BinaryExpression";
import { CallExpression } from "../ast/expression/CallExpression";
import { ConditionalExpression } from "../ast/expression/ConditionalExpression";
import { Expression } from "../ast/expression/Expression";
import { MemberExpression } from "../ast/expression/MemberExpression";
import { NewExpression } from "../ast/expression/NewExpression";
import { ObjectExpression } from "../ast/expression/ObjectExpression";
import { SequenceExpression } from "../ast/expression/SequenceExpression";
import { ThisExpression } from "../ast/expression/ThisExpression";
import { UnaryExpression } from "../ast/expression/UnaryExpression";
import { UpdateExpression } from "../ast/expression/UpdateExpression";
import { Identifier } from "../ast/Identifier";
import { Literal } from "../ast/Literal";
import { Node } from "../ast/Node";
import { Program } from "../ast/Program";
import { Property } from "../ast/Property";
import { ExpressionStatement } from "../ast/statement/ExpressionStatement";
import { Scanner } from "../scanner/Scanner";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";

export class Parser {
  public static parse(source: string): Node {
    return new Parser(source).program();
  }

  private scanner: Scanner;
  private currentToken: Token;
  constructor(source: string) {
    this.scanner = new Scanner(source);
    this.currentToken = this.scanner.next();
  }

  /**
   * Eats the specified token if it the same as the current token.
   * Otherwise, it would means that you have expected the other token.
   *
   * @param tokenToEat What type of the token to eat
   */
  private eat(tokenToEat: TokenType): Parser {
    if (this.currentToken.is(tokenToEat)) {
      this.currentToken = this.scanner.next();
    } else {
      throw new Error(
        `Expected ${tokenToEat} at ${this.scanner.location.line}:${this.scanner.location.column}, ` +
        `but got ${this.currentToken.type}`,
      );
    }

    return this;
  }

  // ----------------------------- //
  // --- GRAMMAR (EXPRESSIONS) --- //
  // ----------------------------- //
  private identifierName(): Identifier {
    const identifier = new Identifier(this.currentToken.code);
    this.eat(TokenType.IDENTIFIER);

    return identifier;
  }

  private numericLiteral(): Literal {
    const token = this.currentToken;

    if (token.is(TokenType.DECIMAL_LITERAL)) {
      this.eat(TokenType.DECIMAL_LITERAL);
      return new Literal(parseFloat(token.code), token.code);
    } else if (token.is(TokenType.HEXADECIMAL_LITERAL)) {
      this.eat(TokenType.HEXADECIMAL_LITERAL);
      return new Literal(parseInt(token.code.slice(2), 16), token.code);
    } else if (token.is(TokenType.OCTAL_LITERAL)) {
      this.eat(TokenType.OCTAL_LITERAL);
      return new Literal(parseInt(token.code.slice(2), 8), token.code);
    } else {
      this.eat(TokenType.BINARY_LITERAL);
      return new Literal(parseInt(token.code.slice(2), 2), token.code);
    }
  }

  private literal(): Literal {
    const token = this.currentToken;

    if (token.is(TokenType.NULL_LITERAL)) {
      this.eat(TokenType.NULL_LITERAL);
      return new Literal(null, "null");
    } else if (token.is(TokenType.BOOLEAN_LITERAL)) {
      this.eat(TokenType.BOOLEAN_LITERAL);
      return new Literal(token.code === "true" ? true : false, token.code);
    } else if (token.is(TokenType.STRING_LITERAL)) {
      this.eat(TokenType.STRING_LITERAL);
      return new Literal(token.code, token.code);
    } else {
      return this.numericLiteral();
    }
  }

  private arrayLiteral(): ArrayExpression {
    this.eat(TokenType.LEFT_SQUARE_BRACKETS);
    if (this.currentToken.is(TokenType.RIGHT_SQUARE_BRACKETS)) {
      this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
      return new ArrayExpression([]);
    }

    const elements = this.elementList();
    this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
    return new ArrayExpression(elements);
  }

  private elementList(): Expression[] {
    const expressions = [this.singleExpression()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      expressions.push(this.singleExpression());
    }

    return expressions;
  }

  private objectLiteral(): ObjectExpression {
    this.eat(TokenType.LEFT_CURLY_BRACES);
    if (this.currentToken.is(TokenType.RIGHT_CURLY_BRACES)) {
      this.eat(TokenType.RIGHT_CURLY_BRACES);
      return new ObjectExpression([]);
    }

    const properties = [this.propertyAssignment()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      properties.push(this.propertyAssignment());
    }

    this.eat(TokenType.RIGHT_CURLY_BRACES);
    return new ObjectExpression(properties);
  }

  private propertyAssignment(): Property {
    const key = this.propertyName();

    if (this.currentToken.is(TokenType.COLON)) {
      this.eat(TokenType.COLON);
      const value = this.singleExpression();
      return new Property(key, value);
    }

    return new Property(key, key);
  }

  private propertyName(): Identifier | Literal {
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      return this.identifierName();
    } else {
      return this.literal();
    }
  }

  private arguments(): Expression[] {
    this.eat(TokenType.LEFT_PARENTHESIS);
    if (this.currentToken.is(TokenType.RIGHT_PARENTHESIS)) {
      this.eat(TokenType.RIGHT_PARENTHESIS);
      return [];
    }

    const args = [this.singleExpression()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      args.push(this.singleExpression());
    }

    this.eat(TokenType.RIGHT_PARENTHESIS);

    return args;
  }

  private primaryExpression(): Expression {
    const LITERAL_TOKENS = [
      TokenType.BINARY_LITERAL,
      TokenType.BOOLEAN_LITERAL,
      TokenType.DECIMAL_LITERAL,
      TokenType.NULL_LITERAL,
      TokenType.HEXADECIMAL_LITERAL,
      TokenType.OCTAL_LITERAL,
      TokenType.STRING_LITERAL,
    ];

    if (this.currentToken.is(TokenType.THIS)) {
      this.eat(TokenType.THIS);
      return new ThisExpression();
    } else if (this.currentToken.is(TokenType.IDENTIFIER)) {
      return this.identifierName();
    } else if (this.currentToken.isSomeOf(LITERAL_TOKENS)) {
      return this.literal();
    } else if (this.currentToken.is(TokenType.LEFT_SQUARE_BRACKETS)) {
      return this.arrayLiteral();
    } else if (this.currentToken.is(TokenType.LEFT_CURLY_BRACES)) {
      return this.objectLiteral();
    } else if (this.currentToken.is(TokenType.FUNCTION)) {
      // TODO: implement
      // return this.functionExpression();
    } else if (this.currentToken.is(TokenType.CLASS)) {
      // TODO: implement
      // return this.classExpression();
    } else if (this.currentToken.is(TokenType.LEFT_PARENTHESIS)) {
      this.eat(TokenType.LEFT_PARENTHESIS);
      const expression = this.expression();
      this.eat(TokenType.RIGHT_PARENTHESIS);

      return expression;
    }

    throw new Error(
      `Unexpected ${this.currentToken.code} ` +
      `at ${this.scanner.location.line}:${this.scanner.location.column}`,
    );
  }

  private memberExpression(): MemberExpression | Expression {
    const object = this.primaryExpression();

    if (this.currentToken.is(TokenType.LEFT_SQUARE_BRACKETS)) {
      this.eat(TokenType.LEFT_SQUARE_BRACKETS);
      const property = this.singleExpression();
      this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
      return new MemberExpression(this.memberExpression(), property);
    } else if (this.currentToken.is(TokenType.DOT)) {
      this.eat(TokenType.DOT);
      const property = this.identifierName();
      return new MemberExpression(this.memberExpression(), property);
    }

    return object;
  }

  private callExpression(): CallExpression | Expression {
    const callee = this.memberExpression();

    if (this.currentToken.is(TokenType.LEFT_PARENTHESIS)) {
      return new CallExpression(this.callExpression(), this.arguments());
    }

    return callee;
  }

  private newExpression(): NewExpression | Expression {
    if (this.currentToken.is(TokenType.NEW)) {
      this.eat(TokenType.NEW);
      return new NewExpression(this.newExpression(), this.arguments());
    } else {
      return this.callExpression();
    }
  }

  private postfixExpression(): UpdateExpression | Expression {
    const argument = this.newExpression();

    if (this.currentToken.is(TokenType.PLUS_PLUS)) {
      this.eat(TokenType.PLUS_PLUS);
      return new UpdateExpression(argument, "++", false);
    } else if (this.currentToken.is(TokenType.MINUS_MINUS)) {
      this.eat(TokenType.MINUS_MINUS);
      return new UpdateExpression(argument, "--", false);
    }

    return argument;
  }

  private unaryExpression(): UnaryExpression | Expression {
    if (this.currentToken.is(TokenType.NOT)) {
      this.eat(TokenType.NOT);
      return new UnaryExpression(this.unaryExpression(), "!", true);
    } else if (this.currentToken.is(TokenType.BITWISE_NOT)) {
      this.eat(TokenType.BITWISE_NOT);
      return new UnaryExpression(this.unaryExpression(), "~", true);
    } else if (this.currentToken.is(TokenType.MINUS)) {
      this.eat(TokenType.MINUS);
      return new UnaryExpression(this.unaryExpression(), "-", true);
    } else if (this.currentToken.is(TokenType.PLUS)) {
      this.eat(TokenType.PLUS);
      return new UnaryExpression(this.unaryExpression(), "+", true);
    } else if (this.currentToken.is(TokenType.MINUS_MINUS)) {
      this.eat(TokenType.MINUS_MINUS);
      return new UpdateExpression(this.unaryExpression(), "--", true);
    } else if (this.currentToken.is(TokenType.PLUS_PLUS)) {
      this.eat(TokenType.PLUS_PLUS);
      return new UpdateExpression(this.unaryExpression(), "++", true);
    } else if (this.currentToken.is(TokenType.TYPE_OF)) {
      this.eat(TokenType.TYPE_OF);
      return new UnaryExpression(this.unaryExpression(), "typeof", true);
    } else if (this.currentToken.is(TokenType.VOID)) {
      this.eat(TokenType.VOID);
      return new UnaryExpression(this.unaryExpression(), "void", true);
    } else if (this.currentToken.is(TokenType.DELETE)) {
      this.eat(TokenType.DELETE);
      return new UnaryExpression(this.unaryExpression(), "delete", true);
    } else {
      return this.postfixExpression();
    }
  }

  private multiplicativeExpression(): BinaryExpression | Expression {
    const left = this.unaryExpression();

    if (this.currentToken.is(TokenType.MULTIPLY)) {
      this.eat(TokenType.MULTIPLY);
      return new BinaryExpression(left, "*", this.multiplicativeExpression());
    } else if (this.currentToken.is(TokenType.DIVIDE)) {
      this.eat(TokenType.DIVIDE);
      return new BinaryExpression(left, "/", this.multiplicativeExpression());
    } else if (this.currentToken.is(TokenType.MODULUS)) {
      this.eat(TokenType.MODULUS);
      return new BinaryExpression(left, "%", this.multiplicativeExpression());
    }

    return left;
  }

  private additiveExpression(): BinaryExpression | Expression {
    const left = this.multiplicativeExpression();

    if (this.currentToken.is(TokenType.MINUS)) {
      this.eat(TokenType.MINUS);
      return new BinaryExpression(left, "-", this.additiveExpression());
    } else if (this.currentToken.is(TokenType.PLUS)) {
      this.eat(TokenType.PLUS);
      return new BinaryExpression(left, "+", this.additiveExpression());
    }

    return left;
  }

  private shiftExpression(): BinaryExpression | Expression {
    const left = this.additiveExpression();

    if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ZERO)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO);
      return new BinaryExpression(left, ">>>", this.shiftExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT);
      return new BinaryExpression(left, ">>", this.shiftExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_LEFT_SHIFT)) {
      this.eat(TokenType.BITWISE_LEFT_SHIFT);
      return new BinaryExpression(left, "<<", this.shiftExpression());
    }

    return left;
  }

  private relationalExpression(): BinaryExpression | Expression {
    const left = this.shiftExpression();

    if (this.currentToken.is(TokenType.LESS_THAN)) {
      this.eat(TokenType.LESS_THAN);
      return new BinaryExpression(left, "<", this.relationalExpression());
    } else if (this.currentToken.is(TokenType.GREATER_THAN)) {
      this.eat(TokenType.GREATER_THAN);
      return new BinaryExpression(left, ">", this.relationalExpression());
    } else if (this.currentToken.is(TokenType.LESS_THAN_OR_EQUAL)) {
      this.eat(TokenType.LESS_THAN_OR_EQUAL);
      return new BinaryExpression(left, "<=", this.relationalExpression());
    } else if (this.currentToken.is(TokenType.GREATER_THAN_OR_EQUAL)) {
      this.eat(TokenType.GREATER_THAN_OR_EQUAL);
      return new BinaryExpression(left, ">=", this.relationalExpression());
    }

    return left;
  }

  private instanceofExpression(): BinaryExpression | Expression {
    const left = this.relationalExpression();

    if (this.currentToken.is(TokenType.INSTANCE_OF)) {
      this.eat(TokenType.INSTANCE_OF);
      return new BinaryExpression(left, "instanceof", this.instanceofExpression());
    }

    return left;
  }

  private inExpression(): BinaryExpression | Expression {
    const left = this.instanceofExpression();

    if (this.currentToken.is(TokenType.IN)) {
      this.eat(TokenType.IN);
      return new BinaryExpression(left, "in", this.inExpression());
    }

    return left;
  }

  private equalityExpression(): BinaryExpression | Expression {
    const left = this.inExpression();

    if (this.currentToken.is(TokenType.EQUAL)) {
      this.eat(TokenType.EQUAL);
      return new BinaryExpression(left, "==", this.equalityExpression());
    } else if (this.currentToken.is(TokenType.NOT_EQUAL)) {
      this.eat(TokenType.NOT_EQUAL);
      return new BinaryExpression(left, "!=", this.equalityExpression());
    } else if (this.currentToken.is(TokenType.STRICT_EQUAL)) {
      this.eat(TokenType.STRICT_EQUAL);
      return new BinaryExpression(left, "===", this.equalityExpression());
    } else if (this.currentToken.is(TokenType.NOT_STRICT_EQUAL)) {
      this.eat(TokenType.NOT_STRICT_EQUAL);
      return new BinaryExpression(left, "!==", this.equalityExpression());
    }

    return left;
  }

  private bitwiseAndExpression(): BinaryExpression | Expression {
    const left = this.equalityExpression();

    if (this.currentToken.is(TokenType.BITWISE_AND)) {
      this.eat(TokenType.BITWISE_AND);
      return new BinaryExpression(left, "&", this.bitwiseAndExpression());
    }

    return left;
  }

  private bitwiseXorExpression(): BinaryExpression | Expression {
    const left = this.bitwiseAndExpression();

    if (this.currentToken.is(TokenType.BITWISE_XOR)) {
      this.eat(TokenType.BITWISE_XOR);
      return new BinaryExpression(left, "^", this.bitwiseXorExpression());
    }

    return left;
  }

  private bitwiseOrExpression(): BinaryExpression | Expression {
    const left = this.bitwiseXorExpression();

    if (this.currentToken.is(TokenType.BITWISE_OR)) {
      this.eat(TokenType.BITWISE_OR);
      return new BinaryExpression(left, "|", this.bitwiseOrExpression());
    }

    return left;
  }

  private logicalAndExpression(): BinaryExpression | Expression {
    const left = this.bitwiseOrExpression();

    if (this.currentToken.is(TokenType.AND)) {
      this.eat(TokenType.AND);
      return new BinaryExpression(left, "&&", this.logicalAndExpression());
    }

    return left;
  }

  private logicalOrExpression(): BinaryExpression | Expression {
    const left = this.logicalAndExpression();

    if (this.currentToken.is(TokenType.OR)) {
      this.eat(TokenType.OR);
      return new BinaryExpression(left, "||", this.logicalOrExpression());
    }

    return left;
  }

  private conditionalExpression(): ConditionalExpression | Expression {
    const test = this.logicalOrExpression();

    if (this.currentToken.is(TokenType.QUESTION_MARK)) {
      this.eat(TokenType.QUESTION_MARK);
      const consequent = this.singleExpression();
      this.eat(TokenType.COLON);
      const alternate = this.singleExpression();

      return new ConditionalExpression(test, consequent, alternate);
    }

    return test;
  }

  private assignmentExpression(): AssignmentExpression | Expression {
    const left = this.conditionalExpression();

    if (this.currentToken.is(TokenType.ASSIGN)) {
      this.eat(TokenType.ASSIGN);
      return new AssignmentExpression(left, "=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.MULTIPLY_ASSIGN)) {
      this.eat(TokenType.MULTIPLY_ASSIGN);
      return new AssignmentExpression(left, "*=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.DIVIDE_ASSIGN)) {
      this.eat(TokenType.DIVIDE_ASSIGN);
      return new AssignmentExpression(left, "/=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.MODULUS_ASSIGN)) {
      this.eat(TokenType.MODULUS_ASSIGN);
      return new AssignmentExpression(left, "%=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.PLUS_ASSIGN)) {
      this.eat(TokenType.PLUS_ASSIGN);
      return new AssignmentExpression(left, "+=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.MINUS_ASSIGN)) {
      this.eat(TokenType.MINUS_ASSIGN);
      return new AssignmentExpression(left, "-=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_LEFT_SHIFT_ASSIGN)) {
      this.eat(TokenType.BITWISE_LEFT_SHIFT_ASSIGN);
      return new AssignmentExpression(left, "<<=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN);
      return new AssignmentExpression(left, ">>=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN);
      return new AssignmentExpression(left, ">>>=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_AND_ASSIGN)) {
      this.eat(TokenType.BITWISE_AND_ASSIGN);
      return new AssignmentExpression(left, "&=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_XOR_ASSIGN)) {
      this.eat(TokenType.BITWISE_XOR_ASSIGN);
      return new AssignmentExpression(left, "^=", this.assignmentExpression());
    } else if (this.currentToken.is(TokenType.BITWISE_OR_ASSIGN)) {
      this.eat(TokenType.BITWISE_OR_ASSIGN);
      return new AssignmentExpression(left, "|=", this.assignmentExpression());
    }

    return left;
  }

  private singleExpression(): Expression {
    return this.assignmentExpression();
  }

  private expression(): Expression {
    const expressions = [this.singleExpression()];

    if (this.currentToken.is(TokenType.COMMA)) {
      while (this.currentToken.is(TokenType.COMMA)) {
        this.eat(TokenType.COMMA);
        expressions.push(this.singleExpression());
      }

      return new SequenceExpression(expressions);
    }

    return expressions[0];
  }

  // ---------------------------- //
  // --- GRAMMAR (STATEMENTS) --- //
  // ---------------------------- //
  private expressionStatement(): ExpressionStatement {
    const statement = new ExpressionStatement(this.expression());
    if (this.currentToken.is(TokenType.SEMICOLON)) {
      this.eat(TokenType.SEMICOLON);
    }

    return statement;
  }

  private statement() {
    const BLACKLIST_TOKENS = [
      TokenType.LEFT_CURLY_BRACES,
      TokenType.FUNCTION,
      TokenType.CLASS,
      TokenType.LET,
      TokenType.LEFT_SQUARE_BRACKETS,
    ];

    if (!this.currentToken.isSomeOf(BLACKLIST_TOKENS)) {
      return this.expressionStatement();
    }

    return this.expressionStatement();
  }

  private program(): Program {
    return new Program([this.statement()]);
  }
}

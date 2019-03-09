import { ArrayExpression } from "../ast/ArrayExpression";
import { AssignmentExpression } from "../ast/AssignmentExpression";
import { BinaryExpression } from "../ast/BinaryExpression";
import { CallExpression } from "../ast/CallExpression";
import { ConditionalExpression } from "../ast/ConditionalExpression";
import { Expression } from "../ast/Expression";
import { Identifier } from "../ast/Identifier";
import { Literal } from "../ast/Literal";
import { MemberExpression } from "../ast/MemberExpression";
import { NewExpression } from "../ast/NewExpression";
import { Node } from "../ast/Node";
import { ObjectExpression } from "../ast/ObjectExpression";
import { Property } from "../ast/Property";
import { SequenceExpression } from "../ast/SequenceExpression";
import { ThisExpression } from "../ast/ThisExpression";
import { UnaryExpression } from "../ast/UnaryExpression";
import { UpdateExpression } from "../ast/UpdateExpression";
import { Lexer } from "../lexer/Lexer";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";

export class Parser {
  public static parse(source: string): Node {
    return new Parser(source).expression();
  }

  private lexer: Lexer;
  private currentToken: Token;
  constructor(source: string) {
    this.lexer = new Lexer(source);
    this.currentToken = this.lexer.next();
  }

  /**
   * Eats the specified token if it the same as the current token.
   * Otherwise, it would means that you have expected the other token.
   *
   * @param tokenToEat What type of the token to eat
   */
  private eat(tokenToEat: TokenType): Parser {
    if (this.currentToken.is(tokenToEat)) {
      this.currentToken = this.lexer.next();
    } else {
      throw new Error(
        `Expected ${tokenToEat} at ${this.lexer.location.line}:${this.lexer.location.column}, ` +
        `but got ${this.currentToken.type}`,
      );
    }

    return this;
  }

  // ---         --- //
  // --- GRAMMAR --- //
  // ---         --- //
  private identifier(): Identifier {
    const identifier = new Identifier(this.currentToken.code);
    this.eat(TokenType.IDENTIFIER);

    return identifier;
  }

  private primaryExpression(): Expression {
    if (this.currentToken.is(TokenType.THIS)) {
      this.eat(TokenType.THIS);
      return new ThisExpression();
    } else if (this.currentToken.is(TokenType.IDENTIFIER)) {
      return this.identifier();
    } else if (this.currentToken.isSomeOf([
      TokenType.NULL_LITERAL,
      TokenType.BOOLEAN_LITERAL,
      TokenType.NUMBER_LITERAL,
      TokenType.STRING_LITERAL])
    ) {
      return this.literal();
    } else if (this.currentToken.is(TokenType.LEFT_SQUARE_BRACKETS)) {
      return this.arrayLiteral();
    } else if (this.currentToken.is(TokenType.LEFT_CURLY_BRACES)) {
      return this.objectLiteral();
    } else if (this.currentToken.is(TokenType.FUNCTION)) {
      // TODO: impl
      // return this.functionExpression();
    } else if (this.currentToken.is(TokenType.CLASS)) {
      // TODO: impl
      // return this.classExpression();
    } else if (this.currentToken.is(TokenType.LEFT_PARENTHESIS)) {
      this.eat(TokenType.LEFT_PARENTHESIS);
      const expression = this.expression();
      this.eat(TokenType.RIGHT_PARENTHESIS);

      return expression;
    }

    throw new Error(
      `Unexpected ${this.currentToken.code} ` +
      `at ${this.lexer.location.line}:${this.lexer.location.column}`,
    );
  }

  private literal(): Literal {
    const token = this.currentToken;

    if (token.is(TokenType.NULL_LITERAL)) {
      this.eat(TokenType.NULL_LITERAL);
      return new Literal(null, "null");
    } else if (token.is(TokenType.BOOLEAN_LITERAL)) {
      this.eat(TokenType.BOOLEAN_LITERAL);
      return new Literal(!!token.code, token.code);
    } else if (token.is(TokenType.NUMBER_LITERAL)) {
      this.eat(TokenType.NUMBER_LITERAL);
      return new Literal(parseFloat(token.code), token.code);
    } else {
      this.eat(TokenType.STRING_LITERAL);
      return new Literal(token.code, token.code);
    }
  }

  private arrayLiteral(): ArrayExpression {
    this.eat(TokenType.LEFT_SQUARE_BRACKETS);
    const elements = this.elementList();
    this.eat(TokenType.RIGHT_SQUARE_BRACKETS);

    return new ArrayExpression(elements);
  }

  private elementList(): Expression[] {
    const expressions = [this.assignmentExpression()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      expressions.push(this.assignmentExpression());
    }

    return expressions;
  }

  private objectLiteral(): ObjectExpression {
    this.eat(TokenType.LEFT_CURLY_BRACES);
    const properties = this.propertyDefinitionList();
    this.eat(TokenType.RIGHT_CURLY_BRACES);

    return new ObjectExpression(properties);
  }

  private propertyDefinitionList(): Property[] {
    const properties = [this.propertyDefinition()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      properties.push(this.propertyDefinition());
    }

    return properties;
  }

  private propertyDefinition(): Property {
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      const identifier = this.identifier();
      return new Property(identifier, identifier);
    } else {
      const key = this.literal();
      this.eat(TokenType.COLON);
      const value = this.assignmentExpression();

      return new Property(key, value);
    }
  }

  private memberExpression(): MemberExpression | Expression {
    const object = this.primaryExpression();

    if (this.currentToken.is(TokenType.LEFT_SQUARE_BRACKETS)) {
      this.eat(TokenType.LEFT_SQUARE_BRACKETS);
      const property = this.expression();
      this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
      return new MemberExpression(object, property);
    } else if (this.currentToken.is(TokenType.DOT)) {
      this.eat(TokenType.DOT);
      const property = this.identifier();
      return new MemberExpression(object, property);
    }

    return object;
  }

  private newExpression(): NewExpression | Expression {
    if (this.currentToken.is(TokenType.NEW)) {
      this.eat(TokenType.NEW);
      return this.newExpression();
    } else {
      return this.memberExpression();
    }
  }

  private callExpression(): CallExpression | Expression {
    const callee = this.memberExpression();
    const args = this.arguments();

    return new CallExpression(callee, args);
  }

  private arguments(): Expression[] {
    this.eat(TokenType.LEFT_PARENTHESIS);
    if (this.currentToken.is(TokenType.RIGHT_PARENTHESIS)) {
      this.eat(TokenType.RIGHT_PARENTHESIS);
      return [];
    }

    const args = this.argumentList();
    this.eat(TokenType.RIGHT_PARENTHESIS);

    return args;
  }

  private argumentList(): Expression[] {
    const args = [this.assignmentExpression()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      args.push(this.assignmentExpression());
    }

    return args;
  }

  private leftHandSideExpression(): Expression {
    if (this.currentToken.is(TokenType.NEW)) {
      return this.newExpression();
    } else {
      return this.callExpression();
    }
  }

  private postfixExpression(): UpdateExpression | Expression {
    const argument = this.leftHandSideExpression();

    if (this.currentToken.is(TokenType.INCREMENT)) {
      this.eat(TokenType.INCREMENT);
      return new UpdateExpression(argument, "++", false);
    } else if (this.currentToken.is(TokenType.DECREMENT)) {
      this.eat(TokenType.DECREMENT);
      return new UpdateExpression(argument, "--", false);
    }

    return argument;
  }

  private unaryExpression(): UnaryExpression | Expression {
    if (this.currentToken.is(TokenType.EXCLAMATION_MARK)) {
      this.eat(TokenType.EXCLAMATION_MARK);
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
    } else if (this.currentToken.is(TokenType.DECREMENT)) {
      this.eat(TokenType.DECREMENT);
      return new UpdateExpression(this.unaryExpression(), "--", true);
    } else if (this.currentToken.is(TokenType.INCREMENT)) {
      this.eat(TokenType.INCREMENT);
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
    const right = this.unaryExpression();

    if (this.currentToken.is(TokenType.ASTERISK)) {
      this.eat(TokenType.ASTERISK);
      return new BinaryExpression(this.multiplicativeExpression(), "*", right);
    } else if (this.currentToken.is(TokenType.SLASH)) {
      this.eat(TokenType.SLASH);
      return new BinaryExpression(this.multiplicativeExpression(), "/", right);
    } else if (this.currentToken.is(TokenType.PERCENT)) {
      this.eat(TokenType.PERCENT);
      return new BinaryExpression(this.multiplicativeExpression(), "%", right);
    }

    return right;
  }

  private additiveExpression(): BinaryExpression | Expression {
    const right = this.multiplicativeExpression();

    if (this.currentToken.is(TokenType.MINUS)) {
      this.eat(TokenType.MINUS);
      return new BinaryExpression(this.additiveExpression(), "-", right);
    } else if (this.currentToken.is(TokenType.PLUS)) {
      this.eat(TokenType.PLUS);
      return new BinaryExpression(this.additiveExpression(), "+", right);
    }

    return right;
  }

  private shiftExpression(): BinaryExpression | Expression {
    const right = this.additiveExpression();

    if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ZERO)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO);
      return new BinaryExpression(this.shiftExpression(), ">>>", right);
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT);
      return new BinaryExpression(this.shiftExpression(), ">>", right);
    } else if (this.currentToken.is(TokenType.BITWISE_LEFT_SHIFT)) {
      this.eat(TokenType.BITWISE_LEFT_SHIFT);
      return new BinaryExpression(this.shiftExpression(), "<<", right);
    }

    return right;
  }

  private relationalExpression(): BinaryExpression | Expression {
    const right = this.shiftExpression();

    if (this.currentToken.is(TokenType.LESS_THAN)) {
      this.eat(TokenType.LESS_THAN);
      return new BinaryExpression(this.relationalExpression(), "<", right);
    } else if (this.currentToken.is(TokenType.GREATER_THAN)) {
      this.eat(TokenType.GREATER_THAN);
      return new BinaryExpression(this.relationalExpression(), ">", right);
    } else if (this.currentToken.is(TokenType.LESS_THAN_OR_EQUAL)) {
      this.eat(TokenType.LESS_THAN_OR_EQUAL);
      return new BinaryExpression(this.relationalExpression(), "<=", right);
    } else if (this.currentToken.is(TokenType.GREATER_THAN_OR_EQUAL)) {
      this.eat(TokenType.GREATER_THAN_OR_EQUAL);
      return new BinaryExpression(this.relationalExpression(), ">=", right);
    } else if (this.currentToken.is(TokenType.INSTANCE_OF)) {
      this.eat(TokenType.INSTANCE_OF);
      return new BinaryExpression(this.relationalExpression(), "instanceof", right);
    }

    return right;
  }

  private equalityExpression(): BinaryExpression | Expression {
    const right = this.relationalExpression();

    if (this.currentToken.is(TokenType.EQUAL)) {
      this.eat(TokenType.EQUAL);
      return new BinaryExpression(this.equalityExpression(), "==", right);
    } else if (this.currentToken.is(TokenType.NOT_EQUAL)) {
      this.eat(TokenType.NOT_EQUAL);
      return new BinaryExpression(this.equalityExpression(), "!=", right);
    } else if (this.currentToken.is(TokenType.STRICT_EQUAL)) {
      this.eat(TokenType.STRICT_EQUAL);
      return new BinaryExpression(this.equalityExpression(), "===", right);
    } else if (this.currentToken.is(TokenType.NOT_STRICT_EQUAL)) {
      this.eat(TokenType.NOT_STRICT_EQUAL);
      return new BinaryExpression(this.equalityExpression(), "!==", right);
    }

    return right;
  }

  private bitwiseAndExpression(): BinaryExpression | Expression {
    const right = this.equalityExpression();

    if (this.currentToken.is(TokenType.BITWISE_AND)) {
      this.eat(TokenType.BITWISE_AND);
      return new BinaryExpression(this.bitwiseAndExpression(), "&", right);
    }

    return right;
  }

  private bitwiseXorExpression(): BinaryExpression | Expression {
    const right = this.bitwiseAndExpression();

    if (this.currentToken.is(TokenType.BITWISE_XOR)) {
      this.eat(TokenType.BITWISE_XOR);
      return new BinaryExpression(this.bitwiseXorExpression(), "^", right);
    }

    return right;
  }

  private bitwiseOrExpression(): BinaryExpression | Expression {
    const right = this.bitwiseXorExpression();

    if (this.currentToken.is(TokenType.BITWISE_OR)) {
      this.eat(TokenType.BITWISE_OR);
      return new BinaryExpression(this.bitwiseOrExpression(), "|", right);
    }

    return right;
  }

  private logicalAndExpression(): BinaryExpression | Expression {
    const right = this.bitwiseOrExpression();

    if (this.currentToken.is(TokenType.AND)) {
      this.eat(TokenType.AND);
      return new BinaryExpression(this.logicalAndExpression(), "&&", right);
    }

    return right;
  }

  private logicalOrExpression(): BinaryExpression | Expression {
    const right = this.logicalAndExpression();

    if (this.currentToken.is(TokenType.OR)) {
      this.eat(TokenType.OR);
      return new BinaryExpression(this.logicalOrExpression(), "||", right);
    }

    return right;
  }

  private conditionalExpression(): ConditionalExpression | Expression {
    const test = this.logicalOrExpression();

    if (this.currentToken.is(TokenType.QUESTION_MARK)) {
      this.eat(TokenType.QUESTION_MARK);
      const consequent = this.assignmentExpression();
      this.eat(TokenType.COLON);
      const alternate = this.assignmentExpression();

      return new ConditionalExpression(test, consequent, alternate);
    }

    return test;
  }

  private assignmentExpression(): AssignmentExpression | Expression {
    return this.conditionalExpression();
  }

  private expression(): Expression {
    const expression = this.assignmentExpression();

    if (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      return new SequenceExpression([expression].concat(this.expression()));
    }

    return expression;
  }
}

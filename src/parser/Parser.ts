import { IArrayExpression } from "../ast/expressions/ArrayExpression";
import { IAssignmentExpression } from "../ast/expressions/AssignmentExpression";
import { IBinaryExpression } from "../ast/expressions/BinaryExpression";
import { ICallExpression } from "../ast/expressions/CallExpression";
import { IConditionalExpression } from "../ast/expressions/ConditionalExpression";
import { IExpression } from "../ast/expressions/Expression";
import { ILogicalExpression } from "../ast/expressions/LogicalExpression";
import { IMemberExpression } from "../ast/expressions/MemberExpression";
import { INewExpression } from "../ast/expressions/NewExpression";
import { IObjectExpression } from "../ast/expressions/ObjectExpression";
import { ISequenceExpression } from "../ast/expressions/SequenceExpression";
import { IThisExpression } from "../ast/expressions/ThisExpression";
import { IUnaryExpression } from "../ast/expressions/UnaryExpression";
import { IUpdateExpression } from "../ast/expressions/UpdateExpression";
import { IIdentifer } from "../ast/miscellaneous/Identifier";
import { ILiteral } from "../ast/miscellaneous/Literal";
import { IProperty } from "../ast/miscellaneous/Property";
import { IProgram } from "../ast/programs/Program";
import { IExpressionStatement } from "../ast/statements/ExpressionStatement";
import { IStatement } from "../ast/statements/Statement";
import { Scanner } from "../scanner/Scanner";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";

export class Parser {
  public static parse(source: string): IProgram {
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
  private identifierName(): IIdentifer {
    const identifier = { name: this.currentToken.code } as IIdentifer;
    this.eat(TokenType.IDENTIFIER);

    return identifier;
  }

  private numericLiteral(): ILiteral {
    const token = this.currentToken;

    if (token.is(TokenType.DECIMAL_LITERAL)) {
      this.eat(TokenType.DECIMAL_LITERAL);
      return { value: parseFloat(token.code), raw: token.code, loc: null, type: "Literal" } as ILiteral;
    } else if (token.is(TokenType.HEXADECIMAL_LITERAL)) {
      this.eat(TokenType.HEXADECIMAL_LITERAL);
      return { value: parseInt(token.code.slice(2), 16), raw: token.code, loc: null, type: "Literal" } as ILiteral;
    } else if (token.is(TokenType.OCTAL_LITERAL)) {
      this.eat(TokenType.OCTAL_LITERAL);
      return { value: parseInt(token.code.slice(2), 8), raw: token.code, loc: null, type: "Literal" } as ILiteral;
    } else {
      this.eat(TokenType.BINARY_LITERAL);
      return { value: parseInt(token.code.slice(2), 2), raw: token.code, loc: null, type: "Literal" } as ILiteral;
    }
  }

  private literal(): ILiteral {
    const token = this.currentToken;

    if (token.is(TokenType.NULL_LITERAL)) {
      this.eat(TokenType.NULL_LITERAL);
      return { value: null, raw: "null", type: "Literal", loc: null } as ILiteral;
    } else if (token.is(TokenType.BOOLEAN_LITERAL)) {
      this.eat(TokenType.BOOLEAN_LITERAL);
      return { value: token.code === "true" ? true : false, raw: token.code, type: "Literal", loc: null } as ILiteral;
    } else if (token.is(TokenType.STRING_LITERAL)) {
      this.eat(TokenType.STRING_LITERAL);
      return { value: token.code, raw: token.code, type: "Literal", loc: null } as ILiteral;
    } else {
      return this.numericLiteral();
    }
  }

  private arrayLiteral(): IArrayExpression {
    this.eat(TokenType.LEFT_SQUARE_BRACKETS);
    if (this.currentToken.is(TokenType.RIGHT_SQUARE_BRACKETS)) {
      this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
      return {} as IArrayExpression;
    }

    const elements = this.elementList();
    this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
    return { elements } as IArrayExpression;
  }

  private elementList(): IExpression[] {
    const expressions = [this.singleExpression()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      expressions.push(this.singleExpression());
    }

    return expressions;
  }

  private objectLiteral(): IObjectExpression {
    this.eat(TokenType.LEFT_CURLY_BRACES);
    if (this.currentToken.is(TokenType.RIGHT_CURLY_BRACES)) {
      this.eat(TokenType.RIGHT_CURLY_BRACES);
      return {} as IObjectExpression;
    }

    const properties = [this.propertyAssignment()];
    while (this.currentToken.is(TokenType.COMMA)) {
      this.eat(TokenType.COMMA);
      properties.push(this.propertyAssignment());
    }

    this.eat(TokenType.RIGHT_CURLY_BRACES);
    return { properties } as IObjectExpression;
  }

  private propertyAssignment(): IProperty {
    const key = this.propertyName();

    if (this.currentToken.is(TokenType.COLON)) {
      this.eat(TokenType.COLON);
      const value = this.singleExpression();
      return { key, value } as IProperty;
    }

    return { key, value: key, loc: null, type: "Property", kind: "init" } as IProperty;
  }

  private propertyName(): IIdentifer | ILiteral {
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      return this.identifierName();
    } else {
      return this.literal();
    }
  }

  private arguments(): IExpression[] {
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

  private primaryExpression(): IExpression {
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
      return {} as IThisExpression;
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

  private memberExpression(): IMemberExpression | IExpression {
    const object = this.primaryExpression();

    if (this.currentToken.is(TokenType.LEFT_SQUARE_BRACKETS)) {
      this.eat(TokenType.LEFT_SQUARE_BRACKETS);
      const property = this.singleExpression();
      this.eat(TokenType.RIGHT_SQUARE_BRACKETS);
      return { object: this.memberExpression(), property } as IMemberExpression;
    } else if (this.currentToken.is(TokenType.DOT)) {
      this.eat(TokenType.DOT);
      const property = this.identifierName();
      return { object: this.memberExpression(), property } as IMemberExpression;
    }

    return object;
  }

  private callExpression(): ICallExpression | IExpression {
    const callee = this.memberExpression();

    if (this.currentToken.is(TokenType.LEFT_PARENTHESIS)) {
      return { callee: this.callExpression(), arguments: this.arguments() } as ICallExpression;
    }

    return callee;
  }

  private newExpression(): INewExpression | IExpression {
    if (this.currentToken.is(TokenType.NEW)) {
      this.eat(TokenType.NEW);
      return { callee: this.newExpression(), arguments: this.arguments() } as INewExpression;
    } else {
      return this.callExpression();
    }
  }

  private postfixExpression(): IUpdateExpression | IExpression {
    const argument = this.newExpression();

    if (this.currentToken.is(TokenType.PLUS_PLUS)) {
      this.eat(TokenType.PLUS_PLUS);
      return { argument, operator: "++", prefix: false } as IUpdateExpression;
    } else if (this.currentToken.is(TokenType.MINUS_MINUS)) {
      this.eat(TokenType.MINUS_MINUS);
      return { argument, operator: "--", prefix: false } as IUpdateExpression;
    }

    return argument;
  }

  private unaryExpression(): IUnaryExpression | IUpdateExpression | IExpression {
    if (this.currentToken.is(TokenType.NOT)) {
      this.eat(TokenType.NOT);
      return { argument: this.unaryExpression(), operator: "!", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_NOT)) {
      this.eat(TokenType.BITWISE_NOT);
      return { argument: this.unaryExpression(), operator: "~", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.MINUS)) {
      this.eat(TokenType.MINUS);
      return { argument: this.unaryExpression(), operator: "-", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.PLUS)) {
      this.eat(TokenType.PLUS);
      return { argument: this.unaryExpression(), operator: "+", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.MINUS_MINUS)) {
      this.eat(TokenType.MINUS_MINUS);
      return { argument: this.unaryExpression(), operator: "--", prefix: true } as IUpdateExpression;
    } else if (this.currentToken.is(TokenType.PLUS_PLUS)) {
      this.eat(TokenType.PLUS_PLUS);
      return { argument: this.unaryExpression(), operator: "++", prefix: true } as IUpdateExpression;
    } else if (this.currentToken.is(TokenType.TYPE_OF)) {
      this.eat(TokenType.TYPE_OF);
      return { argument: this.unaryExpression(), operator: "typeof", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.VOID)) {
      this.eat(TokenType.VOID);
      return { argument: this.unaryExpression(), operator: "void", prefix: true } as IUnaryExpression;
    } else if (this.currentToken.is(TokenType.DELETE)) {
      this.eat(TokenType.DELETE);
      return { argument: this.unaryExpression(), operator: "delete", prefix: true } as IUnaryExpression;
    } else {
      return this.postfixExpression();
    }
  }

  private multiplicativeExpression(): IBinaryExpression | IExpression {
    const left = this.unaryExpression();

    if (this.currentToken.is(TokenType.MULTIPLY)) {
      this.eat(TokenType.MULTIPLY);
      return { left, operator: "*", right: this.multiplicativeExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.DIVIDE)) {
      this.eat(TokenType.DIVIDE);
      return { left, operator: "/", right: this.multiplicativeExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.MODULUS)) {
      this.eat(TokenType.MODULUS);
      return { left, operator: "%", right: this.multiplicativeExpression() } as IBinaryExpression;
    }

    return left;
  }

  private additiveExpression(): IBinaryExpression | IExpression {
    const left = this.multiplicativeExpression();

    if (this.currentToken.is(TokenType.MINUS)) {
      this.eat(TokenType.MINUS);
      return { left, operator: "-", right: this.additiveExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.PLUS)) {
      this.eat(TokenType.PLUS);
      return { left, operator: "+", right: this.additiveExpression() } as IBinaryExpression;
    }

    return left;
  }

  private shiftExpression(): IBinaryExpression | IExpression {
    const left = this.additiveExpression();

    if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ZERO)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO);
      return { left, operator: ">>>", right: this.shiftExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT);
      return { left, operator: ">>", right: this.shiftExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_LEFT_SHIFT)) {
      this.eat(TokenType.BITWISE_LEFT_SHIFT);
      return { left, operator: "<<", right: this.shiftExpression() } as IBinaryExpression;
    }

    return left;
  }

  private relationalExpression(): IBinaryExpression | IExpression {
    const left = this.shiftExpression();

    if (this.currentToken.is(TokenType.LESS_THAN)) {
      this.eat(TokenType.LESS_THAN);
      return { left, operator: "<", right: this.relationalExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.GREATER_THAN)) {
      this.eat(TokenType.GREATER_THAN);
      return { left, operator: ">", right: this.relationalExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.LESS_THAN_OR_EQUAL)) {
      this.eat(TokenType.LESS_THAN_OR_EQUAL);
      return { left, operator: "<=", right: this.relationalExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.GREATER_THAN_OR_EQUAL)) {
      this.eat(TokenType.GREATER_THAN_OR_EQUAL);
      return { left, operator: ">=", right: this.relationalExpression() } as IBinaryExpression;
    }

    return left;
  }

  private instanceofExpression(): IBinaryExpression | IExpression {
    const left = this.relationalExpression();

    if (this.currentToken.is(TokenType.INSTANCE_OF)) {
      this.eat(TokenType.INSTANCE_OF);
      return { left, operator: "instanceof", right: this.instanceofExpression() } as IBinaryExpression;
    }

    return left;
  }

  private inExpression(): IBinaryExpression | IExpression {
    const left = this.instanceofExpression();

    if (this.currentToken.is(TokenType.IN)) {
      this.eat(TokenType.IN);
      return { left, operator: "in", right: this.inExpression() } as IBinaryExpression;
    }

    return left;
  }

  private equalityExpression(): IBinaryExpression | IExpression {
    const left = this.inExpression();

    if (this.currentToken.is(TokenType.EQUAL)) {
      this.eat(TokenType.EQUAL);
      return { left, operator: "==", right: this.equalityExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.NOT_EQUAL)) {
      this.eat(TokenType.NOT_EQUAL);
      return { left, operator: "!=", right: this.equalityExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.STRICT_EQUAL)) {
      this.eat(TokenType.STRICT_EQUAL);
      return { left, operator: "===", right: this.equalityExpression() } as IBinaryExpression;
    } else if (this.currentToken.is(TokenType.NOT_STRICT_EQUAL)) {
      this.eat(TokenType.NOT_STRICT_EQUAL);
      return { left, operator: "!==", right: this.equalityExpression() } as IBinaryExpression;
    }

    return left;
  }

  private bitwiseAndExpression(): IBinaryExpression | IExpression {
    const left = this.equalityExpression();

    if (this.currentToken.is(TokenType.BITWISE_AND)) {
      this.eat(TokenType.BITWISE_AND);
      return { left, operator: "&", right: this.bitwiseAndExpression() } as IBinaryExpression;
    }

    return left;
  }

  private bitwiseXorExpression(): IBinaryExpression | IExpression {
    const left = this.bitwiseAndExpression();

    if (this.currentToken.is(TokenType.BITWISE_XOR)) {
      this.eat(TokenType.BITWISE_XOR);
      return { left, operator: "^", right: this.bitwiseXorExpression() } as IBinaryExpression;
    }

    return left;
  }

  private bitwiseOrExpression(): IBinaryExpression | IExpression {
    const left = this.bitwiseXorExpression();

    if (this.currentToken.is(TokenType.BITWISE_OR)) {
      this.eat(TokenType.BITWISE_OR);
      return { left, operator: "|", right: this.bitwiseOrExpression() } as IBinaryExpression;
    }

    return left;
  }

  private logicalAndExpression(): ILogicalExpression | IExpression {
    const left = this.bitwiseOrExpression();

    if (this.currentToken.is(TokenType.AND)) {
      this.eat(TokenType.AND);
      return { left, operator: "&&", right: this.logicalAndExpression() } as ILogicalExpression;
    }

    return left;
  }

  private logicalOrExpression(): ILogicalExpression | IExpression {
    const left = this.logicalAndExpression();

    if (this.currentToken.is(TokenType.OR)) {
      this.eat(TokenType.OR);
      return { left, operator: "||", right: this.logicalOrExpression() } as ILogicalExpression;
    }

    return left;
  }

  private conditionalExpression(): IConditionalExpression | IExpression {
    const test = this.logicalOrExpression();

    if (this.currentToken.is(TokenType.QUESTION_MARK)) {
      this.eat(TokenType.QUESTION_MARK);
      const consequent = this.singleExpression();
      this.eat(TokenType.COLON);
      const alternate = this.singleExpression();

      return { test, consequent, alternate } as IConditionalExpression;
    }

    return test;
  }

  private assignmentExpression(): IAssignmentExpression | IExpression {
    const left = this.conditionalExpression();

    if (this.currentToken.is(TokenType.ASSIGN)) {
      this.eat(TokenType.ASSIGN);
      return { left, operator: "=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.MULTIPLY_ASSIGN)) {
      this.eat(TokenType.MULTIPLY_ASSIGN);
      return { left, operator: "*=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.DIVIDE_ASSIGN)) {
      this.eat(TokenType.DIVIDE_ASSIGN);
      return { left, operator: "/=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.MODULUS_ASSIGN)) {
      this.eat(TokenType.MODULUS_ASSIGN);
      return { left, operator: "%=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.PLUS_ASSIGN)) {
      this.eat(TokenType.PLUS_ASSIGN);
      return { left, operator: "+=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.MINUS_ASSIGN)) {
      this.eat(TokenType.MINUS_ASSIGN);
      return { left, operator: "-=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_LEFT_SHIFT_ASSIGN)) {
      this.eat(TokenType.BITWISE_LEFT_SHIFT_ASSIGN);
      return { left, operator: "<<=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN);
      return { left, operator: ">>=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN)) {
      this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN);
      return { left, operator: ">>>=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_AND_ASSIGN)) {
      this.eat(TokenType.BITWISE_AND_ASSIGN);
      return { left, operator: "&=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_XOR_ASSIGN)) {
      this.eat(TokenType.BITWISE_XOR_ASSIGN);
      return { left, operator: "^=", right: this.assignmentExpression() } as IAssignmentExpression;
    } else if (this.currentToken.is(TokenType.BITWISE_OR_ASSIGN)) {
      this.eat(TokenType.BITWISE_OR_ASSIGN);
      return { left, operator: "|=", right: this.assignmentExpression() } as IAssignmentExpression;
    }

    return left;
  }

  private singleExpression(): IExpression {
    return this.assignmentExpression();
  }

  private expression(): IExpression {
    const expressions = [this.singleExpression()];

    if (this.currentToken.is(TokenType.COMMA)) {
      while (this.currentToken.is(TokenType.COMMA)) {
        this.eat(TokenType.COMMA);
        expressions.push(this.singleExpression());
      }

      return { expressions } as ISequenceExpression;
    }

    return expressions[0];
  }

  // ---------------------------- //
  // --- GRAMMAR (STATEMENTS) --- //
  // ---------------------------- //
  private expressionStatement(): IExpressionStatement {
    const statement = { expression: this.expression() } as IExpressionStatement;
    if (this.currentToken.is(TokenType.SEMICOLON)) {
      this.eat(TokenType.SEMICOLON);
    }

    return statement;
  }

  private statement(): IStatement {
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

  private program(): IProgram {
    return { body: [this.statement()] } as IProgram;
  }
}

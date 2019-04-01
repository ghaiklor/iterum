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
import { AssignmentOperator } from "../ast/miscellaneous/AssignmentOperator";
import { BinaryOperator } from "../ast/miscellaneous/BinaryOperator";
import { IIdentifier } from "../ast/miscellaneous/Identifier";
import { ILiteral } from "../ast/miscellaneous/Literal";
import { LogicalOperator } from "../ast/miscellaneous/LogicalOperator";
import { IProperty } from "../ast/miscellaneous/Property";
import { UnaryOperator } from "../ast/miscellaneous/UnaryOperator";
import { UpdateOperator } from "../ast/miscellaneous/UpdateOperator";
import { INode } from "../ast/node/Node";
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
   * Check if token is expected and if so -> eat it and return true.
   * Otherwise, it will not throw an error and just return false.
   *
   * @param tokenToEat Expected token to eat
   */
  private eat(tokenToEat: TokenType): boolean {
    if (this.currentToken.is(tokenToEat)) {
      this.currentToken = this.scanner.next();
      return true;
    }

    return false;
  }

  /**
   * Eats the specified token if it the same as the current token.
   * Otherwise, it would means that you have expected the other token.
   *
   * @param expectedToken What type of the token to eat
   */
  private expect(expectedToken: TokenType): Parser {
    if (this.currentToken.is(expectedToken)) {
      this.currentToken = this.scanner.next();
    } else {
      throw new Error(
        `Expected ${expectedToken} at ${this.scanner.location.line}:${this.scanner.location.column}, ` +
        `but got ${this.currentToken.type}`,
      );
    }

    return this;
  }

  /**
   * Creates a new AST node and fills in required properties.
   *
   * @param type Node type
   */
  private openNode<T extends INode>(type: T["type"]): T {
    return { type, loc: null } as T;
  }

  /**
   * Closes the created AST node.
   *
   * @param node AST node to close
   */
  private closeNode<T>(node: T): T {
    return node;
  }

  // ----------------------------- //
  // --- GRAMMAR (EXPRESSIONS) --- //
  // ----------------------------- //
  private identifierName(): IIdentifier {
    const node = this.openNode<IIdentifier>("Identifier");
    node.name = this.currentToken.code;
    this.expect(TokenType.IDENTIFIER);

    return this.closeNode(node);
  }

  private numericLiteral(): ILiteral {
    const node = this.openNode<ILiteral>("Literal");
    const token = this.currentToken;

    node.raw = token.code;
    if (this.eat(TokenType.DECIMAL_LITERAL)) {
      node.value = parseFloat(token.code);
      return this.closeNode(node);
    } else if (this.eat(TokenType.HEXADECIMAL_LITERAL)) {
      node.value = parseInt(token.code.slice(2), 16);
      return this.closeNode(node);
    } else if (this.eat(TokenType.OCTAL_LITERAL)) {
      node.value = parseInt(token.code.slice(2), 8);
      return this.closeNode(node);
    } else {
      this.expect(TokenType.BINARY_LITERAL);
      node.value = parseInt(token.code.slice(2), 2);
      return this.closeNode(node);
    }
  }

  private literal(): ILiteral {
    const node = this.openNode<ILiteral>("Literal");
    const token = this.currentToken;

    node.raw = token.code;
    if (this.eat(TokenType.NULL_LITERAL)) {
      node.value = null;
      return this.closeNode(node);
    } else if (this.eat(TokenType.BOOLEAN_LITERAL)) {
      node.value = token.code === "true";
      return this.closeNode(node);
    } else if (this.eat(TokenType.STRING_LITERAL)) {
      node.value = token.code;
      return this.closeNode(node);
    } else {
      return this.numericLiteral();
    }
  }

  private arrayLiteral(): IArrayExpression {
    const node = this.openNode<IArrayExpression>("ArrayExpression");
    node.elements = [];

    this.expect(TokenType.LEFT_SQUARE_BRACKETS);
    if (this.eat(TokenType.RIGHT_SQUARE_BRACKETS)) {
      return this.closeNode(node);
    }

    node.elements = this.elementList();
    this.expect(TokenType.RIGHT_SQUARE_BRACKETS);

    return this.closeNode(node);
  }

  private elementList(): IExpression[] {
    const expressions = [this.singleExpression()];
    while (this.eat(TokenType.COMMA)) {
      expressions.push(this.singleExpression());
    }

    return expressions;
  }

  private objectLiteral(): IObjectExpression {
    const node = this.openNode<IObjectExpression>("ObjectExpression");
    node.properties = [];

    this.expect(TokenType.LEFT_CURLY_BRACES);
    if (this.eat(TokenType.RIGHT_CURLY_BRACES)) {
      return this.closeNode(node);
    }

    node.properties = [this.propertyAssignment()];
    while (this.eat(TokenType.COMMA)) {
      node.properties.push(this.propertyAssignment());
    }

    this.expect(TokenType.RIGHT_CURLY_BRACES);
    return this.closeNode(node);
  }

  private propertyAssignment(): IProperty {
    const node = this.openNode<IProperty>("Property");
    node.key = this.propertyName();
    node.value = node.key;
    node.kind = "init";

    if (this.eat(TokenType.COLON)) {
      node.value = this.singleExpression();
      return this.closeNode(node);
    }

    return this.closeNode(node);
  }

  private propertyName(): IIdentifier | ILiteral {
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      return this.identifierName();
    } else {
      return this.literal();
    }
  }

  private arguments(): IExpression[] {
    this.expect(TokenType.LEFT_PARENTHESIS);
    if (this.eat(TokenType.RIGHT_PARENTHESIS)) {
      return [];
    }

    const args = [this.singleExpression()];
    while (this.eat(TokenType.COMMA)) {
      args.push(this.singleExpression());
    }

    this.expect(TokenType.RIGHT_PARENTHESIS);

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

    if (this.eat(TokenType.THIS)) {
      const node = this.openNode<IThisExpression>("ThisExpression");
      return this.closeNode(node);
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
    } else if (this.eat(TokenType.LEFT_PARENTHESIS)) {
      const expression = this.expression();
      this.expect(TokenType.RIGHT_PARENTHESIS);

      return expression;
    }

    throw new Error(
      `Unexpected ${this.currentToken.code} ` +
      `at ${this.scanner.location.line}:${this.scanner.location.column}`,
    );
  }

  private memberExpression(): IMemberExpression | IExpression {
    const node = this.openNode<IMemberExpression>("MemberExpression");
    const object = this.primaryExpression();

    node.object = object;
    if (this.eat(TokenType.LEFT_SQUARE_BRACKETS)) {
      node.property = this.singleExpression();
      node.computed = false;
      this.expect(TokenType.RIGHT_SQUARE_BRACKETS);
      node.object = this.memberExpression();

      return this.closeNode(node);
    } else if (this.eat(TokenType.DOT)) {
      node.property = this.identifierName();
      node.computed = false;
      node.object = this.memberExpression();

      return this.closeNode(node);
    }

    return object;
  }

  private callExpression(): ICallExpression | IExpression {
    const node = this.openNode<ICallExpression>("CallExpression");
    const callee = this.memberExpression();

    if (this.currentToken.is(TokenType.LEFT_PARENTHESIS)) {
      node.callee = callee;
      node.arguments = this.arguments();

      return this.closeNode(node);
    }

    return callee;
  }

  private newExpression(): INewExpression | IExpression {
    if (this.eat(TokenType.NEW)) {
      const node = this.openNode<INewExpression>("NewExpression");
      node.callee = this.newExpression();
      node.arguments = this.arguments();
      return this.closeNode(node);
    } else {
      return this.callExpression();
    }
  }

  private postfixExpression(): IUpdateExpression | IExpression {
    const node = this.openNode<IUpdateExpression>("UpdateExpression");
    const argument = this.newExpression();

    node.argument = argument;
    if (this.eat(TokenType.PLUS_PLUS)) {
      node.operator = UpdateOperator.PLUS_PLUS;
      node.prefix = false;
      return this.closeNode(node);
    } else if (this.eat(TokenType.MINUS_MINUS)) {
      node.operator = UpdateOperator.MINUS_MINUS;
      node.prefix = false;
      return this.closeNode(node);
    }

    return argument;
  }

  private unaryExpression(): IUnaryExpression | IUpdateExpression | IExpression {
    if (this.eat(TokenType.NOT)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.NOT;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_NOT)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.BITWISE_NOT;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.MINUS)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.MINUS;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.PLUS;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.MINUS_MINUS)) {
      const node = this.openNode<IUpdateExpression>("UpdateExpression");
      node.argument = this.unaryExpression();
      node.operator = UpdateOperator.MINUS_MINUS;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS_PLUS)) {
      const node = this.openNode<IUpdateExpression>("UpdateExpression");
      node.argument = this.unaryExpression();
      node.operator = UpdateOperator.PLUS_PLUS;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.TYPE_OF)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.TYPE_OF;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.VOID)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.VOID;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.DELETE)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.DELETE;
      node.prefix = true;
      return this.closeNode(node);
    } else {
      return this.postfixExpression();
    }
  }

  private multiplicativeExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.unaryExpression();

    node.left = left;
    if (this.eat(TokenType.MULTIPLY)) {
      node.operator = BinaryOperator.MULTIPLY;
      node.right = this.multiplicativeExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.DIVIDE)) {
      node.operator = BinaryOperator.DIVIDE;
      node.right = this.multiplicativeExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.MODULUS)) {
      node.operator = BinaryOperator.MODULUS;
      node.right = this.multiplicativeExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private additiveExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.multiplicativeExpression();

    if (this.eat(TokenType.MINUS)) {
      node.left = left;
      node.operator = BinaryOperator.MINUS;
      node.right = this.additiveExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS)) {
      node.left = left;
      node.operator = BinaryOperator.PLUS;
      node.right = this.additiveExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private shiftExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.additiveExpression();

    node.left = left;
    if (this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO)) {
      node.operator = BinaryOperator.BITWISE_SHIFT_RIGHT_ZERO;
      node.right = this.shiftExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_RIGHT_SHIFT)) {
      node.operator = BinaryOperator.BITWISE_SHIFT_RIGHT;
      node.right = this.shiftExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_LEFT_SHIFT)) {
      node.operator = BinaryOperator.BITWISE_SHIFT_LEFT;
      node.right = this.shiftExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private relationalExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.shiftExpression();

    node.left = left;
    if (this.eat(TokenType.LESS_THAN)) {
      node.operator = BinaryOperator.LESS_THAN;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.GREATER_THAN)) {
      node.operator = BinaryOperator.GREATER_THAN;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.LESS_THAN_OR_EQUAL)) {
      node.operator = BinaryOperator.LESS_THAN_OR_EQUAL;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.GREATER_THAN_OR_EQUAL)) {
      node.operator = BinaryOperator.GREATER_THAN_OR_EQUAL;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private instanceofExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.relationalExpression();

    node.left = left;
    if (this.eat(TokenType.INSTANCE_OF)) {
      node.operator = BinaryOperator.INSTANCE_OF;
      node.right = this.instanceofExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private inExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.instanceofExpression();

    node.left = left;
    if (this.eat(TokenType.IN)) {
      node.operator = BinaryOperator.IN;
      node.right = this.inExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private equalityExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.inExpression();

    node.left = left;
    if (this.eat(TokenType.EQUAL)) {
      node.operator = BinaryOperator.EQUAL;
      node.right = this.equalityExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.NOT_EQUAL)) {
      node.operator = BinaryOperator.NOT_EQUAL;
      node.right = this.equalityExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.STRICT_EQUAL)) {
      node.operator = BinaryOperator.STRICT_EQUAL;
      node.right = this.equalityExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.NOT_STRICT_EQUAL)) {
      node.operator = BinaryOperator.NOT_STRICT_EQUAL;
      node.right = this.equalityExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private bitwiseAndExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.equalityExpression();

    node.left = left;
    if (this.eat(TokenType.BITWISE_AND)) {
      node.operator = BinaryOperator.BINARY_AND;
      node.right = this.bitwiseAndExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private bitwiseXorExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.bitwiseAndExpression();

    node.left = left;
    if (this.eat(TokenType.BITWISE_XOR)) {
      node.operator = BinaryOperator.BINARY_XOR;
      node.right = this.bitwiseXorExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private bitwiseOrExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.bitwiseXorExpression();

    node.left = left;
    if (this.eat(TokenType.BITWISE_OR)) {
      node.operator = BinaryOperator.BINARY_OR;
      node.right = this.bitwiseOrExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private logicalAndExpression(): ILogicalExpression | IExpression {
    const node = this.openNode<ILogicalExpression>("LogicalExpression");
    const left = this.bitwiseOrExpression();

    node.left = left;
    if (this.eat(TokenType.AND)) {
      node.operator = LogicalOperator.AND;
      node.right = this.logicalAndExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private logicalOrExpression(): ILogicalExpression | IExpression {
    const node = this.openNode<ILogicalExpression>("LogicalExpression");
    const left = this.logicalAndExpression();

    node.left = left;
    if (this.eat(TokenType.OR)) {
      node.operator = LogicalOperator.OR;
      node.right = this.logicalOrExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private conditionalExpression(): IConditionalExpression | IExpression {
    const node = this.openNode<IConditionalExpression>("ConditionalExpression");
    const test = this.logicalOrExpression();

    node.test = test;
    if (this.eat(TokenType.QUESTION_MARK)) {
      node.consequent = this.singleExpression();
      this.expect(TokenType.COLON);
      node.alternate = this.singleExpression();

      return this.closeNode(node);
    }

    return test;
  }

  private assignmentExpression(): IAssignmentExpression | IExpression {
    const node = this.openNode<IAssignmentExpression>("AssignmentExpression");
    const left = this.conditionalExpression();

    node.left = left;
    if (this.eat(TokenType.ASSIGN)) {
      node.operator = AssignmentOperator.ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.MULTIPLY_ASSIGN)) {
      node.operator = AssignmentOperator.MULTIPLY_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.DIVIDE_ASSIGN)) {
      node.operator = AssignmentOperator.DIVIDE_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.MODULUS_ASSIGN)) {
      node.operator = AssignmentOperator.MODULUS_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS_ASSIGN)) {
      node.operator = AssignmentOperator.PLUS_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.MINUS_ASSIGN)) {
      node.operator = AssignmentOperator.MINUS_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_LEFT_SHIFT_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_SHIFT_LEFT_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_RIGHT_SHIFT_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_SHIFT_RIGHT_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_RIGHT_SHIFT_ZERO_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_SHIFT_RIGHT_ZERO_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_AND_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_AND_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_XOR_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_XOR_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_OR_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_OR_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private singleExpression(): IExpression {
    return this.assignmentExpression();
  }

  private expression(): IExpression {
    const node = this.openNode<ISequenceExpression>("SequenceExpression");
    node.expressions = [this.singleExpression()];

    while (this.eat(TokenType.COMMA)) {
      node.expressions.push(this.singleExpression());
    }

    return node.expressions.length === 1 ? node.expressions[0] : this.closeNode(node);
  }

  // ---------------------------- //
  // --- GRAMMAR (STATEMENTS) --- //
  // ---------------------------- //
  private expressionStatement(): IExpressionStatement {
    const node = this.openNode<IExpressionStatement>("ExpressionStatement");
    node.expression = this.expression();
    this.eat(TokenType.SEMICOLON);

    return this.closeNode(node);
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
    const node = this.openNode<IProgram>("Program");
    node.body = [this.statement()];

    return this.closeNode(node);
  }
}

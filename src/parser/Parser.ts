import { ICatchClause } from "../ast/clauses/CatchClause";
import { ISwitchCase } from "../ast/clauses/SwitchCase";
import { IClassDeclaration } from "../ast/declarations/ClassDeclaration";
import { IDeclaration } from "../ast/declarations/Declaration";
import { IFunctionDeclaration } from "../ast/declarations/FunctionDeclaration";
import { IVariableDeclaration } from "../ast/declarations/VariableDeclaration";
import { IVariableDeclarator } from "../ast/declarations/VariableDeclarator";
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
import { IArrayPattern } from "../ast/patterns/ArrayPattern";
import { IObjectPattern } from "../ast/patterns/ObjectPattern";
import { IProgram } from "../ast/programs/Program";
import { IBlockStatement } from "../ast/statements/BlockStatement";
import { IBreakStatement } from "../ast/statements/BreakStatement";
import { IContinueStatement } from "../ast/statements/ContinueStatement";
import { IDebuggerStatement } from "../ast/statements/DebuggerStatement";
import { IDoWhileStatement } from "../ast/statements/DoWhileStatement";
import { IEmptyStatement } from "../ast/statements/EmptyStatement";
import { IExpressionStatement } from "../ast/statements/ExpressionStatement";
import { IForInStatement } from "../ast/statements/ForInStatement";
import { IForOfStatement } from "../ast/statements/ForOfStatement";
import { IForStatement } from "../ast/statements/ForStatement";
import { IIfStatement } from "../ast/statements/IfStatement";
import { IReturnStatement } from "../ast/statements/ReturnStatement";
import { IStatement } from "../ast/statements/Statement";
import { ISwitchStatement } from "../ast/statements/SwitchStatement";
import { IThrowStatement } from "../ast/statements/ThrowStatement";
import { ITryStatement } from "../ast/statements/TryStatement";
import { IWithStatement } from "../ast/statements/WithStatement";
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
   * Throws an error about unexpected token.
   *
   * @throws {Error}
   */
  private unexpected<T>(): T {
    throw new Error(
      `Unexpected ${this.currentToken.code} ` +
      `at ${this.scanner.location.line}:${this.scanner.location.column}`,
    );
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
  private identifier(): IIdentifier {
    const token = this.currentToken;
    this.expect(TokenType.IDENTIFIER);

    const node = this.openNode<IIdentifier>("Identifier");
    node.name = token.code;

    return this.closeNode(node);
  }

  private identifierReference(): IIdentifier {
    return this.identifier();
  }

  private bindingIdentifier(): IIdentifier {
    return this.identifier();
  }

  private labelIdentifier(): IIdentifier {
    return this.identifier();
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
      return this.identifierReference();
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
      this.expect(TokenType.LEFT_PARENTHESIS);
      const expression = this.expression();
      this.expect(TokenType.RIGHT_PARENTHESIS);

      return expression;
    }

    return this.unexpected();
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
    } else if (this.eat(TokenType.DECIMAL_LITERAL)) {
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
    const expressions = [this.assignmentExpression()];
    while (this.eat(TokenType.COMMA)) {
      expressions.push(this.assignmentExpression());
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

    node.properties = this.propertyDefinitionList();
    this.expect(TokenType.RIGHT_CURLY_BRACES);

    return this.closeNode(node);
  }

  private propertyDefinitionList(): IProperty[] {
    const properties = [this.propertyDefinition()];

    while (this.eat(TokenType.COMMA)) {
      properties.push(this.propertyDefinition());
    }

    return properties;
  }

  private propertyDefinition(): IProperty {
    const LITERAL_PROPERTY_NAME = [
      TokenType.STRING_LITERAL,
      TokenType.DECIMAL_LITERAL,
      TokenType.HEXADECIMAL_LITERAL,
      TokenType.OCTAL_LITERAL,
      TokenType.BINARY_LITERAL,
    ];

    const node = this.openNode<IProperty>("Property");

    node.kind = "init";
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      const identifierReference = this.identifierReference();
      node.key = identifierReference;
      node.value = identifierReference;

      if (this.eat(TokenType.COLON)) {
        node.value = this.assignmentExpression();
        return this.closeNode(node);
      }
    } else if (this.currentToken.isSomeOf(LITERAL_PROPERTY_NAME)) {
      node.key = this.literal();
      this.expect(TokenType.COLON);
      node.value = this.assignmentExpression();
      return this.closeNode(node);
    } else {
      return this.unexpected();
    }

    return node;
  }

  private memberExpression(): IMemberExpression | IExpression {
    const node = this.openNode<IMemberExpression>("MemberExpression");
    const object = this.primaryExpression();

    node.object = object;
    node.computed = false;

    if (this.currentToken.isSomeOf([TokenType.LEFT_SQUARE_BRACKETS, TokenType.DOT])) {
      if (this.eat(TokenType.LEFT_SQUARE_BRACKETS)) {
        node.property = this.expression();
        this.expect(TokenType.RIGHT_SQUARE_BRACKETS);
      } else {
        this.expect(TokenType.DOT);
        node.property = this.identifier();
      }

      while (this.currentToken.isSomeOf([TokenType.LEFT_SQUARE_BRACKETS, TokenType.DOT])) {
        if (this.eat(TokenType.LEFT_SQUARE_BRACKETS)) {
          node.object = { ...node };
          node.property = this.expression();
          this.expect(TokenType.RIGHT_SQUARE_BRACKETS);
        } else {
          this.expect(TokenType.DOT);

          node.object = { ...node };
          node.property = this.identifier();
        }
      }

      return this.closeNode(node);
    }

    return object;
  }

  private newExpression(): INewExpression | IExpression {
    this.expect(TokenType.NEW);

    const node = this.openNode<INewExpression>("NewExpression");
    node.callee = this.memberExpression();
    node.arguments = this.arguments();

    return this.closeNode(node);
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

  private arguments(): IExpression[] {
    this.expect(TokenType.LEFT_PARENTHESIS);
    if (this.eat(TokenType.RIGHT_PARENTHESIS)) {
      return [];
    }

    const args = this.argumentList();
    this.expect(TokenType.RIGHT_PARENTHESIS);

    return args;
  }

  private argumentList(): IExpression[] {
    const args = [this.assignmentExpression()];

    while (this.eat(TokenType.COMMA)) {
      args.push(this.assignmentExpression());
    }

    return args;
  }

  private leftHandSideExpression(): IExpression {
    if (this.currentToken.is(TokenType.NEW)) {
      return this.newExpression();
    } else {
      return this.callExpression();
    }
  }

  private updateExpression(): IUpdateExpression | IExpression {
    const node = this.openNode<IUpdateExpression>("UpdateExpression");

    if (this.eat(TokenType.MINUS_MINUS)) {
      node.argument = this.unaryExpression();
      node.operator = UpdateOperator.MINUS_MINUS;
      node.prefix = true;
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS_PLUS)) {
      node.argument = this.unaryExpression();
      node.operator = UpdateOperator.PLUS_PLUS;
      node.prefix = true;
      return this.closeNode(node);
    } else {
      const argument = this.leftHandSideExpression();

      if (this.eat(TokenType.MINUS_MINUS)) {
        node.argument = argument;
        node.operator = UpdateOperator.MINUS_MINUS;
        node.prefix = false;
        return this.closeNode(node);
      } else if (this.eat(TokenType.PLUS_PLUS)) {
        node.argument = argument;
        node.operator = UpdateOperator.PLUS_PLUS;
        node.prefix = false;
        return this.closeNode(node);
      } else {
        return argument;
      }
    }
  }

  private unaryExpression(): IUnaryExpression | IExpression {
    if (this.eat(TokenType.LOGICAL_NOT)) {
      const node = this.openNode<IUnaryExpression>("UnaryExpression");
      node.argument = this.unaryExpression();
      node.operator = UnaryOperator.LOGICAL_NOT;
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
      return this.updateExpression();
    }
  }

  private exponentiationExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.unaryExpression();

    node.left = left;
    if (this.eat(TokenType.EXPONENTIATION)) {
      node.operator = BinaryOperator.EXPONENTIATION;
      node.right = this.exponentiationExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private multiplicativeExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.exponentiationExpression();

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

    node.left = left;
    if (this.eat(TokenType.MINUS)) {
      node.operator = BinaryOperator.MINUS;
      node.right = this.additiveExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.PLUS)) {
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
    if (this.eat(TokenType.BITWISE_LOGICAL_SHIFT_TO_RIGHT)) {
      node.operator = BinaryOperator.BITWISE_SHIFT_RIGHT_ZERO;
      node.right = this.shiftExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_SHIFT_TO_RIGHT)) {
      node.operator = BinaryOperator.BITWISE_SHIFT_RIGHT;
      node.right = this.shiftExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_SHIFT_TO_LEFT)) {
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
    } else if (this.eat(TokenType.INSTANCE_OF)) {
      node.operator = BinaryOperator.INSTANCE_OF;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.IN)) {
      node.operator = BinaryOperator.IN;
      node.right = this.relationalExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private equalityExpression(): IBinaryExpression | IExpression {
    const node = this.openNode<IBinaryExpression>("BinaryExpression");
    const left = this.relationalExpression();

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
      node.operator = BinaryOperator.BITWISE_AND;
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
      node.operator = BinaryOperator.BITWISE_XOR;
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
      node.operator = BinaryOperator.BITWISE_OR;
      node.right = this.bitwiseOrExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private logicalAndExpression(): ILogicalExpression | IExpression {
    const node = this.openNode<ILogicalExpression>("LogicalExpression");
    const left = this.bitwiseOrExpression();

    node.left = left;
    if (this.eat(TokenType.LOGICAL_AND)) {
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
    if (this.eat(TokenType.LOGICAL_OR)) {
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
      node.consequent = this.assignmentExpression();
      this.expect(TokenType.COLON);
      node.alternate = this.assignmentExpression();
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
    } else if (this.eat(TokenType.BITWISE_SHIFT_TO_LEFT_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_SHIFT_TO_LEFT_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_SHIFT_TO_RIGHT_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_SHIFT_TO_RIGHT_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    } else if (this.eat(TokenType.BITWISE_LOGICAL_SHIFT_TO_RIGHT_ASSIGN)) {
      node.operator = AssignmentOperator.BITWISE_LOGICAL_SHIFT_TO_RIGHT_ASSIGN;
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
    } else if (this.eat(TokenType.EXPONENTIATION_ASSIGN)) {
      node.operator = AssignmentOperator.EXPONENTIATION_ASSIGN;
      node.right = this.assignmentExpression();
      return this.closeNode(node);
    }

    return left;
  }

  private expression(): ISequenceExpression | IExpression {
    const node = this.openNode<ISequenceExpression>("SequenceExpression");
    node.expressions = [this.assignmentExpression()];

    while (this.eat(TokenType.COMMA)) {
      node.expressions.push(this.assignmentExpression());
    }

    return node.expressions.length === 1 ? node.expressions[0] : this.closeNode(node);
  }

  // ---------------------------- //
  // --- GRAMMAR (STATEMENTS) --- //
  // ---------------------------- //
  private statement(): IStatement {
    if (this.currentToken.is(TokenType.LEFT_CURLY_BRACES)) {
      return this.blockStatement();
    } else if (this.currentToken.is(TokenType.VAR)) {
      return this.variableStatement();
    } else if (this.currentToken.is(TokenType.SEMICOLON)) {
      return this.emptyStatement();
    } else if (this.currentToken.is(TokenType.IF)) {
      return this.ifStatement();
    } else if (this.currentToken.is(TokenType.CONTINUE)) {
      return this.continueStatement();
    } else if (this.currentToken.is(TokenType.DEBUGGER)) {
      return this.debuggerStatement();
    } else if (this.currentToken.is(TokenType.TRY)) {
      return this.tryStatement();
    } else if (this.currentToken.is(TokenType.THROW)) {
      return this.throwStatement();
    } else if (this.currentToken.is(TokenType.WITH)) {
      return this.withStatement();
    } else if (this.currentToken.is(TokenType.RETURN)) {
      return this.returnStatement();
    } else if (this.currentToken.is(TokenType.BREAK)) {
      return this.breakStatement();
    } else if (this.currentToken.isSomeOf([TokenType.DO, TokenType.WHILE, TokenType.FOR, TokenType.SWITCH])) {
      return this.breakableStatement();
    } else {
      return this.expressionStatement();
    }
  }

  private declaration(): IDeclaration {
    if (this.currentToken.is(TokenType.FUNCTION)) {
      return this.hoistableDeclaration();
    } else if (this.currentToken.is(TokenType.CLASS)) {
      return this.classDeclaration();
    } else {
      return this.lexicalDeclaration();
    }
  }

  private hoistableDeclaration(): IDeclaration {
    return this.functionDeclaration();
  }

  // FIXME: make a composite type perhaps
  // tslint:disable-next-line: max-line-length
  private breakableStatement(): IDoWhileStatement | IForStatement | IForInStatement | IForOfStatement | ISwitchStatement {
    const ITERATION_TOKENS = [
      TokenType.DO,
      TokenType.WHILE,
      TokenType.FOR,
    ];

    if (this.currentToken.isSomeOf(ITERATION_TOKENS)) {
      return this.iterationStatement();
    } else {
      return this.switchStatement();
    }
  }

  private blockStatement(): IBlockStatement {
    const node = this.openNode<IBlockStatement>("BlockStatement");
    node.body = this.block();

    return this.closeNode(node);
  }

  private block(): Array<IStatement | IDeclaration> {
    this.expect(TokenType.LEFT_CURLY_BRACES);
    if (this.eat(TokenType.RIGHT_CURLY_BRACES)) {
      return [];
    }

    const statementList = this.statementList();
    this.expect(TokenType.RIGHT_CURLY_BRACES);

    return statementList;
  }

  private statementList(): Array<IStatement | IDeclaration> {
    const END_OF_STATEMENT_TOKENS = [
      TokenType.RIGHT_CURLY_BRACES,
      TokenType.CASE,
      TokenType.DEFAULT,
    ];

    const items = [this.statementListItem()];

    while (!this.currentToken.isSomeOf(END_OF_STATEMENT_TOKENS)) {
      items.push(this.statementListItem());
    }

    return items;
  }

  private statementListItem(): IStatement | IDeclaration {
    const DECLARATION_TOKENS = [
      TokenType.FUNCTION,
      TokenType.CLASS,
      TokenType.LET,
      TokenType.CONST,
    ];

    if (this.currentToken.isSomeOf(DECLARATION_TOKENS)) {
      return this.declaration();
    } else {
      return this.statement();
    }
  }

  private lexicalDeclaration(): IVariableDeclaration {
    const node = this.openNode<IVariableDeclaration>("VariableDeclaration");

    if (this.eat(TokenType.LET)) {
      node.declarations = this.bindingList();
      node.kind = "let";
      return this.closeNode(node);
    } else {
      this.expect(TokenType.CONST);
      node.declarations = this.bindingList();
      node.kind = "const";
      return this.closeNode(node);
    }
  }

  private bindingList(): IVariableDeclarator[] {
    const bindings = [this.lexicalBinding()];

    while (this.eat(TokenType.COMMA)) {
      bindings.push(this.lexicalBinding());
    }

    return bindings;
  }

  private lexicalBinding(): IVariableDeclarator {
    const node = this.openNode<IVariableDeclarator>("VariableDeclarator");

    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      node.id = this.bindingIdentifier();
      if (this.eat(TokenType.ASSIGN)) {
        node.init = this.assignmentExpression();
      }

      return this.closeNode(node);
    } else {
      node.id = this.bindingPattern();
      this.expect(TokenType.ASSIGN);
      node.init = this.assignmentExpression();

      return this.closeNode(node);
    }
  }

  private variableStatement(): IVariableDeclaration {
    const node = this.openNode<IVariableDeclaration>("VariableDeclaration");
    this.expect(TokenType.VAR);

    node.kind = "var";
    node.declarations = this.variableDeclarationList();

    return this.closeNode(node);
  }

  private variableDeclarationList(): IVariableDeclarator[] {
    const declarations = [this.variableDeclaration()];

    while (this.eat(TokenType.COMMA)) {
      declarations.push(this.variableDeclaration());
    }

    return declarations;
  }

  private variableDeclaration(): IVariableDeclarator {
    const node = this.openNode<IVariableDeclarator>("VariableDeclarator");

    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      node.id = this.bindingIdentifier();
      if (this.eat(TokenType.ASSIGN)) {
        node.init = this.assignmentExpression();
      }

      return this.closeNode(node);
    } else {
      node.id = this.bindingPattern();
      this.expect(TokenType.ASSIGN);
      node.init = this.assignmentExpression();

      return this.closeNode(node);
    }
  }

  private bindingPattern(): IObjectPattern | IArrayPattern {
    if (this.currentToken.is(TokenType.LEFT_CURLY_BRACES)) {
      return this.objectBindingPattern();
    } else {
      return this.arrayBindingPattern();
    }
  }

  private objectBindingPattern(): IObjectPattern {
    const node = this.openNode<IObjectPattern>("ObjectPattern");
    node.properties = [];

    this.expect(TokenType.LEFT_CURLY_BRACES);
    if (this.eat(TokenType.RIGHT_CURLY_BRACES)) {
      return this.closeNode(node);
    }

    node.properties = this.bindingPropertyList();
    return this.closeNode(node);
  }

  private arrayBindingPattern(): IArrayPattern {
    const node = this.openNode<IArrayPattern>("ArrayPattern");
    node.elements = [];

    this.expect(TokenType.LEFT_SQUARE_BRACKETS);
    if (this.eat(TokenType.RIGHT_SQUARE_BRACKETS)) {
      return this.closeNode(node);
    }

    node.elements = this.bindingElementList();
    return this.closeNode(node);
  }

  private bindingPropertyList(): IProperty[] {
    const properties = [this.bindingProperty()];

    while (this.eat(TokenType.COMMA)) {
      properties.push(this.bindingProperty());
    }

    return properties;
  }

  private bindingElementList(): IIdentifier[] {
    const expressions = [this.bindingElement()];

    while (this.eat(TokenType.COMMA)) {
      expressions.push(this.bindingElement());
    }

    return expressions;
  }

  private bindingProperty(): IProperty {
    const node = this.openNode<IProperty>("Property");
    const identifier = this.bindingIdentifier();

    node.key = identifier;
    node.kind = "init";
    node.value = identifier;
    if (this.eat(TokenType.COLON)) {
      node.value = this.bindingElement();
      return this.closeNode(node);
    }

    return this.closeNode(node);
  }

  private bindingElement(): IIdentifier {
    return this.bindingIdentifier();
  }

  private emptyStatement(): IEmptyStatement {
    const node = this.openNode<IEmptyStatement>("EmptyStatement");
    this.expect(TokenType.SEMICOLON);
    return this.closeNode(node);
  }

  private expressionStatement(): IExpressionStatement {
    const node = this.openNode<IExpressionStatement>("ExpressionStatement");
    node.expression = this.expression();
    this.expect(TokenType.SEMICOLON);

    return this.closeNode(node);
  }

  private ifStatement(): IIfStatement {
    const node = this.openNode<IIfStatement>("IfStatement");
    node.alternate = null;

    this.expect(TokenType.IF);
    this.expect(TokenType.LEFT_PARENTHESIS);
    node.test = this.expression();
    this.expect(TokenType.RIGHT_PARENTHESIS);
    node.consequent = this.statement();

    if (this.eat(TokenType.ELSE)) {
      node.alternate = this.statement();
    }

    return this.closeNode(node);
  }

  private iterationStatement(): IDoWhileStatement | IForStatement | IForInStatement | IForOfStatement {
    if (this.eat(TokenType.DO)) {
      const node = this.openNode<IDoWhileStatement>("DoWhileStatement");
      node.body = this.statement();
      this.expect(TokenType.WHILE);
      this.expect(TokenType.LEFT_PARENTHESIS);
      node.test = this.expression();
      this.expect(TokenType.RIGHT_PARENTHESIS);
      this.expect(TokenType.SEMICOLON);

      return this.closeNode(node);
    } else if (this.eat(TokenType.WHILE)) {
      const node = this.openNode<IDoWhileStatement>("DoWhileStatement");

      this.expect(TokenType.LEFT_PARENTHESIS);
      node.test = this.expression();
      this.expect(TokenType.RIGHT_PARENTHESIS);
      node.body = this.statement();

      return this.closeNode(node);
    } else {
      const node = this.openNode<IForStatement>("ForStatement");

      this.expect(TokenType.FOR);
      this.expect(TokenType.LEFT_PARENTHESIS);

      if (this.currentToken.is(TokenType.VAR)) {
        node.init = this.variableStatement();
      } else if (this.currentToken.isSomeOf([TokenType.LET, TokenType.CONST])) {
        node.init = this.lexicalDeclaration();
      } else {
        node.init = this.expression();
      }

      this.expect(TokenType.SEMICOLON);
      node.test = this.expression();
      this.expect(TokenType.SEMICOLON);
      node.update = this.expression();
      this.expect(TokenType.RIGHT_PARENTHESIS);
      node.body = this.statement();

      return this.closeNode(node);
    }
  }

  private continueStatement(): IContinueStatement {
    const node = this.openNode<IContinueStatement>("ContinueStatement");
    node.label = null;

    this.expect(TokenType.CONTINUE);
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      node.label = this.labelIdentifier();
    }

    this.expect(TokenType.SEMICOLON);
    return this.closeNode(node);
  }

  private breakStatement(): IBreakStatement {
    const node = this.openNode<IBreakStatement>("BreakStatement");
    node.label = null;

    this.expect(TokenType.BREAK);
    if (this.currentToken.is(TokenType.IDENTIFIER)) {
      node.label = this.labelIdentifier();
    }

    this.expect(TokenType.SEMICOLON);
    return this.closeNode(node);
  }

  private returnStatement(): IReturnStatement {
    const node = this.openNode<IReturnStatement>("ReturnStatement");

    this.expect(TokenType.RETURN);
    if (!this.currentToken.is(TokenType.SEMICOLON)) {
      node.argument = this.expression();
    }

    this.expect(TokenType.SEMICOLON);
    return this.closeNode(node);
  }

  private withStatement(): IWithStatement {
    const node = this.openNode<IWithStatement>("WithStatement");

    this.expect(TokenType.WITH);
    this.expect(TokenType.LEFT_PARENTHESIS);
    node.object = this.expression();
    this.expect(TokenType.RIGHT_PARENTHESIS);
    node.body = this.statement();

    return this.closeNode(node);
  }

  private switchStatement(): ISwitchStatement {
    const node = this.openNode<ISwitchStatement>("SwitchStatement");

    this.expect(TokenType.SWITCH);
    this.expect(TokenType.LEFT_PARENTHESIS);
    node.discriminant = this.expression();
    this.expect(TokenType.RIGHT_PARENTHESIS);
    node.cases = this.caseBlock();
    node.lexical = true;

    return this.closeNode(node);
  }

  private caseBlock(): ISwitchCase[] {
    this.expect(TokenType.LEFT_CURLY_BRACES);
    const clauses = this.caseClauses();
    clauses.push(this.defaultClause());
    this.expect(TokenType.RIGHT_CURLY_BRACES);

    return clauses;
  }

  private caseClauses(): ISwitchCase[] {
    const clauses = [this.caseClause()];

    while (this.currentToken.is(TokenType.CASE)) {
      clauses.push(this.caseClause());
    }

    return clauses;
  }

  private caseClause(): ISwitchCase {
    const node = this.openNode<ISwitchCase>("SwitchCase");

    this.expect(TokenType.CASE);
    node.test = this.expression();
    this.expect(TokenType.COLON);
    node.consequent = this.statementList();

    return this.closeNode(node);
  }

  private defaultClause(): ISwitchCase {
    const node = this.openNode<ISwitchCase>("SwitchCase");

    this.expect(TokenType.DEFAULT);
    this.expect(TokenType.COLON);

    node.consequent = this.statementList();
    node.test = null;

    return this.closeNode(node);
  }

  private throwStatement(): IThrowStatement {
    const node = this.openNode<IThrowStatement>("ThrowStatement");

    this.expect(TokenType.THROW);
    node.argument = this.expression();
    this.expect(TokenType.SEMICOLON);

    return this.closeNode(node);
  }

  private tryStatement(): ITryStatement {
    const node = this.openNode<ITryStatement>("TryStatement");

    this.expect(TokenType.TRY);
    node.block = this.blockStatement();
    node.handler = null;
    node.finalizer = null;

    if (this.currentToken.is(TokenType.CATCH)) {
      node.handler = this.catch();
    }

    if (this.currentToken.is(TokenType.FINALLY)) {
      node.finalizer = this.finally();
    }

    return this.closeNode(node);
  }

  private catch(): ICatchClause {
    const node = this.openNode<ICatchClause>("CatchClause");

    this.expect(TokenType.CATCH);
    this.expect(TokenType.LEFT_PARENTHESIS);
    node.param = this.bindingIdentifier();
    this.expect(TokenType.RIGHT_PARENTHESIS);
    node.body = this.blockStatement();
    node.guard = null;

    return this.closeNode(node);
  }

  private finally(): IBlockStatement {
    this.expect(TokenType.FINALLY);
    return this.blockStatement();
  }

  private debuggerStatement(): IDebuggerStatement {
    const node = this.openNode<IDebuggerStatement>("DebuggerStatement");
    this.expect(TokenType.DEBUGGER);
    this.expect(TokenType.SEMICOLON);
    return this.closeNode(node);
  }

  // -------------------------------------- //
  // --- GRAMMAR (FUNCTION AND CLASSES) --- //
  // -------------------------------------- //
  private functionDeclaration(): IFunctionDeclaration {
    const node = this.openNode<IFunctionDeclaration>("FunctionDeclaration");
    // TODO: implement
    return this.closeNode(node);
  }

  private classDeclaration(): IClassDeclaration {
    const node = this.openNode<IClassDeclaration>("ClassDeclaration");
    // TODO: implement
    return this.closeNode(node);
  }

  private program(): IProgram {
    const node = this.openNode<IProgram>("Program");
    node.body = [this.statement()];

    return this.closeNode(node);
  }
}

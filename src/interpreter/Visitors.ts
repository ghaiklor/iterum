import { ArrayExpression } from "./visitors/ArrayExpression";
import { AssignmentExpression } from "./visitors/AssignmentExpression";
import { BinaryExpression } from "./visitors/BinaryExpression";
import { BlockStatement } from "./visitors/BlockStatement";
import { ConditionalExpression } from "./visitors/ConditionalExpression";
import { DoWhileStatement } from "./visitors/DoWhileStatement";
import { ExpressionStatement } from "./visitors/ExpressionStatement";
import { ForStatement } from "./visitors/ForStatement";
import { Identifier } from "./visitors/Identifier";
import { IfStatement } from "./visitors/IfStatement";
import { Literal } from "./visitors/Literal";
import { LogicalExpression } from "./visitors/LogicalExpression";
import { PrintStatement } from "./visitors/PrintStatement";
import { Program } from "./visitors/Program";
import { SequenceExpression } from "./visitors/SequenceExpression";
import { UnaryExpression } from "./visitors/UnaryExpression";
import { VariableDeclaration } from "./visitors/VariableDeclaration";
import { VariableDeclarator } from "./visitors/VariableDeclarator";
import { WhileStatement } from "./visitors/WhileStatement";

// TODO: uncomment visitors when they will have an implementation
export const VISITORS = {
  // ArrayPattern: () => notImplemented(),
  // ArrowFunctionExpression: () => notImplemented(),
  // AssignmentPattern: () => notImplemented(),
  // AwaitExpression: () => notImplemented(),
  // BreakStatement: () => notImplemented(),
  // CallExpression: () => notImplemented(),
  // CatchClause: () => notImplemented(),
  // Class: () => notImplemented(),
  // ClassBody: () => notImplemented(),
  // ClassDeclaration: () => notImplemented(),
  // ClassExpression: () => notImplemented(),
  // ComprehensionBlock: () => notImplemented(),
  // ComprehensionExpression: () => notImplemented(),
  // ComprehensionIf: () => notImplemented(),
  // ContinueStatement: () => notImplemented(),
  // DebuggerStatement: () => notImplemented(),
  // Directive: () => notImplemented(),
  // EmptyStatement: () => notImplemented(),
  // ExportAllDeclaration: () => notImplemented(),
  // ExportDefaultDeclaration: () => notImplemented(),
  // ExportNamedDeclaration: () => notImplemented(),
  // ExportSpecifier: () => notImplemented(),
  // ForInStatement: () => notImplemented(),
  // ForOfStatement: () => notImplemented(),
  // Function: () => notImplemented(),
  // FunctionBody: () => notImplemented(),
  // FunctionDeclaration: () => notImplemented(),
  // FunctionExpression: () => notImplemented(),
  // GeneratorExpression: () => notImplemented(),
  // GraphExpression: () => notImplemented(),
  // GraphIndexExpression: () => notImplemented(),
  // ImportDeclaration: () => notImplemented(),
  // ImportDefaultSpecifier: () => notImplemented(),
  // ImportNamespaceSpecifier: () => notImplemented(),
  // ImportSpecifier: () => notImplemented(),
  // LabeledStatement: () => notImplemented(),
  // LetExpression: () => notImplemented(),
  // LetStatement: () => notImplemented(),
  // MemberExpression: () => notImplemented(),
  // MetaProperty: () => notImplemented(),
  // MethodDefinition: () => notImplemented(),
  // ModuleSpecifier: () => notImplemented(),
  // NewExpression: () => notImplemented(),
  // ObjectExpression: () => notImplemented(),
  // ObjectPattern: () => notImplemented(),
  // Property: () => notImplemented(),
  // PropertyPattern: () => notImplemented(),
  // RegExpLiteral: () => notImplemented(),
  // RestElement: () => notImplemented(),
  // ReturnStatement: () => notImplemented(),
  // SpreadElement: () => notImplemented(),
  // Super: () => notImplemented(),
  // SwitchCase: () => notImplemented(),
  // SwitchStatement: () => notImplemented(),
  // TaggedTemplateExpression: () => notImplemented(),
  // TemplateElement: () => notImplemented(),
  // TemplateLiteral: () => notImplemented(),
  // ThisExpression: () => notImplemented(),
  // ThrowStatement: () => notImplemented(),
  // TryStatement: () => notImplemented(),
  // UpdateExpression: () => notImplemented(),
  // WithStatement: () => notImplemented(),
  // YieldExpression: () => notImplemented(),
  ArrayExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  ConditionalExpression,
  DoWhileStatement,
  ExpressionStatement,
  ForStatement,
  Identifier,
  IfStatement,
  Literal,
  LogicalExpression,
  PrintStatement,
  Program,
  SequenceExpression,
  UnaryExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
};

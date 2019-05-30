import { ArrayExpression } from "./traverser/ArrayExpression";
import { AssignmentExpression } from "./traverser/AssignmentExpression";
import { BinaryExpression } from "./traverser/BinaryExpression";
import { BlockStatement } from "./traverser/BlockStatement";
import { CallExpression } from "./traverser/CallExpression";
import { ConditionalExpression } from "./traverser/ConditionalExpression";
import { DoWhileStatement } from "./traverser/DoWhileStatement";
import { ExpressionStatement } from "./traverser/ExpressionStatement";
import { ForStatement } from "./traverser/ForStatement";
import { FunctionDeclaration } from "./traverser/FunctionDeclaration";
import { Identifier } from "./traverser/Identifier";
import { IfStatement } from "./traverser/IfStatement";
import { Literal } from "./traverser/Literal";
import { LogicalExpression } from "./traverser/LogicalExpression";
import { PrintStatement } from "./traverser/PrintStatement";
import { Program } from "./traverser/Program";
import { ReturnStatement } from "./traverser/ReturnStatement";
import { SequenceExpression } from "./traverser/SequenceExpression";
import { UnaryExpression } from "./traverser/UnaryExpression";
import { VariableDeclaration } from "./traverser/VariableDeclaration";
import { VariableDeclarator } from "./traverser/VariableDeclarator";
import { WhileStatement } from "./traverser/WhileStatement";

// TODO: uncomment traverser when they will have an implementation
export const TRAVERSER = {
  // ArrayPattern: () => notImplemented(),
  // ArrowFunctionExpression: () => notImplemented(),
  // AssignmentPattern: () => notImplemented(),
  // AwaitExpression: () => notImplemented(),
  // BreakStatement: () => notImplemented(),
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
  CallExpression,
  ConditionalExpression,
  DoWhileStatement,
  ExpressionStatement,
  ForStatement,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  Literal,
  LogicalExpression,
  PrintStatement,
  Program,
  ReturnStatement,
  SequenceExpression,
  UnaryExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
};

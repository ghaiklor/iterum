import { ArrayExpression } from "./listeners/ArrayExpression";
import { AssignmentExpression } from "./listeners/AssignmentExpression";
import { BinaryExpression } from "./listeners/BinaryExpression";
import { BlockStatement } from "./listeners/BlockStatement";
import { CallExpression } from "./listeners/CallExpression";
import { ConditionalExpression } from "./listeners/ConditionalExpression";
import { DoWhileStatement } from "./listeners/DoWhileStatement";
import { ExpressionStatement } from "./listeners/ExpressionStatement";
import { ForStatement } from "./listeners/ForStatement";
import { FunctionDeclaration } from "./listeners/FunctionDeclaration";
import { Identifier } from "./listeners/Identifier";
import { IfStatement } from "./listeners/IfStatement";
import { Literal } from "./listeners/Literal";
import { LogicalExpression } from "./listeners/LogicalExpression";
import { PrintStatement } from "./listeners/PrintStatement";
import { Program } from "./listeners/Program";
import { ReturnStatement } from "./listeners/ReturnStatement";
import { SequenceExpression } from "./listeners/SequenceExpression";
import { UnaryExpression } from "./listeners/UnaryExpression";
import { VariableDeclaration } from "./listeners/VariableDeclaration";
import { VariableDeclarator } from "./listeners/VariableDeclarator";
import { WhileStatement } from "./listeners/WhileStatement";

// TODO: uncomment traverser when they will have an implementation
export const LISTENERS = new Map([
  // ArrowFunctionExpression: () => notImplemented(),
  // AwaitExpression: () => notImplemented(),
  // BreakStatement: () => notImplemented(),
  // CatchClause: () => notImplemented(),
  // Class: () => notImplemented(),
  // ClassBody: () => notImplemented(),
  // ClassDeclaration: () => notImplemented(),
  // ClassExpression: () => notImplemented(),
  // ContinueStatement: () => notImplemented(),
  // DebuggerStatement: () => notImplemented(),
  // EmptyStatement: () => notImplemented(),
  // ExportAllDeclaration: () => notImplemented(),
  // ExportDefaultDeclaration: () => notImplemented(),
  // ExportNamedDeclaration: () => notImplemented(),
  // ExportSpecifier: () => notImplemented(),
  // ForInStatement: () => notImplemented(),
  // ForOfStatement: () => notImplemented(),
  // FunctionExpression: () => notImplemented(),
  // ImportDeclaration: () => notImplemented(),
  // ImportDefaultSpecifier: () => notImplemented(),
  // ImportNamespaceSpecifier: () => notImplemented(),
  // ImportSpecifier: () => notImplemented(),
  // LetExpression: () => notImplemented(),
  // LetStatement: () => notImplemented(),
  // MemberExpression: () => notImplemented(),
  // MetaProperty: () => notImplemented(),
  // MethodDefinition: () => notImplemented(),
  // ModuleSpecifier: () => notImplemented(),
  // NewExpression: () => notImplemented(),
  // ObjectExpression: () => notImplemented(),
  // Property: () => notImplemented(),
  // Super: () => notImplemented(),
  // SwitchCase: () => notImplemented(),
  // SwitchStatement: () => notImplemented(),
  // ThisExpression: () => notImplemented(),
  // ThrowStatement: () => notImplemented(),
  // TryStatement: () => notImplemented(),
  // UpdateExpression: () => notImplemented(),
  // WithStatement: () => notImplemented(),
  ["ArrayExpression", ArrayExpression],
  ["AssignmentExpression", AssignmentExpression],
  ["BinaryExpression", BinaryExpression],
  ["BlockStatement", BlockStatement],
  ["CallExpression", CallExpression],
  ["ConditionalExpression", ConditionalExpression],
  ["DoWhileStatement", DoWhileStatement],
  ["ExpressionStatement", ExpressionStatement],
  ["ForStatement", ForStatement],
  ["FunctionDeclaration", FunctionDeclaration],
  ["Identifier", Identifier],
  ["IfStatement", IfStatement],
  ["Literal", Literal],
  ["LogicalExpression", LogicalExpression],
  ["PrintStatement", PrintStatement],
  ["Program", Program],
  ["ReturnStatement", ReturnStatement],
  ["SequenceExpression", SequenceExpression],
  ["UnaryExpression", UnaryExpression],
  ["VariableDeclaration", VariableDeclaration],
  ["VariableDeclarator", VariableDeclarator],
  ["WhileStatement", WhileStatement],
]);

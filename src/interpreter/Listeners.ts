import { ArrayExpression } from "./listeners/ArrayExpression";
import { AssignmentExpression } from "./listeners/AssignmentExpression";
import { BinaryExpression } from "./listeners/BinaryExpression";
import { BlockStatement } from "./listeners/BlockStatement";
import { CallExpression } from "./listeners/CallExpression";
import { ClassDeclaration } from "./listeners/ClassDeclaration";
import { ConditionalExpression } from "./listeners/ConditionalExpression";
import { DoWhileStatement } from "./listeners/DoWhileStatement";
import { EmptyStatement } from "./listeners/EmptyStatement";
import { ExpressionStatement } from "./listeners/ExpressionStatement";
import { ForStatement } from "./listeners/ForStatement";
import { FunctionDeclaration } from "./listeners/FunctionDeclaration";
import { Identifier } from "./listeners/Identifier";
import { IfStatement } from "./listeners/IfStatement";
import { Literal } from "./listeners/Literal";
import { LogicalExpression } from "./listeners/LogicalExpression";
import { MemberExpression } from "./listeners/MemberExpression";
import { NewExpression } from "./listeners/NewExpression";
import { PrintStatement } from "./listeners/PrintStatement";
import { Program } from "./listeners/Program";
import { ReturnStatement } from "./listeners/ReturnStatement";
import { SequenceExpression } from "./listeners/SequenceExpression";
import { SuperExpression } from "./listeners/SuperExpression";
import { ThisExpression } from "./listeners/ThisExpression";
import { UnaryExpression } from "./listeners/UnaryExpression";
import { VariableDeclaration } from "./listeners/VariableDeclaration";
import { VariableDeclarator } from "./listeners/VariableDeclarator";
import { WhileStatement } from "./listeners/WhileStatement";

// TODO: uncomment traverser when they will have an implementation
export const LISTENERS = new Map([
  // BreakStatement: () => notImplemented(),
  // CatchClause: () => notImplemented(),
  // ContinueStatement: () => notImplemented(),
  // ExportAllDeclaration: () => notImplemented(),
  // ExportDefaultDeclaration: () => notImplemented(),
  // ExportNamedDeclaration: () => notImplemented(),
  // ExportSpecifier: () => notImplemented(),
  // ForInStatement: () => notImplemented(),
  // ForOfStatement: () => notImplemented(),
  // ImportDeclaration: () => notImplemented(),
  // ImportDefaultSpecifier: () => notImplemented(),
  // ImportNamespaceSpecifier: () => notImplemented(),
  // ImportSpecifier: () => notImplemented(),
  // MethodDefinition: () => notImplemented(),
  // ModuleSpecifier: () => notImplemented(),
  // ObjectExpression: () => notImplemented(),
  // Property: () => notImplemented(),
  // Super: () => notImplemented(),
  // SwitchCase: () => notImplemented(),
  // SwitchStatement: () => notImplemented(),
  // ThrowStatement: () => notImplemented(),
  // TryStatement: () => notImplemented(),
  // UpdateExpression: () => notImplemented(),
  ["ArrayExpression", ArrayExpression],
  ["AssignmentExpression", AssignmentExpression],
  ["BinaryExpression", BinaryExpression],
  ["BlockStatement", BlockStatement],
  ["CallExpression", CallExpression],
  ["ClassDeclaration", ClassDeclaration],
  ["ConditionalExpression", ConditionalExpression],
  ["DoWhileStatement", DoWhileStatement],
  ["EmptyStatement", EmptyStatement],
  ["ExpressionStatement", ExpressionStatement],
  ["ForStatement", ForStatement],
  ["FunctionDeclaration", FunctionDeclaration],
  ["Identifier", Identifier],
  ["IfStatement", IfStatement],
  ["Literal", Literal],
  ["LogicalExpression", LogicalExpression],
  ["MemberExpression", MemberExpression],
  ["NewExpression", NewExpression],
  ["PrintStatement", PrintStatement],
  ["Program", Program],
  ["ReturnStatement", ReturnStatement],
  ["SequenceExpression", SequenceExpression],
  ["SuperExpression", SuperExpression],
  ["ThisExpression", ThisExpression],
  ["UnaryExpression", UnaryExpression],
  ["VariableDeclaration", VariableDeclaration],
  ["VariableDeclarator", VariableDeclarator],
  ["WhileStatement", WhileStatement],
]);

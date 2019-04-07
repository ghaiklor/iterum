import { IExpression } from "../expressions/Expression";
import { IFunctionExpression } from "../expressions/FunctionExpression";
import { INode } from "../node/Node";

export interface IMethodDefinition extends INode {
  type: "MethodDefinition";
  key: IExpression;
  value: IFunctionExpression;
  kind: "constructor" | "method" | "get" | "set";
  computed: boolean;
  static: boolean;
}

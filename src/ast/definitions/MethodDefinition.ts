import { IFunctionExpression } from "../expressions/FunctionExpression";
import { IIdentifier } from "../miscellaneous/Identifier";
import { IDefinition } from "./Definition";

export interface IMethodDefinition extends IDefinition {
  type: "MethodDefinition";
  kind: "constructor" | "method";
  static: boolean;
  computed: boolean;
  key: IIdentifier;
  value: IFunctionExpression;
}

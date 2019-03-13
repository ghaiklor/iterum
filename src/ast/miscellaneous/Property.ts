import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IIdentifer } from "./Identifier";
import { ILiteral } from "./Literal";

export interface IProperty extends INode {
  type: "Property";
  key: ILiteral | IIdentifer;
  value: IExpression;
  kind: "init" | "get" | "set";
}

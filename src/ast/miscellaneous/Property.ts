import { IExpression } from "../expressions/Expression";
import { INode } from "../node/Node";
import { IIdentifier } from "./Identifier";
import { ILiteral } from "./Literal";

export interface IProperty extends INode {
  type: "Property";
  key: ILiteral | IIdentifier;
  value: IExpression;
  kind: "init" | "get" | "set";
}

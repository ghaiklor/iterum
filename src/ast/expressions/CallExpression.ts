import { ISpreadElement } from "../miscellaneous/SpreadElement";
import { ISuper } from "../miscellaneous/Super";
import { IExpression } from "./Expression";

export interface ICallExpression extends IExpression {
  type: "CallExpression";
  callee: IExpression | ISuper;
  arguments: Array<IExpression | ISpreadElement>;
}

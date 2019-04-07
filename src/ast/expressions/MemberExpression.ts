import { ISuper } from "../miscellaneous/Super";
import { IPattern } from "../patterns/Pattern";
import { IExpression } from "./Expression";

export interface IMemberExpression extends IExpression, IPattern {
  type: "MemberExpression";
  object: IExpression | ISuper;
  property: IExpression;
  computed: boolean;
}

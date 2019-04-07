import { ITemplateLiteral } from "../literals/TemplateLiteral";
import { IExpression } from "./Expression";

export interface ITaggedTemplateExpression extends IExpression {
  type: "TaggedTemplateExpression";
  tag: IExpression;
  quasi: ITemplateLiteral;
}

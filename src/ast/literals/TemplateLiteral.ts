import { IExpression } from '../expressions/Expression';
import { ITemplateElement } from '../miscellaneous/TemplateElement';

export interface ITemplateLiteral extends IExpression {
  type: 'TemplateLiteral'
  quasis: ITemplateElement[]
  expressions: IExpression[]
}

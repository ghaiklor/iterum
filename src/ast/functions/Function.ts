import { IExpression } from "../expressions/Expression";
import { IIdentifier } from "../miscellaneous/Identifier";
import { INode } from "../node/Node";
import { IPattern } from "../patterns/Pattern";
import { IBlockStatement } from "../statements/BlockStatement";

export interface IFunction extends INode {
  id: IIdentifier | null;
  params: IPattern[];
  defaults: IExpression[] | null;
  rest: IIdentifier | null;
  body: IBlockStatement | IExpression;
  generator: boolean;
  expression: boolean;
}

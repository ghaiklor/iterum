import { IMethodDefinition } from "../definitions/MethodDefinition";
import { INode } from "../node/Node";

export interface IClassBody extends INode {
  type: "ClassBody";
  body: IMethodDefinition[];
}

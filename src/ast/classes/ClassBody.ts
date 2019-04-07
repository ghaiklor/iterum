import { INode } from "../node/Node";
import { IMethodDefinition } from "./MethodDefinition";

export interface IClassBody extends INode {
  type: "ClassBody";
  body: IMethodDefinition[];
}

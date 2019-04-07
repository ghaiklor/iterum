import { INode } from "../node/Node";

export interface ITemplateElement extends INode {
  type: "TemplateElement";
  tail: boolean;
  value: {
    cooked: string | null;
    raw: string;
  };
}

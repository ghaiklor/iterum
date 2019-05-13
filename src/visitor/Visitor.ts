import { INode } from "../ast/node/Node";

export class Visitor {
  private visitors: Record<string, (node: INode, visitor: Visitor) => any>;
  constructor(visitors: Record<string, (node: INode, visitor: Visitor) => any>) {
    this.visitors = visitors;
  }

  public visit(node: INode) {
    const type = node.type;
    const visitor = this.visitors[type];

    if (!visitor || typeof visitor !== "function") {
      throw new Error(`No visitor found for ${type}`);
    }

    return visitor(node, this);
  }
}

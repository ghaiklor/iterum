import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";

export interface ITraverseContext {
  scope: SymbolTable;
  traverser: Traverser;
}

export class Traverser {
  private traverser: Record<string, (node: INode, context: ITraverseContext) => any>;
  constructor(traverser: Record<string, (node: INode, context: ITraverseContext) => any>) {
    this.traverser = traverser;
  }

  public traverse(node: INode, context: ITraverseContext) {
    const type = node.type;
    const traverse = this.traverser[type];

    if (!traverse || typeof traverse !== "function") {
      throw new Error(`No traverser found for ${type}`);
    }

    return traverse(node, context);
  }
}

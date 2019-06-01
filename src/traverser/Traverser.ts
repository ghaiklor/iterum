import { INode } from "../ast/node/Node";
import { Value } from "../runtime/Value";
import { SymbolTable } from "../symbols/SymbolTable";

type TraverserMap = Map<string, (node: INode, context: ITraverseContext) => Value | null>;

export interface ITraverseContext {
  scope: SymbolTable;
  traverser: Traverser;
}

export class Traverser {
  private traverser: TraverserMap;
  constructor(traverser: TraverserMap) {
    this.traverser = traverser;
  }

  public traverse(node: INode, context: ITraverseContext) {
    const type = node.type;
    const traverse = this.traverser.get(type);

    if (traverse === undefined) {
      throw new Error(`No traverser found for ${type}`);
    }

    return traverse(node, context);
  }
}

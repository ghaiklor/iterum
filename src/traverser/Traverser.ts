import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";

export class Traverser {
  private scope: SymbolTable;
  private traverser: Record<string, (node: INode, traverser: Traverser) => any>;
  constructor(traverser: Record<string, (node: INode, traverser: Traverser) => any>) {
    this.scope = new SymbolTable();
    this.traverser = traverser;
  }

  public setScope(scope: SymbolTable): Traverser {
    this.scope = scope;
    return this;
  }

  public getScope(): SymbolTable {
    return this.scope;
  }

  public traverse(node: INode) {
    const type = node.type;
    const traverse = this.traverser[type];

    if (!traverse || typeof traverse !== "function") {
      throw new Error(`No traverser found for ${type}`);
    }

    return traverse(node, this);
  }
}

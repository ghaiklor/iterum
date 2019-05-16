import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";

export class Visitor {
  private scope: SymbolTable;
  private visitors: Record<string, (node: INode, visitor: Visitor) => any>;
  constructor(visitors: Record<string, (node: INode, visitor: Visitor) => any>) {
    this.scope = new SymbolTable();
    this.visitors = visitors;
  }

  public setScope(scope: SymbolTable): Visitor {
    this.scope = scope;
    return this;
  }

  public getScope(): SymbolTable {
    return this.scope;
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

import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";

export class Visitor {
  private symbolTable: SymbolTable;
  private visitors: Record<string, (node: INode, visitor: Visitor) => any>;
  constructor(visitors: Record<string, (node: INode, visitor: Visitor) => any>) {
    this.symbolTable = new SymbolTable();
    this.visitors = visitors;
  }

  public setSymbolTable(table: SymbolTable): Visitor {
    this.symbolTable = table;
    return this;
  }

  public getSymbolTable(): SymbolTable {
    return this.symbolTable;
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

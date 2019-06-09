import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";
import { Traverser } from "../traverser/Traverser";
import { LISTENERS } from "./Listeners";

export class Interpreter {
  public static interpret(ast: INode) {
    return new Interpreter().interpret(ast);
  }

  private scope: SymbolTable;
  private traverser: Traverser;
  constructor() {
    this.scope = new SymbolTable();
    this.traverser = new Traverser(LISTENERS);
  }

  public interpret(ast: INode) {
    const value = this.traverser.traverse(ast, { scope: this.scope, traverser: this.traverser });
    return value.data;
  }
}

import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";
import { Traverser } from "../traverser/Traverser";
import { TRAVERSER } from "./Traverser";

export class Interpreter {
  public static interpret(ast: INode) {
    return new Interpreter().interpret(ast);
  }

  private scope: SymbolTable;
  private traverser: Traverser;
  constructor() {
    this.scope = new SymbolTable();
    this.traverser = new Traverser(TRAVERSER);
  }

  public interpret(ast: INode) {
    return this.traverser.traverse(ast, { scope: this.scope, traverser: this.traverser });
  }
}

import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";
import { Traverser } from "../traverser/Traverser";
import { TRAVERSER } from "./Traverser";

export class Interpreter {
  public static interpret(ast: INode) {
    return new Interpreter(ast).interpret();
  }

  private ast: INode;
  private traverser: Traverser;
  constructor(ast: INode) {
    this.ast = ast;
    this.traverser = new Traverser(TRAVERSER);
    this.traverser.setScope(new SymbolTable());
  }

  public getScope(): SymbolTable {
    return this.traverser.getScope();
  }

  public interpret(ast?: INode) {
    return this.traverser.traverse(ast || this.ast);
  }
}

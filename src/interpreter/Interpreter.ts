import { INode } from "../ast/node/Node";
import { SymbolTable } from "../symbols/SymbolTable";
import { Visitor } from "../visitor/Visitor";
import { VISITORS } from "./Visitors";

export class Interpreter {
  public static interpret(ast: INode) {
    return new Interpreter(ast).interpret();
  }

  private ast: INode;
  private visitor: Visitor;
  constructor(ast: INode) {
    this.ast = ast;
    this.visitor = new Visitor(VISITORS);
    this.visitor.setScope(new SymbolTable());
  }

  public getScope(): SymbolTable {
    return this.visitor.getScope();
  }

  public interpret() {
    return this.visitor.visit(this.ast);
  }
}

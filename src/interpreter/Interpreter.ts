import { INode } from "../ast/node/Node";
import { Symbol } from "../symbols/Symbol";
import { SymbolTable } from "../symbols/SymbolTable";
import { Visitor } from "../visitor/Visitor";
import { VISITORS } from "./Visitors";

export class Interpreter {
  public static interpret(ast: INode) {
    return new Interpreter(ast).interpret();
  }

  private ast: INode;
  private visitor: Visitor;
  private scope: SymbolTable;
  constructor(ast: INode) {
    this.ast = ast;

    this.scope = new SymbolTable();
    this.scope.define(new Symbol("console", console));

    this.visitor = new Visitor(VISITORS);
    this.visitor.setScope(this.scope);
  }

  public setScope(scope: SymbolTable): Interpreter {
    this.scope = scope;
    return this;
  }

  public getScope(): SymbolTable {
    return this.scope;
  }

  public interpret() {
    return this.visitor.visit(this.ast);
  }
}

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
  private symbolTable: SymbolTable;
  constructor(ast: INode) {
    this.ast = ast;

    this.symbolTable = new SymbolTable();
    this.symbolTable.define(new Symbol("console", console));

    this.visitor = new Visitor(VISITORS);
    this.visitor.setSymbolTable(this.symbolTable);
  }

  public getCurrentScope(): SymbolTable {
    return this.symbolTable;
  }

  public interpret() {
    return this.visitor.visit(this.ast);
  }
}

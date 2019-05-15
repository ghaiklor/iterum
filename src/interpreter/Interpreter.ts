import { INode } from "../ast/node/Node";
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
  }

  public interpret() {
    return this.visitor.visit(this.ast);
  }
}

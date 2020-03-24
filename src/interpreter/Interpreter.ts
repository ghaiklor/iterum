import { INode } from '../ast/node/Node';
import { SymbolTable } from '../symbols/SymbolTable';
import { Traverser } from '../traverser/Traverser';
import { LISTENERS } from './Listeners';

export class Interpreter {
  public static interpret (ast: INode): any {
    return new Interpreter().interpret(ast);
  }

  private readonly scope: SymbolTable;
  private readonly traverser: Traverser;
  constructor () {
    this.scope = new SymbolTable();
    this.traverser = new Traverser(LISTENERS);
  }

  public interpret (ast: INode): any {
    const value = this.traverser.traverse(ast, { scope: this.scope, traverser: this.traverser });
    return value.data;
  }
}

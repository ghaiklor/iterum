import { INode } from '../ast/node/Node';
import { TraverserError } from '../errors/TraverserError';
import { Value } from '../runtime/Value';
import { SymbolTable } from '../symbols/SymbolTable';

type ListenerMap = Map<string, (node: INode, context: ITraverseContext) => Value>;

export interface ITraverseContext {
  scope: SymbolTable
  traverser: Traverser
}

export class Traverser {
  private readonly listeners: ListenerMap;
  constructor (listeners: ListenerMap) {
    this.listeners = listeners;
  }

  public traverse (node: INode, context: ITraverseContext): Value {
    const type = node.type;
    const listener = this.listeners.get(type);

    if (listener === undefined) {
      throw new TraverserError(TraverserError.NO_TRAVERSER_IS_FOUND, type);
    }

    return listener(node, context);
  }
}

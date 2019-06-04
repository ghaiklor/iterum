import { INode } from "../ast/node/Node";
import { ErrorCode } from "../errors/ErrorCode";
import { TraverserError } from "../errors/TraverserError";
import { Value } from "../runtime/Value";
import { SymbolTable } from "../symbols/SymbolTable";

type ListenerMap = Map<string, (node: INode, context: ITraverseContext) => Value | null>;

export interface ITraverseContext {
  scope: SymbolTable;
  traverser: Traverser;
}

export class Traverser {
  private listeners: ListenerMap;
  constructor(listeners: ListenerMap) {
    this.listeners = listeners;
  }

  public traverse(node: INode, context: ITraverseContext) {
    const type = node.type;
    const listener = this.listeners.get(type);

    if (listener === undefined) {
      throw new TraverserError(ErrorCode.NO_TRAVERSER_IS_FOUND, type);
    }

    return listener(node, context);
  }
}

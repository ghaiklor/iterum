import { IVariableDeclarator } from "../../ast/declarations/VariableDeclarator";
import { INode } from "../../ast/node/Node";
import { Symbol } from "../../symbols/Symbol";
import { Visitor } from "../../visitor/Visitor";

export function VariableDeclarator(n: INode, visitor: Visitor) {
  const node = n as IVariableDeclarator;
  const scope = visitor.getScope();
  const symbol = new Symbol(visitor.visit(node.id), node.init !== null ? visitor.visit(node.init) : undefined);

  return scope.define(symbol);
}

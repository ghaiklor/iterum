import { IVariableDeclarator } from "../../ast/declarations/VariableDeclarator";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { Symbol } from "../../symbols/Symbol";
import { Visitor } from "../../visitor/Visitor";

export function VariableDeclarator(n: INode, visitor: Visitor) {
  const node = n as IVariableDeclarator;
  const scope = visitor.getScope();

  let name;
  if (node.id.type === "Identifier") {
    name = (node.id as IIdentifier).name;
  } else {
    name = visitor.visit(node.id);
  }

  let value = null;
  if (node.init !== null) {
    value = visitor.visit(node.init);
  }

  const symbol = new Symbol(name, value);
  return scope.define(symbol);
}

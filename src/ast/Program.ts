import { CompoundNode } from "./CompoundNode";
import { Node } from "./Node";

export class Program extends CompoundNode {
  constructor(nodes: Node[]) {
    super(nodes);
  }
}

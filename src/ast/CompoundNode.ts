import { Node } from "./Node";

export class CompoundNode {
  public nodes: Node[];

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }
}

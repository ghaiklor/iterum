import { Node } from "./Node";

export class Identifier extends Node {
  public name: string;
  constructor(name: string) {
    super();

    this.name = name;
  }
}

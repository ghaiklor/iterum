export class Node {
  public type: string;

  constructor() {
    this.type = this.constructor.name;
  }
}

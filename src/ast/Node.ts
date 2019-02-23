import { Token } from "../token/Token";

export class Node {
  public token: Token;

  constructor(token: Token) {
    this.token = token;
  }
}

import { LexicalError } from "./LexicalError";

export class SyntaxError extends LexicalError {
  public name: string = "SyntaxError";
}

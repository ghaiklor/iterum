import { IterumError } from "./IterumError";
import { LexicalError } from "./LexicalError";
import { SyntaxError } from "./SyntaxError";

export class ParserError extends IterumError {
  public errors: Array<LexicalError | SyntaxError> = [];
  constructor(errors: Array<LexicalError | SyntaxError>) {
    super("There are some lexical and syntax errors found in your code");
    this.errors = errors;
  }

  public toString() {
    return this.errors.map((error) => error.toString()).join("\n");
  }
}

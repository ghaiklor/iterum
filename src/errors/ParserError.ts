import { ErrorCode } from "./ErrorCode";
import { IterumError } from "./IterumError";
import { LexicalError } from "./LexicalError";

export class ParserError extends IterumError {
  public name: string = "ParserError";
  public errors: Array<LexicalError | SyntaxError> = [];
  constructor(errors: Array<LexicalError | SyntaxError>) {
    super(ErrorCode.PARSER_ERROR);
    this.errors = errors;
  }

  public toString() {
    return this.errors.map((error) => error.toString()).join("\n");
  }
}

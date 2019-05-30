import { ITokenLocation } from "../token/Token";
import { ErrorCode } from "./ErrorCode";
import { IterumError } from "./IterumError";

export class LexicalError extends IterumError {
  private location: ITokenLocation;
  constructor(code: ErrorCode, location: ITokenLocation, ...args: string[]) {
    super(code, ...args);
    this.name = "LexicalError";
    this.location = { ...location };
  }

  public toString() {
    return `[${this.location.line}:${this.location.column}] LexicalError: ${this.message}`;
  }
}

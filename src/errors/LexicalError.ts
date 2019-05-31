import { ITokenLocation } from "../token/Token";
import { ErrorCode } from "./ErrorCode";
import { IterumError } from "./IterumError";

export class LexicalError extends IterumError {
  public name: string = "LexicalError";
  public location: ITokenLocation;
  constructor(code: ErrorCode, location: ITokenLocation, ...args: string[]) {
    super(code, ...args);
    this.location = { ...location };
  }

  public toString() {
    const message = super.toString();

    return `[${this.location.line}:${this.location.column}] ${message}`;
  }
}

import { format } from "util";
import { ErrorCode } from "./ErrorCode";
import { ErrorMessage } from "./ErrorMessage";

export class IterumError extends Error {
  public code: ErrorCode;
  constructor(code: ErrorCode, ...args: string[]) {
    let message = ErrorMessage.get(code);
    if (message === undefined) {
      message = "Unrecognizable error";
    }

    super(format(message, ...args));
    this.name = "IterumError";
    this.code = code;
  }

  public toString() {
    return `${this.message}`;
  }
}

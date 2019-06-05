import { format } from "util";

export class IterumError extends Error {
  constructor(message: string, ...args: string[]) {
    super(format(message, ...args));
    this.name = this.constructor.name;
  }

  public toString() {
    return `${this.name}: ${this.message}`;
  }
}

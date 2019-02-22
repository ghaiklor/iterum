import { ITokenLocation } from "./ITokenLocation";

export class TokenLocation implements ITokenLocation {
  public static from(line: number, column: number): TokenLocation {
    return new TokenLocation(line, column);
  }

  public line: number;
  public column: number;
  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  public toString(): string {
    return `${this.line}:${this.column}`;
  }
}

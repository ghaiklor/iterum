import { IToken } from "./IToken";
import { ITokenLocation } from "./ITokenLocation";
import { TokenType } from "./TokenType";

export class Token implements IToken {
  public type: TokenType;
  public code: string;
  public location: ITokenLocation;

  constructor(type: TokenType, code: string, location: ITokenLocation) {
    this.type = type;
    this.code = code;
    this.location = location;
  }

  /**
   * Check if the token type is the same as provided.
   *
   * @param type TokenType to check against the token instance
   * @returns {Boolean}
   */
  public is(type: TokenType): boolean {
    return this.type === type;
  }

  /**
   * Serialize token to string representation for easier debugging.
   *
   * @returns {String}
   */
  public toString(): string {
    return `Token(${this.type}, ${this.code}, ${this.location.line}:${this.location.column})`;
  }
}

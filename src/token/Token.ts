import { TokenType } from "./TokenType";

export class Token {
  public type: TokenType;
  public code: string;

  constructor(type: TokenType, code: string) {
    this.type = type;
    this.code = code;
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
    return `Token(${this.type}, ${this.code})`;
  }
}

import { TokenType } from "./TokenType";

export interface ITokenLocation {
  line: number;
  column: number;
}

export class Token {
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
   * Check if the token type is not the same as provided.
   *
   * @param type TokenType to check against the token instance
   */
  public isNot(type: TokenType): boolean {
    return !this.is(type);
  }

  /**
   * Check if the token is some of provided token types.
   *
   * @param types An array of token types to check against
   */
  public isSomeOf(types: TokenType[]) {
    return types.some((type) => this.is(type));
  }

  /**
   * Check if the token is not from the provided token list.
   *
   * @param types An array of token types to check against
   */
  public isNotSomeOf(types: TokenType[]) {
    return !this.isSomeOf(types);
  }

  /**
   * Serialize token to string representation for easier debugging.
   *
   * @returns {String}
   */
  public toString(): string {
    return `[${this.location.line}:${this.location.column}] Token(${this.type}, ${this.code})`;
  }
}

export interface IToken {
  type: TokenType;
  code: string;
  location: ITokenLocation;
}

export interface ITokenLocation {
  line: number;
  column: number;
}

export const enum TokenType {
  ASTERISK = "ASTERISK",
  COLON = "COLON",
  COMMA = "COMMA",
  DOUBLE_QUOTES = "DOUBLE_QUOTES",
  EQUALS = "EQUALS",
  IDENTIFIER = "IDENTIFIER",
  FUNCTION = "FUNCTION",
  LEFT_CURLY_BRACES = "LEFT_CURLY_BRACES",
  LEFT_PARENTHESIS = "LEFT_PARENTHESIS",
  MINUS = "MINUS",
  PLUS = "PLUS",
  RIGHT_CURLY_BRACES = "RIGHT_CURLY_BRACES",
  RIGHT_PARENTHESIS = "RIGHT_PARENTHESIS",
  SEMICOLON = "SEMICOLON",
  SINGLE_QUOTES = "SINGLE_QUOTES",
  SLASH = "SLASH",
  BACKSLASH = "BACKSLASH",
}

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

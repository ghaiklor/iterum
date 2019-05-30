export class Character {
  public static from(char: string): Character {
    return new Character(char);
  }

  private char: string;
  constructor(char: string = "") {
    this.char = char;
  }

  public is(char: string): boolean {
    return this.char === char;
  }

  public isSomeOf(chars: string[]): boolean {
    return chars.some((char) => this.is(char));
  }

  public isLineTerminator(): boolean {
    return /[\r\n]/.test(this.char);
  }

  public isWhitespace(): boolean {
    return /\s/.test(this.char);
  }

  public isAlpha(): boolean {
    return /[a-zA-Z]/.test(this.char);
  }

  public isDigit(): boolean {
    return /\d/.test(this.char);
  }

  public isHexDigit(): boolean {
    return this.isDigit() || /[a-fA-F]/.test(this.char);
  }

  public isOctalDigit(): boolean {
    return /[0-7]/.test(this.char);
  }

  public isBinaryDigit(): boolean {
    return /[01]/.test(this.char);
  }

  public isAlphaNumeric(): boolean {
    return this.isAlpha() || this.isDigit();
  }

  public toString(): string {
    return this.char.toString();
  }
}

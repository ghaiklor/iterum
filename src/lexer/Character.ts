export class Character {
  public static from(char: string): Character {
    return new Character(char);
  }

  public char: string;
  constructor(char: string) {
    this.char = char;
  }

  public is(char: string): boolean {
    return this.char === char;
  }

  public isNewline(): boolean {
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

  public isAlphaNumeric(): boolean {
    return this.isAlpha() || this.isDigit();
  }

  public isEOF(): boolean {
    return this.char === undefined;
  }

  public toString(): string {
    return this.char.toString();
  }
}

export class Character {
  public static from(char: string): Character {
    return new Character(char);
  }

  public code: number = 0;
  constructor(char: string | undefined) {
    if (typeof char === "string") {
      this.code = char.charCodeAt(0);
    }
  }

  public is(char: string | number | Character | undefined): boolean {
    if (typeof char === "string") {
      return this.code === char.charCodeAt(0);
    } else if (typeof char === "number") {
      return this.code === char;
    } else if (char instanceof Character) {
      return this.code === char.code;
    }

    return false;
  }

  public isNot(char: string | number | Character): boolean {
    return !this.is(char);
  }

  public isSomeOf(chars: Array<string | number | Character>): boolean {
    return chars.some((char) => this.is(char));
  }

  public isNotSomeOf(chars: Array<string | number | Character>): boolean {
    return !this.isSomeOf(chars);
  }

  public isLineFeed(): boolean {
    return this.code === 10;
  }

  public isCarriageReturn(): boolean {
    return this.code === 13;
  }

  public isSpace(): boolean {
    return this.code === 32;
  }

  public isTab(): boolean {
    return this.code === 9;
  }

  public isWhitespace(): boolean {
    return this.isSpace() || this.isLineFeed() || this.isCarriageReturn() || this.isTab();
  }

  public isAlpha(): boolean {
    return (
      (this.code >= 97 && this.code <= 122) ||
      (this.code >= 65 && this.code <= 90) ||
      (this.code === 95)
    );
  }

  public isDigit(): boolean {
    return this.code >= 48 && this.code <= 57;
  }

  public isHexDigit(): boolean {
    return (
      (this.isDigit()) ||
      (this.code >= 97 && this.code <= 102) ||
      (this.code >= 65 && this.code <= 70)
    );
  }

  public isOctalDigit(): boolean {
    return this.code >= 48 && this.code <= 55;
  }

  public isBinaryDigit(): boolean {
    return this.code === 48 || this.code === 49;
  }

  public isAlphaNumeric(): boolean {
    return this.isAlpha() || this.isDigit();
  }

  public toString(): string {
    return String.fromCharCode(this.code);
  }
}

import { TokenName } from './TokenName';
import { TokenType } from './TokenType';

export interface ITokenLocation {
  line: number
  column: number
}

export class Token {
  public type: TokenType;
  public name: string;
  public lexeme: string;
  public location: ITokenLocation;
  constructor (type: TokenType, lexeme: string, location: ITokenLocation) {
    this.type = type;
    this.name = TokenName.get(this.type) ?? 'Unknown token name, see the lexeme';
    this.lexeme = lexeme;
    this.location = { ...location };
  }

  public is (type: TokenType): boolean {
    return this.type === type;
  }

  public isNot (type: TokenType): boolean {
    return !this.is(type);
  }

  public isSomeOf (types: TokenType[]): boolean {
    return types.some((type) => this.is(type));
  }

  public isNotSomeOf (types: TokenType[]): boolean {
    return !this.isSomeOf(types);
  }

  public toString (): string {
    return `[${this.location.line}:${this.location.column}] Token(${this.name}, ${this.lexeme})`;
  }
}

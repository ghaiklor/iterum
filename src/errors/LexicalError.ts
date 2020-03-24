import { ITokenLocation } from '../token/Token';
import { IterumError } from './IterumError';

export class LexicalError extends IterumError {
  public static EXPECTED = 'Expected %s';
  public static UNRECOGNIZED_CHARACTER = 'Unrecognized character %s';
  public static UNTERMINATED_STRING_LITERAL = 'Unterminated string literal';

  public location: ITokenLocation;
  constructor (message: string, location: ITokenLocation, ...args: string[]) {
    super(message, ...args);
    this.location = { ...location };
  }

  public toString (): string {
    const message = super.toString();

    return `[${this.location.line}:${this.location.column}] ${message}`;
  }
}

import { ITokenLocation } from "./ITokenLocation";
import { TokenType } from "./TokenType";

export interface IToken {
  type: TokenType;
  code: string;
  location: ITokenLocation;
}

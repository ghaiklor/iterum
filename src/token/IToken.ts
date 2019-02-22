import { TokenLocation } from "./TokenLocation";
import { TokenType } from "./TokenType";

export interface IToken {
  type: TokenType;
  code: string;
  location: TokenLocation;
}

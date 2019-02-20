import { ITokenLocation } from "../token/ITokenLocation";
import { Character } from "./Character";

export interface ILexer {
  sourceCode: string;
  cursorPosition: number;
  currentChar: Character;
  charLocation: ITokenLocation;
}

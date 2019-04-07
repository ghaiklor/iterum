import { ILiteral } from "./Literal";

export interface IRegExpLiteral extends ILiteral {
  regex: {
    pattern: string;
    flags: string;
  };
}

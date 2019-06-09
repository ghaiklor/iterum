import { IRegExpLiteral } from "../../ast/literals/RegExpLiteral";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class RegExpValue extends Value {
  constructor(data: IRegExpLiteral) {
    super(ValueKind.REGEXP, data);
  }
}

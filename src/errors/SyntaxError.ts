import { LexicalError } from "./LexicalError";

export class SyntaxError extends LexicalError {
  public static EXPECTED_BUT_GOT = "Expected %s, but got %s";
  public static UNEXPECTED = "Unexpected %s";
}

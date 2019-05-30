import { ErrorCode } from "./ErrorCode";

export const ErrorMessage: Map<ErrorCode, string> = new Map([
  [ErrorCode.EXPECTED, `Expected %s`],
  [ErrorCode.EXPECTED_BUT_GOT, `Expected %s, but got %s`],
  [ErrorCode.UNRECOGNIZED_CHARACTER, "Unrecognized character %s"],
  [ErrorCode.UNTERMINATED_STRING_LITERAL, "Unterminated string literal"],
]);

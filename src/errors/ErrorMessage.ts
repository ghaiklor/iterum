import { ErrorCode } from "./ErrorCode";

export const ErrorMessage: Map<ErrorCode, string> = new Map([
  [ErrorCode.EXPECTED, `Expected %s`],
  [ErrorCode.EXPECTED_BUT_GOT, `Expected %s, but got %s`],
  [ErrorCode.PARSER_ERROR, "There are some errors found in your code"],
  [ErrorCode.UNEXPECTED, "Unexpected %s"],
  [ErrorCode.UNRECOGNIZED_CHARACTER, "Unrecognized character %s"],
  [ErrorCode.UNTERMINATED_STRING_LITERAL, "Unterminated string literal"],
]);

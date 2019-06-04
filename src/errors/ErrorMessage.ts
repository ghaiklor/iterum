import { ErrorCode } from "./ErrorCode";

export const ErrorMessage: Map<ErrorCode, string> = new Map([
  [ErrorCode.EXPECTED, `Expected %s`],
  [ErrorCode.EXPECTED_BUT_GOT, `Expected %s, but got %s`],
  [ErrorCode.NO_TRAVERSER_IS_FOUND, "No traverser is found for node %s"],
  [ErrorCode.PARSER_ERROR, "There are some errors found in your code"],
  [ErrorCode.SYMBOL_ALREADY_DECLARED, "%s has already been declared"],
  [ErrorCode.SYMBOL_IS_NOT_DECLARED, "%s is not declared"],
  [ErrorCode.UNEXPECTED, "Unexpected %s"],
  [ErrorCode.UNRECOGNIZED_CHARACTER, "Unrecognized character %s"],
  [ErrorCode.UNTERMINATED_STRING_LITERAL, "Unterminated string literal"],
]);

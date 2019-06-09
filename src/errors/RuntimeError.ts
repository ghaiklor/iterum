import { IterumError } from "./IterumError";

export class RuntimeError extends IterumError {
  public static UNKNOWN_RUNTIME_ERROR = "Something strange really happened and I do not know what exactly";
  public static OPERATOR_IS_NOT_APPLIED = "Operator %s is not applied";
  public static UNKNOWN_LITERAL_TYPE = "Unknown literal type - %s";
}

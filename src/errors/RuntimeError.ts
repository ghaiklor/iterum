import { IterumError } from "./IterumError";

export class RuntimeError extends IterumError {
  public static UNKNOWN_RUNTIME_ERROR = "Something strange really happened and I do not know what exactly";
  public static OPERATOR_IS_NOT_APPLIED = "Operator %s is not applied";
  public static UNKNOWN_LITERAL_TYPE = "Unknown literal type - %s";
  public static NEW_CALLED_ON_NON_CLASS = "%s is not a class, you can instantiate only class objects";
  public static PROPERTY_ACCESS_ON_NON_INSTANCE = "%s is not an instance of a class";
  public static UNDEFINED_PROPERTY = "%s is not exists";
}

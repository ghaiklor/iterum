import { IterumError } from "./IterumError";

export class RuntimeError extends IterumError {
  public static UNKNOWN_RUNTIME_ERROR = "Something strange really happened and I do not know what exactly";
  public static OPERATOR_IS_NOT_APPLIED = "Operator %s is not applied";
  public static UNKNOWN_LITERAL_TYPE = "Unknown literal type - %s";
  public static NEW_CALLED_ON_NON_CLASS = "%s is not a class, you can instantiate only class objects";
  public static PROPERTY_ACCESS_ON_NON_INSTANCE = "%s is not an instance of a class";
  public static UNDEFINED_PROPERTY = "%s is not exists";
  public static ASSIGNMENT_IS_NOT_SUPPORTED = "Assignment to %s is not supported";
  public static VALUE_IS_NOT_A_FUNCTION = "%s is not a function";
  public static THIS_IS_NOT_AN_INSTANCE = "'this' refers to non-instance value";
  public static ARITY_MISMATCH = "%s expect %d arguments, but got %d";
  public static SUPERCLASS_MUST_BE_A_CLASS = "%s must be a class";
}

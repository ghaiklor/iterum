import { IterumError } from "./IterumError";

export class RuntimeError extends IterumError {
  public static UNKNOWN_RUNTIME_ERROR = "Something strange really happened and I do not know what exactly";
}

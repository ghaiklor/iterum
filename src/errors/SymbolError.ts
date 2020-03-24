import { IterumError } from './IterumError';

export class SymbolError extends IterumError {
  public static SYMBOL_ALREADY_DECLARED = '%s has already been declared';
  public static SYMBOL_IS_NOT_DECLARED = '%s is not declared';
}

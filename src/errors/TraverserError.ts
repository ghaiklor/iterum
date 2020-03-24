import { IterumError } from './IterumError';

export class TraverserError extends IterumError {
  public static NO_TRAVERSER_IS_FOUND = 'No traverser is found for node %s';
}

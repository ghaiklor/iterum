import { IProgram } from '../ast/programs/Program';
import { ParserError } from '../errors/ParserError';
import { Parser } from '../parser/Parser';
import { log } from './log';

export function parse (source: string): IProgram | never {
  try {
    return Parser.parse(source);
  } catch (error) {
    if (error instanceof ParserError) {
      log(error.toString());
    }

    throw error;
  }
}

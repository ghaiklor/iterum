import * as repl from 'repl';
import { ParserError } from '../errors/ParserError';
import { Interpreter } from '../interpreter/Interpreter';
import { Parser } from '../parser/Parser';
import { Value } from '../runtime/Value';

type Evaluator = (cmd: string, _: object, __: string, cb: (e: Error | null, result: Value | null) => void) => void;

export function replEvaluator (): Evaluator {
  const interpreter = new Interpreter();

  return function evaluator (cmd, _, __, cb) {
    try {
      const ast = Parser.parse(cmd);
      const result = interpreter.interpret(ast);
      cb(null, result);
    } catch (error) {
      if (error instanceof ParserError) {
        return cb(new repl.Recoverable(error), null);
      }

      return cb(error, null);
    }
  };
}

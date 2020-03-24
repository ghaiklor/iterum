import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::ForStatement', () => {
  it('Should properly interpret for statement', () => {
    const source = `
      let b = 0;

      for (let a = 0; a < 10; a += 1) {
        b += 2;
      }

      a * b;
    `;
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(200);
  });
});

import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::IfStatement', () => {
  it('Should properly interpret if statement (truthy)', () => {
    const source = `
      let a;

      if (true) {
        a = 10;
      } else {
        a = 5;
      }

      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    expect(result).toEqual(10);
  });

  it('Should properly interpret if statement (falsy)', () => {
    const source = `
      let a;

      if (false) {
        a = 10;
      } else {
        a = 5;
      }

      a;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    expect(result).toEqual(5);
  });
});

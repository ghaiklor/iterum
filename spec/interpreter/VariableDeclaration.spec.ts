import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::VariableDeclaration', () => {
  it('Should properly interpret binary expression with variables', () => {
    const source = `
      let a = 5;
      let b = 2;

      a * b;
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(10);
  });

  it('Should properly throw an error when re-defining the symbol', () => {
    const source = `
      let a = 4;
      let a = 1;
    `;

    const ast = Parser.parse(source);
    expect(() => Interpreter.interpret(ast)).toThrowError('a has already been declared');
  });

  it('Should properly throw an error when looking up non-existing symbol', () => {
    const source = 'a;';

    const ast = Parser.parse(source);
    expect(() => Interpreter.interpret(ast)).toThrowError('a is not declared');
  });

  it('Should properly throw an error when assigning to non-existing symbol', () => {
    const source = `
      {
        a = 2;
      }
    `;

    const ast = Parser.parse(source);
    expect(() => Interpreter.interpret(ast)).toThrowError('a is not declared');
  });
});

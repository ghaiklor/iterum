import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::ConditionalExpression', () => {
  it('Should properly interpret conditional expression (truthy)', () => {
    const source = 'true ? 10 : 5;';

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    expect(result).toEqual(10);
  });

  it('Should properly interpret conditional expression (falsy)', () => {
    const source = 'false ? 10 : 5;';

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    expect(result).toEqual(5);
  });
});

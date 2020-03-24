import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::FunctionDeclaration', () => {
  it('Should properly define the function in scope and call it', () => {
    const source = `
      function add(a, b) {
        return a + b;
      }

      add(1, 2);
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(3);
  });

  it('Should properly calculate fibonacci recursively with function declaration', () => {
    const source = `
      function fibonacci(num) {
        if (num <= 1) return 1;
        return fibonacci(num - 1) + fibonacci(num - 2);
      }

      fibonacci(10);
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(89);
  });

  it('Should properly create closures over function declarations', () => {
    const source = `
      function makePoint(x, y) {
        function closure(method) {
          if (method === "x") return x;
          if (method === "y") return y;
        }

        return closure;
      }

      const point = makePoint(2, 3);
      point("x") + point("y");
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual(5);
  });
});

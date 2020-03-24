import { Interpreter } from '../../src/interpreter/Interpreter';
import { Parser } from '../../src/parser/Parser';

describe('Iterum::Interpreter::PrintStatement', () => {
  it('Should properly interpret print statement', () => {
    const source = 'print "Hello, World!"';
    const ast = Parser.parse(source);
    const stdoutMock = jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => true);

    Interpreter.interpret(ast);
    expect(stdoutMock).toHaveBeenCalledWith('Hello, World!\n');
    stdoutMock.mockRestore();
  });
});

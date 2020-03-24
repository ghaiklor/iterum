import { Parser } from '../../src/parser/Parser';

describe('Iterum::Parser', () => {
  it('Should properly recover from an error if during parsing some errors were found', () => {
    const source = '(5 + 2';

    expect(() => Parser.parse(source)).toThrowError('There are some lexical and syntax errors found in your code');
  });

  it('Should properly recover from an error and synchronize back to known state', () => {
    const source = `
      function add(5) {}
      [1,2];
      function add(10) {}
      class function throw
    `;

    expect(() => Parser.parse(source)).toThrowError('There are some lexical and syntax errors found in your code');
  });
});

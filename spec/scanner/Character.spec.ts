import { Character } from '../../src/scanner/Character';

describe('Iterum::Scanner::Character', () => {
  it('Should properly wrap the character', () => {
    const char = Character.from('*');

    expect(char).toBeInstanceOf(Character);
    expect(char.is('*')).toBeTruthy();
  });

  it('Should properly check if it is matches against other string', () => {
    const char = Character.from('*');

    expect(char.is('*')).toBeTruthy();
    expect(char.is('/')).toBeFalsy();
  });

  it('Should properly check if it is matches against other string (ascii code)', () => {
    const char = Character.from('*');

    expect(char.is(69)).toBeFalsy();
    expect(char.is(42)).toBeTruthy();
  });

  it('Should properly check if it is matches against other string (another instance)', () => {
    const char = Character.from('*');
    const char2 = Character.from('/');
    const char3 = Character.from('*');

    expect(char.is(char2)).toBeFalsy();
    expect(char.is(char3)).toBeTruthy();
  });

  it('Should always return false if comparator is unrecognizable', () => {
    const char = Character.from('*');

    expect(char.is(undefined)).toBeFalsy();
  });

  it('Should properly check if it is matches against some of possible variants', () => {
    const char = Character.from('2');

    expect(char.isSomeOf(['1', '2', '3'])).toBeTruthy();
    expect(char.isSomeOf(['1', '3'])).toBeFalsy();
  });

  it('Should properly check if it is not matches against some of possible variants', () => {
    const char = Character.from('2');

    expect(char.isNotSomeOf(['1', '2', '3'])).toBeFalsy();
    expect(char.isNotSomeOf(['1', '3'])).toBeTruthy();
  });

  it('Should properly check if it is line terminator', () => {
    const asterisk = Character.from('*');
    const newline = Character.from('\n');

    expect(asterisk.isLineFeed()).toBeFalsy();
    expect(newline.isLineFeed()).toBeTruthy();
  });

  it('Should properly check if it is whitespace', () => {
    const whitespace = Character.from(' ');

    expect(whitespace.isWhitespace()).toBeTruthy();
  });

  it('Should properly check if it is alpha char', () => {
    const alpha = Character.from('a');

    expect(alpha.isAlpha()).toBeTruthy();
  });

  it('Should properly check if it is digit', () => {
    const digit = Character.from('2');

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isAlpha()).toBeFalsy();
  });

  it('Should properly check if it is hexadecimal digit', () => {
    const digit = Character.from('2');
    const hexDigit = Character.from('B');
    const hexDigit2 = Character.from('b');

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isHexDigit()).toBeTruthy();
    expect(digit.isAlpha()).toBeFalsy();
    expect(hexDigit.isDigit()).toBeFalsy();
    expect(hexDigit.isAlpha()).toBeTruthy();
    expect(hexDigit.isHexDigit()).toBeTruthy();
    expect(hexDigit2.isDigit()).toBeFalsy();
    expect(hexDigit2.isAlpha()).toBeTruthy();
    expect(hexDigit2.isHexDigit()).toBeTruthy();
  });

  it('Should properly check if it is octal digit', () => {
    const digit = Character.from('4');
    const nonOctalDigit = Character.from('9');

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isOctalDigit()).toBeTruthy();
    expect(nonOctalDigit.isDigit()).toBeTruthy();
    expect(nonOctalDigit.isOctalDigit()).toBeFalsy();
  });

  it('Should properly check if it is binary digit', () => {
    const digit = Character.from('1');
    const nonBinaryDigit = Character.from('4');

    expect(digit.isDigit()).toBeTruthy();
    expect(digit.isBinaryDigit()).toBeTruthy();
    expect(nonBinaryDigit.isDigit()).toBeTruthy();
    expect(nonBinaryDigit.isBinaryDigit()).toBeFalsy();
  });

  it('Should properly check if it is alphanumeric', () => {
    const alpha = Character.from('b');
    const digit = Character.from('7');

    expect(alpha.isAlphaNumeric()).toBeTruthy();
    expect(digit.isAlphaNumeric()).toBeTruthy();
  });

  it('Should properly return string representation of itself', () => {
    const char = Character.from('s');

    expect(char.toString()).toEqual('s');
  });
});

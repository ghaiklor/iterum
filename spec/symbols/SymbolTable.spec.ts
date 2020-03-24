import { NumberValue } from '../../src/runtime/primitives/NumberValue';
import { StringValue } from '../../src/runtime/primitives/StringValue';
import { Symbol } from '../../src/symbols/Symbol';
import { SymbolTable } from '../../src/symbols/SymbolTable';

describe('Iterum::SymbolTable', () => {
  it('Should properly define/lookup symbols in symbol table', () => {
    const table = new SymbolTable();
    expect(table.define(new Symbol('foo', new StringValue('bar')))).toBeNull();
    expect(table.define(new Symbol('a', new NumberValue(42)))).toBeNull();

    const fooSymbol = table.lookup('foo');
    expect(fooSymbol.name).toEqual('foo');
    expect(fooSymbol.value.data).toEqual('bar');

    const aSymbol = table.lookup('a');
    expect(aSymbol.name).toEqual('a');
    expect(aSymbol.value.data).toEqual(42);
  });

  it('Should properly define/lookup symbols in enclosing scope', () => {
    const globalTable = new SymbolTable();
    const localTable = new SymbolTable(globalTable);

    expect(globalTable.define(new Symbol('foo', new StringValue('bar')))).toBeNull();
    expect(localTable.define(new Symbol('a', new NumberValue(42)))).toBeNull();

    const fooSymbol = localTable.lookup('foo');
    expect(fooSymbol.name).toEqual('foo');
    expect(fooSymbol.value.data).toEqual('bar');

    const aSymbol = localTable.lookup('a');
    expect(aSymbol.name).toEqual('a');
    expect(aSymbol.value.data).toEqual(42);
  });

  it('Should properly throw error if symbol is not found', () => {
    const table = new SymbolTable();
    expect(() => table.lookup('foo')).toThrowError('foo is not declared');
  });

  it('Should properly throw error if symbol is not found, when assigning', () => {
    const table = new SymbolTable();
    expect(() => table.assign(new Symbol('foo', new StringValue('bar')))).toThrowError('foo is not declared');
  });
});

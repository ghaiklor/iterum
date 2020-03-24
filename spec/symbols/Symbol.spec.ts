import { StringValue } from '../../src/runtime/primitives/StringValue';
import { Symbol } from '../../src/symbols/Symbol';

describe('Iterum::Symbols', () => {
  it('Should properly define the symbol', () => {
    const symbol = new Symbol('foo', new StringValue('bar'));

    expect(symbol.name).toEqual('foo');
    expect(symbol.value.data).toEqual('bar');
  });

  it('Should properly stringify the symbol', () => {
    const symbol = new Symbol('foo', new StringValue('bar'));
    expect(symbol.toString()).toEqual('Symbol(foo, bar)');
  });
});

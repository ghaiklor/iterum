import { Symbol } from "../../src/symbols/Symbol";

describe("Iterum::Symbols", () => {
  it("Should properly define the symbol", () => {
    const symbol = new Symbol("foo", "bar");

    expect(symbol.name).toEqual("foo");
    expect(symbol.value).toEqual("bar");
  });

  it("Should properly define the symbol with a function pointer", () => {
    const add = (a: number, b: number) => a + b;
    const symbol = new Symbol("add", add);

    expect(symbol.name).toEqual("add");
    expect(symbol.value).toEqual(add);
    expect(symbol.value(2, 5)).toEqual(7);
  });

  it("Should properly stringify the symbol", () => {
    const symbol = new Symbol("foo", "bar");
    expect(symbol.toString()).toEqual("Symbol(foo)");
  });
});

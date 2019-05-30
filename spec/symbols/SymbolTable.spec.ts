import { Symbol } from "../../src/symbols/Symbol";
import { SymbolTable } from "../../src/symbols/SymbolTable";

describe("Iterum::SymbolTable", () => {
  it("Should properly define/lookup symbols in symbol table", () => {
    const table = new SymbolTable();
    expect(table.define(new Symbol("foo", "bar")));
    expect(table.define(new Symbol("a", 42)));

    const fooSymbol = table.lookup("foo");
    if (fooSymbol) {
      expect(fooSymbol.name).toEqual("foo");
      expect(fooSymbol.value).toEqual("bar");
    } else {
      throw new Error("fooSymbol must be looked up");
    }

    const aSymbol = table.lookup("a");
    if (aSymbol) {
      expect(aSymbol.name).toEqual("a");
      expect(aSymbol.value).toEqual(42);
    } else {
      throw new Error("aSymbol must be looked up");
    }
  });

  it("Should properly define/lookup symbols in enclosing scope", () => {
    const globalTable = new SymbolTable();
    const localTable = new SymbolTable(globalTable);

    expect(globalTable.define(new Symbol("foo", "bar")));
    expect(localTable.define(new Symbol("a", 42)));

    const fooSymbol = localTable.lookup("foo");
    if (fooSymbol) {
      expect(fooSymbol.name).toEqual("foo");
      expect(fooSymbol.value).toEqual("bar");
    } else {
      throw new Error("fooSymbol must be looked up");
    }

    const aSymbol = localTable.lookup("a");
    if (aSymbol) {
      expect(aSymbol.name).toEqual("a");
      expect(aSymbol.value).toEqual(42);
    } else {
      throw new Error("aSymbol must be looked up");
    }
  });

  it("Should properly throw error if symbol is not found", () => {
    const table = new SymbolTable();
    expect(() => table.lookup("foo")).toThrowError("foo is not declared");
  });

  it("Should properly throw error if symbol is not found, when assigning", () => {
    const table = new SymbolTable();
    expect(() => table.assign(new Symbol("foo", "bar"))).toThrowError("foo is not declared");
  });
});

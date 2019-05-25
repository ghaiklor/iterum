import { Symbol } from "./Symbol";

export class SymbolTable {
  private symbols: Map<string, Symbol>; // tslint:disable-line: ban-types
  private enclosingScope: SymbolTable | null;
  constructor(enclosingScope: SymbolTable | null = null) {
    this.symbols = new Map();
    this.enclosingScope = enclosingScope;
  }

  // tslint:disable-next-line: ban-types
  public define(symbol: Symbol) {
    if (this.symbols.has(symbol.name)) {
      throw new Error(`${symbol.name} has already been declared`);
    }

    this.symbols.set(symbol.name, symbol);
    return this;
  }

  // tslint:disable-next-line: ban-types
  public assign(symbol: Symbol): void {
    if (this.symbols.has(symbol.name)) {
      this.symbols.set(symbol.name, symbol);
      return;
    }

    if (this.enclosingScope !== null) {
      return this.enclosingScope.assign(symbol);
    }

    throw new Error(`${symbol.name} is not declared`);
  }

  // tslint:disable-next-line: ban-types
  public lookup(name: string): Symbol {
    const value = this.symbols.get(name);
    if (value !== undefined) {
      return value;
    }

    if (this.enclosingScope !== null) {
      return this.enclosingScope.lookup(name);
    }

    throw new Error(`${name} is not declared`);
  }
}

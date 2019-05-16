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
    this.symbols.set(symbol.name, symbol);
    return this;
  }

  // tslint:disable-next-line: ban-types
  public lookup(name: string): Symbol | undefined {
    if (this.symbols.has(name)) {
      return this.symbols.get(name);
    }

    if (this.enclosingScope !== null) {
      return this.enclosingScope.lookup(name);
    }

    return undefined;
  }
}

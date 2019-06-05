import { SymbolError } from "../errors/SymbolError";
import { Symbol } from "./Symbol";

export class SymbolTable {
  // tslint:disable-next-line: ban-types
  private symbols: Map<string, Symbol> = new Map();
  private enclosingScope: SymbolTable | null = null;
  constructor(enclosingScope: SymbolTable | null = null) {
    this.enclosingScope = enclosingScope;
  }

  // tslint:disable-next-line: ban-types
  public define(symbol: Symbol): null | never {
    if (this.symbols.has(symbol.name)) {
      throw new SymbolError(SymbolError.SYMBOL_ALREADY_DECLARED, symbol.name);
    }

    this.symbols.set(symbol.name, symbol);
    return null;
  }

  // tslint:disable-next-line: ban-types
  public assign(symbol: Symbol): null | never {
    if (this.symbols.has(symbol.name)) {
      this.symbols.set(symbol.name, symbol);
      return null;
    }

    if (this.enclosingScope !== null) {
      return this.enclosingScope.assign(symbol);
    }

    throw new SymbolError(SymbolError.SYMBOL_IS_NOT_DECLARED, symbol.name);
  }

  // tslint:disable-next-line: ban-types
  public lookup(name: string): Symbol | never {
    const value = this.symbols.get(name);
    if (value !== undefined) {
      return value;
    }

    if (this.enclosingScope !== null) {
      return this.enclosingScope.lookup(name);
    }

    throw new SymbolError(SymbolError.SYMBOL_IS_NOT_DECLARED, name);
  }
}

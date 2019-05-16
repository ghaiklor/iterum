export class Symbol {
  public name: string;
  public value: any;
  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }

  public toString() {
    return `Symbol(${this.name})`;
  }
}

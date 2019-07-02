import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::SuperExpression", () => {
  it("Should properly resolve the call to super.method()", () => {
    const source = `
      class Animal {
        whoAmI() {
          return "Animal";
        }
      }

      class Dog extends Animal {
        whoAmI() {
          const superString = super.whoAmI();
          return superString + " " + "Dog";
        }
      }

      const dog = new Dog();
      dog.whoAmI();
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual("Animal Dog");
  });
});

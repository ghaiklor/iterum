import { Interpreter } from "../../src/interpreter/Interpreter";
import { Parser } from "../../src/parser/Parser";

describe("Iterum::Interpreter::ClassDeclaration", () => {
  it("Should properly inherit from another class", () => {
    const source = `
      class Animal {
        whoAmI() {
          return "Animal";
        }
      }

      class Dog extends Animal {}

      const dog = new Dog();
      dog.whoAmI();
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual("Animal");
  });

  it("Should properly override method in superclass", () => {
    const source = `
      class Animal {
        whoAmI() {
          return "Animal";
        }
      }

      class Dog extends Animal {
        whoAmI() {
          return "Dog";
        }
      }

      const dog = new Dog();
      dog.whoAmI();
    `;

    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);

    expect(result).toEqual("Dog");
  });
});

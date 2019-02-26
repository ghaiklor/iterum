import { Node } from "../../src/ast/Node";

describe("Iterum::AST::Node", () => {
  it("Should properly instantiate Node instance and apply the correct type to it", () => {
    const node = new Node();

    expect(node).toBeInstanceOf(Node);
    expect(node.type).toEqual("Node");
  });

  it("Should properly serialize Node to JSON representation", () => {
    const node = new Node();

    expect(JSON.stringify(node)).toEqual(`{"type":"Node"}`);
  });
});

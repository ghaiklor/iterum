import { IterumError } from "../../src/errors/IterumError";

describe("Iterum::IterumError", () => {
  it("Should properly handle the case, when error code does not have a message mapping", () => {
    const error = new IterumError(-1);

    expect(error.message).toEqual("Unrecognizable error");
  });
});

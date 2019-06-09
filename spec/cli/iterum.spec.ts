import { exec, ExecException } from "child_process";
import * as path from "path";

interface ICliResult {
  code: number;
  error: ExecException | null;
  stderr: string;
  stdout: string;
}

function run(args: string[], cwd: string): Promise<ICliResult> {
  return new Promise((resolve) => {
    exec(
      `node ${path.resolve(__dirname, "../../dist/cli/cli.js")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stderr,
          stdout,
        });
      },
    );
  });
}

describe("Iterum::CLI", () => {
  it("Should properly return version", async () => {
    const result = await run(["--version"], ".");

    expect(result.error).toBeNull();
    expect(result.stderr).toEqual("");
    expect(result.code).toEqual(0);
    expect(result.stdout).toEqual("0.4.0\n");
  });
});

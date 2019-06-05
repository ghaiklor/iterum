#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as repl from "repl";
import { Interpreter } from "../interpreter/Interpreter";
import { log } from "./log";
import { parse } from "./parse";
import { replEvaluator } from "./replEvaluator";

program
  // TODO: make version from package.json
  .version("0.4.0", "--version")
  .usage("[options] [file]")
  .option("--print-ast", "print the AST after parsing the source language")
  .option("--interpret", "interpret the code in provided file");

program.on("--help", () => {
  log(``);
  log(`Examples:`);
  log(`  $ iterum`);
  log(`  $ iterum --help`);
  log(`  $ iterum --print-ast your-file.js`);
  log(`  $ iterum --interpret your-file.js`);
});

program.parse(process.argv);

if (program.args.length > 1) {
  program.help();
}

if (program.args.length === 1) {
  const file = program.args[0];
  const source = fs.readFileSync(file, "utf-8");
  const ast = parse(source);

  if (program.printAst) {
    log(JSON.stringify(ast, null, 4));
  }

  if (program.interpret) {
    Interpreter.interpret(ast);
  }

  process.exit(0);
}

if (program.args.length === 0) {
  repl.start({
    eval: replEvaluator(),
    ignoreUndefined: true,
    prompt: "iterum > ",
  });
}

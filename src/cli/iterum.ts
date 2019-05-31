#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as repl from "repl";
import { version } from "../../package.json";
import { ParserError } from "../errors/ParserError";
import { Interpreter } from "../interpreter/Interpreter";
import { Parser } from "../parser/Parser";

// TODO: make normal CLI ?

function printAst(source: string) {
  try {
    const ast = Parser.parse(source);
    process.stdout.write(JSON.stringify(ast, null, 4));
  } catch (e) {
    if (e instanceof ParserError) {
      process.stderr.write(e.toString() + "\n");
      process.exit(65);
    }

    throw e;
  }
}

function interpret(source: string) {
  try {
    const ast = Parser.parse(source);
    const result = Interpreter.interpret(ast);
    process.stdout.write(result + "\n");
  } catch (e) {
    if (e instanceof ParserError) {
      process.stderr.write(e.toString() + "\n");
      process.exit(65);
    }

    throw e;
  }
}

program
  .version(version, "--version")
  .usage("[options] <file...>")
  .option("--print-ast", "print the AST after parsing the source language")
  .option("--interpret", "interpret the code and output the result of last statement")
  .parse(process.argv);

if (program.args.length > 1) {
  program.outputHelp();
  process.exit(64);
}

if (program.args.length === 1) {
  const file = program.args[0];
  if (!file || typeof file !== "string" || !fs.existsSync(file)) {
    process.stderr.write(`File ${file} does not exists\n`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, "utf-8");

  if (program.printAst) {
    printAst(source);
  }

  if (program.interpret) {
    interpret(source);
  }

  process.exit(0);
}

if (program.args.length === 0) {
  const interpreter = new Interpreter();

  repl.start({
    eval: (cmd, _, __, cb) => {
      try {
        const ast = Parser.parse(cmd);
        const result = interpreter.interpret(ast);
        cb(null, result);
      } catch (e) {
        cb(e, null);
      }
    },
    prompt: "iterum > ",
  });
}

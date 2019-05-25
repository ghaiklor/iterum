#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const repl = require('repl');
const path = require('path');
const version = require(path.resolve(__dirname, '../package.json')).version;
const parse = require(path.resolve(__dirname, '../dist/parser/Parser')).Parser.parse;
const Interpreter = require(path.resolve(__dirname, '../dist/interpreter/Interpreter')).Interpreter;

program
  .version(version, '--version')
  .usage('[options] <file...>')
  .option('--print-ast', 'print the AST after parsing the source language')
  .option('--interpret', 'interpret the code and output the result of last statement')
  .parse(process.argv);

if (program.args.length > 1) {
  program.outputHelp();
  process.exit(1);
}

if (program.args.length === 1) {
  const file = program.args[0];
  if (!file || typeof file !== 'string' || !fs.existsSync(file)) {
    console.error(`File ${file} does not exists`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf-8');
  const ast = parse(source);

  if (program.printAst) {
    console.log(JSON.stringify(ast, null, 2));
  }

  if (program.interpret) {
    Interpreter.interpret(ast);
  }

  process.exit(0);
}

if (program.args.length === 0) {
  const interpreter = new Interpreter();

  repl.start({
    prompt: "iterum > ",
    eval: (cmd, context, file, cb) => {
      const ast = parse(cmd);
      const result = interpreter.interpret(ast);

      cb(null, result);
    }
  });
}

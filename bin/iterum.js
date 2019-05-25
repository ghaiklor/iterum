#!/usr/bin/env node

// TODO: make normal CLI when VM will be ready

const program = require('commander');
const fs = require('fs');
const path = require('path');
const version = require(path.resolve(__dirname, '../package.json')).version;
const parse = require(path.resolve(__dirname, '../dist/parser/Parser')).Parser.parse;
const interpret = require(path.resolve(__dirname, '../dist/interpreter/Interpreter')).Interpreter.interpret;

program
  .version(version, '--version')
  .usage('[options] <file...>')
  .option('--print-ast', 'print the AST after parsing the source language')
  .option('--interpret', 'interpret the code and output the result of last statement')
  .parse(process.argv);

const file = program.args[0];
if (!file || typeof file !== 'string' || !fs.existsSync(file)) {
  console.log(`File ${file} does not exists`);
  process.exit(1);
}

const source = fs.readFileSync(file, 'utf-8');
if (program.printAst) {
  console.log(JSON.stringify(parse(source), null, 2));
}

if (program.interpret) {
  interpret(parse(source));
}

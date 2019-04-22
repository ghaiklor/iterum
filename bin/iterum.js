#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const version = require(path.resolve(__dirname, '../package.json')).version;
const parse = require(path.resolve(__dirname, '../dist/parser/Parser')).Parser.parse;

program
  .version(version, '--version')
  .usage('[options] <file...>')
  .option('--print-ast', 'Print the AST after parsing the source language')
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

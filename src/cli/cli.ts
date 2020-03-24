import program from 'commander';
import fs from 'fs';
import repl from 'repl';
import { Interpreter } from '../interpreter/Interpreter';
import { log } from './log';
import { parse } from './parse';
import { replEvaluator } from './replEvaluator';

program
  .version('1.0.0', '--version')
  .usage('[options] [file]')
  .option('--print-ast', 'print the AST after parsing the source language')
  .option('--interpret', 'interpret the code in provided file');

program.on('--help', () => {
  log('');
  log('Examples:');
  log('  $ iterum');
  log('  $ iterum --help');
  log('  $ iterum --print-ast your-file.js');
  log('  $ iterum --interpret your-file.js');
});

program.parse(process.argv);

if (program.args.length > 1) {
  program.help();
}

if (program.args.length === 1) {
  const file = program.args[0];
  const source = fs.readFileSync(file, 'utf-8');
  const ast = parse(source);

  if (program.printAst as boolean) {
    log(JSON.stringify(ast, null, 4));
  }

  if (program.interpret as boolean) {
    Interpreter.interpret(ast);
  }
}

if (program.args.length === 0) {
  repl.start({
    eval: replEvaluator(),
    ignoreUndefined: true,
    prompt: 'iterum > '
  });
}

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const chalk = require('chalk');
const parse = require('../../dist/parser/Parser').Parser.parse;

const EXCLUDES = {
  'pass': require('./pass.json'),
  'pass-explicit': require('./pass-explicit.json'),
  'early': require('./early.json'),
  'fail': require('./fail.json')
};

const TESTS = {
  'pass': path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass'),
  'pass-explicit': path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass-explicit'),
  'early': path.resolve(__dirname, '../../node_modules/test262-parser-tests/early'),
  'fail': path.resolve(__dirname, '../../node_modules/test262-parser-tests/fail'),
};

let totalCount = 0;
let excludedCount = 0;
let passedCount = 0;
let failedCount = 0;

let passed = (name, file, log = false) => {
  passedCount++;
  if (log) {
    console.log(chalk.green(`Test Suite "${name}", case ${file} passed ✅`));
  }
};

let failed = (e, name, file) => {
  failedCount++;
  console.log(chalk.red(`Test Suite "${name}", case ${file} failed ❌`));
  console.log(chalk.red(`${path.resolve(TESTS[name], file)}`));
  console.log(chalk.red(`${e.message}`));
};

let runBatch = (name, isThrow) => {
  let cases = fs.readdirSync(TESTS[name]);
  let casesToProceed = cases.filter(file => !EXCLUDES[name].includes(file));
  let assertMethod = isThrow ? assert.throws : assert.doesNotThrow;

  totalCount += cases.length;
  excludedCount += EXCLUDES[name].length;

  casesToProceed.forEach((file) => {
    try {
      assertMethod(() => parse(fs.readFileSync(`${TESTS[name]}/${file}`, 'utf8')));
      passed(name, file, process.env.LOG_PASSED);
    } catch (e) {
      failed(e, name, file);
    }
  });
};

runBatch('pass', false);
runBatch('pass-explicit', false);
runBatch('early', true);
runBatch('fail', true);

console.log(chalk.green(`Total Cases: ${totalCount}`));
console.log(chalk.green(`Passed Cases: ${passedCount}`));
console.log(chalk.green(`ECMA-262 Coverage: ${(passedCount * 100 / totalCount).toFixed(2)}%`));
console.log('');
console.log(chalk.yellow(`Excluded Cases: ${excludedCount}`));
console.log(chalk.red(`Failed Cases: ${failedCount}`));

if (failedCount > 0) {
  process.exit(1);
}

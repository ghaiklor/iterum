/* eslint-disable node/no-unpublished-require */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const chalk = require('chalk');
const parse = require('../../dist/parser/Parser').Parser.parse.bind(this);

const EXCLUDES = {
  pass: require('./pass.json'),
  'pass-explicit': require('./pass-explicit.json'),
  early: require('./early.json'),
  fail: require('./fail.json')
};

const TESTS = {
  pass: path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass'),
  'pass-explicit': path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass-explicit'),
  early: path.resolve(__dirname, '../../node_modules/test262-parser-tests/early'),
  fail: path.resolve(__dirname, '../../node_modules/test262-parser-tests/fail')
};

let totalCount = 0;
let excludedCount = 0;
let passedCount = 0;
let failedCount = 0;

const passed = (name, file, log = false) => {
  passedCount++;
  if (log) {
    process.stdout.write(chalk.green(`Test Suite "${name}", case ${file} passed ✅\n`));
  }
};

const failed = (e, name, file) => {
  failedCount++;
  process.stdout.write(chalk.red(`Test Suite "${name}", case ${file} failed ❌\n`));
  process.stdout.write(chalk.red(`${path.resolve(TESTS[name], file)}\n`));
  process.stdout.write(chalk.red(`${e.message}\n`));
};

const runBatch = (name, isThrow) => {
  const cases = fs.readdirSync(TESTS[name]);
  const casesToProceed = cases.filter(file => !EXCLUDES[name].includes(file));
  const assertMethod = isThrow ? assert.throws : assert.doesNotThrow;

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

process.stdout.write(chalk.green(`Total Cases: ${totalCount}\n`));
process.stdout.write(chalk.green(`Passed Cases: ${passedCount}\n`));
process.stdout.write(chalk.green(`ECMA-262 Coverage: ${(passedCount * 100 / totalCount).toFixed(2)}%\n`));
process.stdout.write('\n');
process.stdout.write(chalk.yellow(`Excluded Cases: ${excludedCount}\n`));
process.stdout.write(chalk.red(`Failed Cases: ${failedCount}\n`));

if (failedCount > 0) {
  throw new Error('Some of the ECMA-262 tests are failed!');
}

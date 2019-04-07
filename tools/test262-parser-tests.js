const fs = require('fs');
const path = require('path');
const assert = require('assert');
const chalk = require('chalk');
const parse = require('../dist/parser/Parser').Parser.parse;

const EXCLUDES = {
  'pass': [
    '00c79d09c52df3ec.js',
    '0140c25a4177e5f7.module.js',
    '01fd8e8a0a42307b.js',
    '02028e3b961bfee0.js',
    '0228be549a7706e7.js',
    '023e4178e1ad1a82.module.js',
    '0262c247b28885e2.js',
    '027abe815032df72.js',
    '02b924339f85fe00.js',
    '0339fa95c78c11bd.js',
    '034ded949b5c2fa3.js',
    '03608b6e222ae700.js',
    '0371eb8b8c28569d.js',
    '037ecd1db38c230c.module.js',
    '03d1cf071a76d061.js',
    '0453974dd98e662d.js',
    '0458e0c30e8e6fb0.module.js',
    '0466764f0fb9af62.js',
    '046a0bb70d03d0cc.js',
    '046b1012ef9b0e26.js',
    '053480e541f54faf.js',
    '053c0475e49bd36b.js',
    '05448bc107f9b759.js',
  ],
  'pass-explicit': [],
  'early': [],
  'fail': [],
};

const TESTS = {
  'pass': path.resolve(__dirname, '../node_modules/test262-parser-tests/pass'),
  'pass-explicit': path.resolve(__dirname, '../node_modules/test262-parser-tests/pass-explicit'),
  'early': path.resolve(__dirname, '../node_modules/test262-parser-tests/early'),
  'fail': path.resolve(__dirname, '../node_modules/test262-parser-tests/fail'),
};

let totalCount = 0;
let excludedCount = 0;
let passedCount = 0;
let failedCount = 0;

let passed = (name, file) => {
  passedCount++;
  console.log(chalk.green(`Test Suite "${name}", case ${file} passed ✅`));
};

let failed = (name, file) => {
  failedCount++;
  console.log(chalk.red(`Test Suite "${name}", case ${file} failed ❌`));
  console.log(chalk.red(`${path.resolve(TESTS[name], file)}`));
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
      passed(name, file);
    } catch (e) {
      failed(name, file);
    }
  });
};

runBatch('pass', false);
// TODO: un-comment these
// runBatch('pass-explicit', false);
// runBatch('early', true);
// runBatch('fail', true);

console.log(chalk.green(`Total Cases: ${totalCount}`));
console.log(chalk.yellow(`Excluded Cases: ${excludedCount}`));
console.log(chalk.green(`Passed Cases: ${passedCount}`));
console.log(chalk.red(`Failed Cases: ${failedCount}`));
console.log(chalk.yellow(`ECMA-262 Coverage: ${(passedCount * 100 / totalCount).toFixed(2)}%`));

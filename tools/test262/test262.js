const fs = require('fs');
const path = require('path');
const assert = require('assert');
const parse = require('../../dist/parser/Parser').Parser.parse;

const TESTS = {
  'pass': path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass'),
  'pass-explicit': path.resolve(__dirname, '../../node_modules/test262-parser-tests/pass-explicit'),
  'early': path.resolve(__dirname, '../../node_modules/test262-parser-tests/early'),
  'fail': path.resolve(__dirname, '../../node_modules/test262-parser-tests/fail'),
};

let passExcludes = [];
let failExcludes = [];
let earlyExcludes = ['557.script.js', '558.script.js', '559.script.js', '560.script.js', '561.script.js', '563.script.js', '564.script.js', '565.script.js', '566.script.js', '567.script.js', '568.script.js', '569.script.js', '570.script.js', '571.script.js', '572.script.js', '574.script.js', '575.script.js', '576.script.js', '577.script.js', '578.script.js', '579.script.js', '580.script.js', '581.script.js', '582.script.js', '583.script.js', '585.script.js', '586.script.js', '587.script.js', '588.script.js', '589.script.js', '590.script.js', '591.script.js', '592.script.js', '593.script.js', '594.script.js', '596.script.js', '597.script.js', '598.script.js', '599.script.js', '600.script.js', '601.script.js', '602.script.js'];

fs.readdirSync(TESTS.pass).filter(f => !passExcludes.includes(f)).forEach(f => {
  console.log(path.resolve(TESTS["pass"], f));

  let firstTree, secondTree;

  assert.doesNotThrow(() => {
    firstTree = parse(fs.readFileSync(`${TESTS["pass"]}/${f}`, 'utf8'));
  });

  assert.doesNotThrow(() => {
    secondTree = parse(fs.readFileSync(`${TESTS["pass-explicit"]}/${f}`, 'utf8'));
  });

  assert.deepStrictEqual(firstTree, secondTree);
});

fs.readdirSync(TESTS.fail).filter(f => !failExcludes.includes(f)).forEach(f => {
  assert.throws(() => {
    parse(fs.readFileSync(`${TESTS.fail}/${f}`, 'utf8'));
  });
});

fs.readdirSync(TESTS["early"]).filter(f => !earlyExcludes.includes(f)).forEach(f => {
  assert.doesNotThrow(() => {
    parse(fs.readFileSync(`${TESTS.early}/${f}`, 'utf8'));
  });

  assert.throws(() => {
    parse(fs.readFileSync(`${TESTS.early}/${f}`, 'utf8'));
  });
});

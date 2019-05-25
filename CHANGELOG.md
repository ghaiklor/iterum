# 0.1.0 (2019-05-11)


### Bug Fixes

* 🐛 ++a is parsing as UnaryExpression, not UpdateExpression ([c8709ba](https://github.com/ghaiklor/iterum/commit/c8709ba))
* 🐛 alternate branch in if statement must be null by default ([5b02c3c](https://github.com/ghaiklor/iterum/commit/5b02c3c))
* 🐛 bin property in package.json has a wrong path to the CLI ([40d4493](https://github.com/ghaiklor/iterum/commit/40d4493))
* 🐛 block statement and iteration statement parsing ([321dc9b](https://github.com/ghaiklor/iterum/commit/321dc9b))
* 🐛 CallExpression is parsing recursively ([bfa560a](https://github.com/ghaiklor/iterum/commit/bfa560a))
* 🐛 FunctionExpression can have optional function keyword ([2d362d5](https://github.com/ghaiklor/iterum/commit/2d362d5))
* 🐛 issue when parser takes wrong branch in left hand rule ([a75a9bf](https://github.com/ghaiklor/iterum/commit/a75a9bf))
* 🐛 issue with wrong location updates, when look-ahead ([d87b5d7](https://github.com/ghaiklor/iterum/commit/d87b5d7))
* 🐛 label in continue statement must be null by default ([185e15c](https://github.com/ghaiklor/iterum/commit/185e15c))
* 🐛 label must be null in break statement by default ([38a3d1b](https://github.com/ghaiklor/iterum/commit/38a3d1b))
* 🐛 memberExpression is not parsing recursively ([3586082](https://github.com/ghaiklor/iterum/commit/3586082))
* 🐛 parse VariableStatement when right curly brace not eaten ([58c1aac](https://github.com/ghaiklor/iterum/commit/58c1aac))
* 🐛 parsing boolean literals, when false parsed as true ([7402144](https://github.com/ghaiklor/iterum/commit/7402144))
* 🐛 semicolon must be optional in statement list ([7f8fe8b](https://github.com/ghaiklor/iterum/commit/7f8fe8b))
* 🐛 semicolons in class body is no-go ([a25828d](https://github.com/ghaiklor/iterum/commit/a25828d))
* 🐛 statementList is parsing recursively until the EOS ([ba049cc](https://github.com/ghaiklor/iterum/commit/ba049cc))
* 🐛 static MethodDefinitions are not properly parsed ([b058e22](https://github.com/ghaiklor/iterum/commit/b058e22))
* 🐛 switch statement getting unexpected token case ([0315000](https://github.com/ghaiklor/iterum/commit/0315000))
* 🐛 umask for bit/iterum.js that does not allow execute it ([b8563fb](https://github.com/ghaiklor/iterum/commit/b8563fb))
* 🐛 unable to locate dist folder if running from CLI ([faafa7d](https://github.com/ghaiklor/iterum/commit/faafa7d))
* 🐛 update AST interfaces to the latest revision ([8b8f5e0](https://github.com/ghaiklor/iterum/commit/8b8f5e0))
* 🐛 when class has an empty body, it throws an error ([e9d9ab2](https://github.com/ghaiklor/iterum/commit/e9d9ab2))
* 🐛 while statements were created in DoWhile AST nodes ([e0d0027](https://github.com/ghaiklor/iterum/commit/e0d0027))


### Features

* 🎸 add a simple CLI over iterum to print AST at least ([938f618](https://github.com/ghaiklor/iterum/commit/938f618))
* 🎸 add missing tokens and keywords, hex/bin/oct literals ([c2c9a0b](https://github.com/ghaiklor/iterum/commit/c2c9a0b))
* 🎸 done with single and sequence expressions ([85ba1b3](https://github.com/ghaiklor/iterum/commit/85ba1b3))
* 🎸 implement AST interfaces based on SM Parser API ([c5765bc](https://github.com/ghaiklor/iterum/commit/c5765bc))
* 🎸 implement parsing for almost all expressions in JS ([d78f00f](https://github.com/ghaiklor/iterum/commit/d78f00f))
* 🎸 implement parsing for classes and arrow functions ([123b42b](https://github.com/ghaiklor/iterum/commit/123b42b))
* 🎸 implement parsing for getters, setters and eos ([fb2624b](https://github.com/ghaiklor/iterum/commit/fb2624b))
* 🎸 implement parsing function declarations/expressions ([984574c](https://github.com/ghaiklor/iterum/commit/984574c))
* 🎸 implement parsing modules syntax ([4a9833f](https://github.com/ghaiklor/iterum/commit/4a9833f))
* 🎸 implement parsing statementList and lexical bindings ([b28f4f9](https://github.com/ghaiklor/iterum/commit/b28f4f9))
* 🎸 implement parsing the remaining statements ([b80b92e](https://github.com/ghaiklor/iterum/commit/b80b92e))
* 🎸 introduce generic method openNode/closeNode ([9a15b5f](https://github.com/ghaiklor/iterum/commit/9a15b5f))
* 🎸 update AST nodes to be conformant to the latest SM API ([4b9755f](https://github.com/ghaiklor/iterum/commit/4b9755f))




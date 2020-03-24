# [1.0.0](https://github.com/ghaiklor/iterum/compare/v0.6.0...v1.0.0) (2019-07-02)

### Features

* 🎸 classes inheritance ([11cc06a](https://github.com/ghaiklor/iterum/commit/11cc06a))
* 🎸 implement SuperExpression to access superclasses direct ([ba8d27f](https://github.com/ghaiklor/iterum/commit/ba8d27f))

# [0.6.0](https://github.com/ghaiklor/iterum/compare/v0.5.0...v0.6.0) (2019-07-02)

### Bug Fixes

* 🐛 classes in JavaScript are functions you can call ([bcfb877](https://github.com/ghaiklor/iterum/commit/bcfb877))

### Features

* 🎸 check for function arity before call it ([b7d1840](https://github.com/ghaiklor/iterum/commit/b7d1840))
* 🎸 implement [[Set]] expressions for assignments ([ce6cf4b](https://github.com/ghaiklor/iterum/commit/ce6cf4b))
* 🎸 implement classes/instances and fields looking up there ([908b64b](https://github.com/ghaiklor/iterum/commit/908b64b))
* 🎸 implement methods support in classes ([e39a07a](https://github.com/ghaiklor/iterum/commit/e39a07a))
* 🎸 interpreter for empty statements ([a722adc](https://github.com/ghaiklor/iterum/commit/a722adc))
* 🎸 support for constructors in classes ([b2abf89](https://github.com/ghaiklor/iterum/commit/b2abf89))
* 🎸 this expressions now refers to an instance ([f966b2f](https://github.com/ghaiklor/iterum/commit/f966b2f))

# [0.5.0](https://github.com/ghaiklor/iterum/compare/v0.4.0...v0.5.0) (2019-06-09)

### Bug Fixes

* 🐛 scope of the function declaration is lost in closures ([40ef511](https://github.com/ghaiklor/iterum/commit/40ef511))

### Features

* 🎸 implement Value wrappers for run-time data ([dc56dc3](https://github.com/ghaiklor/iterum/commit/dc56dc3))
* 🎸 implement wrappers for run-time values ([365ad4d](https://github.com/ghaiklor/iterum/commit/365ad4d))

# [0.4.0](https://github.com/ghaiklor/iterum/compare/v0.3.0...v0.4.0) (2019-05-31)

### Bug Fixes

* 🐛 building issues with json resolver for TypeScript ([2233831](https://github.com/ghaiklor/iterum/commit/2233831))

### Features

* 🎸 implement function declarations and call expressions ([8976414](https://github.com/ghaiklor/iterum/commit/8976414))
* 🎸 implement panic mode for parser and scanner ([0b77da8](https://github.com/ghaiklor/iterum/commit/0b77da8))
* 🎸 implement syntax\runtime support for holes in an array ([d0713c5](https://github.com/ghaiklor/iterum/commit/d0713c5))
* 🎸 implement wrappers for different kinds of errors ([df88098](https://github.com/ghaiklor/iterum/commit/df88098))

# [0.3.0](https://github.com/ghaiklor/iterum/compare/v0.2.0...v0.3.0) (2019-05-28)

### Features

* 🎸 add {do-while, while, for} loops, if statement and expr ([f9ee865](https://github.com/ghaiklor/iterum/commit/f9ee865))

# [0.2.0](https://github.com/ghaiklor/iterum/compare/v0.1.0...v0.2.0) (2019-05-25)

### Bug Fixes

* 🐛 symbol table instance leak as an interpret result ([00c8a6a](https://github.com/ghaiklor/iterum/commit/00c8a6a))

### Features

* 🎸 implement basic interpreter with few visitors ([59cbb64](https://github.com/ghaiklor/iterum/commit/59cbb64))
* 🎸 implement interpreter for VariableDeclaration ([aba0fc3](https://github.com/ghaiklor/iterum/commit/aba0fc3))
* 🎸 implement print as a statement ([b968de6](https://github.com/ghaiklor/iterum/commit/b968de6))
* 🎸 implement REPL for interpreter ([0770e27](https://github.com/ghaiklor/iterum/commit/0770e27))
* 🎸 implement variable declarations, assignments, scopes ([660edc7](https://github.com/ghaiklor/iterum/commit/660edc7))
* 🎸 implement visitor for AST nodes ([563fdbb](https://github.com/ghaiklor/iterum/commit/563fdbb))
* 🎸 implementation for symbol tables ([248eae6](https://github.com/ghaiklor/iterum/commit/248eae6))

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

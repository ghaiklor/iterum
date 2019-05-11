# Iterum

![Travis (.com) branch](https://img.shields.io/travis/com/ghaiklor/iterum/master.svg)
![Codecov branch](https://img.shields.io/codecov/c/github/ghaiklor/iterum/master.svg)
![Codacy branch grade](https://img.shields.io/codacy/grade/315a0c481bd74165bc0c64597d893f32/master.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/ghaiklor/iterum.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)
![ECMA-262 Coverage](https://img.shields.io/static/v1.svg?label=ECMA-262%20Coverage&message=51.50%&color=informational)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ghaiklor/iterum.svg)

[![GitHub followers](https://img.shields.io/github/followers/ghaiklor.svg?label=Follow&style=social)](https://github.com/ghaiklor)
[![Twitter Follow](https://img.shields.io/twitter/follow/ghaiklor.svg?label=Follow&style=social)](https://twitter.com/ghaiklor)

_Iterum (latin) means "again, a second time, repeatedly, once more, for the second time, anew"._

_This is my another attempt to create a simple but fully implemented "virtual machine" with its own language._
_It is not the real Virtual Machine in its sense._
_It is just an educational project and VM itself is implemented on top of NodeJS run-time._

## Getting Started

Write your code in Iterum Language and save it somewhere, i.e (_examples/add.js_):

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(2, 5));
```

Run iterum and provide path to the file:

```bash
npx @ghaiklor/iterum --print-ast examples/add.js
```

## How It Works

TK fill it when everything is done (explain everything in the code and provide links to it here)

## License

[MIT License](./LICENSE)

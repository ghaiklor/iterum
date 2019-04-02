# Iterum

![Travis (.com) branch](https://img.shields.io/travis/com/ghaiklor/iterum/master.svg)
![Codecov branch](https://img.shields.io/codecov/c/github/ghaiklor/iterum/master.svg)
![Codacy branch grade](https://img.shields.io/codacy/grade/315a0c481bd74165bc0c64597d893f32/master.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/ghaiklor/iterum.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ghaiklor/iterum.svg)

[![GitHub followers](https://img.shields.io/github/followers/ghaiklor.svg?label=Follow&style=social)](https://github.com/ghaiklor)
[![Twitter Follow](https://img.shields.io/twitter/follow/ghaiklor.svg?label=Follow&style=social)](https://twitter.com/ghaiklor)

_Iterum (latin) means "again, a second time, repeatedly, once more, for the second time, anew"._

_This is my another attempt to create a simple but fully implemented "virtual machine" with its own language._
_It is not the real Virtual Machine in its sense._
_It is just an educational project and VM itself is implemented on top of NodeJS run-time._

## Getting Started

TK fill it when everything is done (CLI, REPL, basic examples in Iterum language)

Run the VM in REPL mode:

```shell
iterum
```

Pass the file with Iterum sources to VM for execution:

```shell
iterum your-source-code.im
```

## Iterum Language

TK fill it with grammar and some examples

An example program that read two numbers and adds them together:

```javascript
function add(a, b) {
    return a + b;
}

print("A = ");
let a = read();

print("B = ");
let b = read();

let result = add(a, b);
print("A + B = " + result);
```

## How It Works

TK fill it when everything is done (explain everything in the code and provide links to it here)

## License

[MIT License](./LICENSE)

# Iterum

[![Build Status](https://travis-ci.com/ghaiklor/iterum.svg?branch=master)](https://travis-ci.com/ghaiklor/iterum)
[![codecov](https://codecov.io/gh/ghaiklor/iterum/branch/master/graph/badge.svg)](https://codecov.io/gh/ghaiklor/iterum)
[![BCH compliance](https://bettercodehub.com/edge/badge/ghaiklor/iterum?branch=master)](https://bettercodehub.com/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/315a0c481bd74165bc0c64597d893f32)](https://www.codacy.com/app/ghaiklor/iterum)
---

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

```iterum
fun add(a, b) {
    ret a + b;
}

print("A = ");
let a = read();

print ("B = ");
let b = read();

let result = add(a, b);
print("A + B = " + result);
```

## How It Works

TK fill it when everything is done (explain everything in the code and provide links to it here)

## License

[MIT License](./LICENSE)

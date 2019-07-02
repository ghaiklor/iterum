# iterum

![Travis (.com) branch](https://img.shields.io/travis/com/ghaiklor/iterum/master.svg)
![Codecov branch](https://img.shields.io/codecov/c/github/ghaiklor/iterum/master.svg)
![Codacy branch grade](https://img.shields.io/codacy/grade/315a0c481bd74165bc0c64597d893f32/master.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/ghaiklor/iterum.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)
![ECMA-262 Coverage](https://img.shields.io/static/v1.svg?label=ECMA-262%20Coverage&message=51.50%&color=informational)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ghaiklor/iterum.svg)

[![GitHub followers](https://img.shields.io/github/followers/ghaiklor.svg?label=Follow&style=social)](https://github.com/ghaiklor)
[![Twitter Follow](https://img.shields.io/twitter/follow/ghaiklor.svg?label=Follow&style=social)](https://twitter.com/ghaiklor)

_Iterum (latin) means “again, a second time, repeatedly, once more, for the second time, anew,”._
_This is my another attempt to create a simple, but fully implemented interpreter for a subset of ECMA specification._

__NOTE: This is an educational project, and it is not designed for use in production.__

## Why

For a last few years I was passionate about compilers, languages and similar stuff.
And I am still passionate about it.

However, all my knowledge was based on theoretical knowledge and not on a practical one.
So, I’ve written an interpreter to fasten it.

## Key Concepts

iterum itself is implemented on top of these key concepts:

- Recursive descent parser with a look-ahead by one character;
- Parser for an ECMA subset emits ESTree;
- Interpreter is implemented on top of traverser for different AST nodes;

## Getting Started

iterum is packed as an npm package, so you can easily run it with `npx`:

```bash
npx @ghaiklor/iterum --help
```

Create a file somewhere on your machine with an iterum code:

```javascript
// hello-world.js
function helloWorld() {
    print "Hello, World";
}

helloWorld();
```

If you want to take a look into AST generated from the file above:

```bash
npx @ghaiklor/iterum --print-ast hello-world.js
```

Otherwise, you can interpret it:

```bash
npx @ghaiklor/iterum --interpret hello-world.js
```

## Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## How It Works

You can find rough explanation [here](./docs/index.md).

## License

[MIT License](./LICENSE)

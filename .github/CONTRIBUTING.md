# How to contribute

I'm really glad you're reading this, because we need volunteer developers to help this project come to fruition.

## Bootstrapping

Clone the repository:

```bash
git clone git@github.com:ghaiklor/iterum.git
```

Install dependencies:

```bash
npm install
```

## Testing

We have a lot of Jest tests, written to cover as many cases as we can.
You can find these tests in [spec](./spec) folder.
So, please write Jest tests for new code you create, thanks.

You can run tests locally, by calling:

```bash
npm test
```

Furthermore, if you want to make the whole pipeline of checks, call:

```bash
npm run all
```

We have ECMA-262 tests for parser as well.
You can find the runner for them in [tools/test262-parser-tests](./tools/test262-parser-tests) folder and run it by calling:

```bash
npm run test:test262-parser-tests
```

## Submitting changes

Please send a [GitHub Pull Request to iterum](https://github.com/ghaiklor/iterum/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)).
When you send a pull request, we will love you forever if you include Jest tests.
We can always use more test coverage.
Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits.
For these purposes, we made an integration with `git-cz` that you can use instead of `git commit` by calling:

```bash
npm run commit
```

## Coding conventions

We are using recommended preset from `eslint` for our coding conventions.
Start reading our code and you'll get the hang of it.

In case, you are not sure about some styling in your code, you can check it by calling:

```bash
npm run lint
```

---

Thanks,
Eugene Obrezkov

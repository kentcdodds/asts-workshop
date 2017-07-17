# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

It is recommended you use [`yarn`](https://yarnpkg.com/) rather than [`npm`](https://www.npmjs.com/). But if you'd
rather stick with `npm`, simply replace `yarn` in the commands below with `npm`.

1. Fork and clone the repo
2. Run `yarn start setup` to verify your system and install dependencies
3. Create a branch for your PR

You can run `yarn start` to see what scripts are available.

> Protip: we're using [nps][nps] in this project. If you want to type less, then
> you can install nps globally: `yarn global add nps` (or `npm i -g nps`) and
> then you can run `nps` instead of `npm start`

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification. To add yourself to the table of
contributors on the README.md, please use the automated script as part of your PR:

```console
yarn start contrib.add
```

Follow the prompt. If you've already added yourself to the list and are making a new type of contribution, you can run
it again and select the added contribution type.

## Where to contribute

This project uses [a special script](https://github.com/kentcdodds/asts-workshop/blob/master/scripts/copy-exercise.js)
to make it so attendees can easily run `npm start exercise.eslint.2` and it'll copy the eslint exercise 2 files to the
`./exercises` directory. That way attendees don't have to know which file to open (because it'll always be the same one).

With that in mind, all the exercises are in
[`./other/final`](https://github.com/kentcdodds/asts-workshop/tree/master/other/final). If you wish to make a change to
one of the exercises, simply open the file and its associated test and make your changes. Then you can verify that things
still work by running `npm start validate`. If everything works then you're good to go!

### Extra Credit

There are definitely more features we could add tests for, and you can also add tests to existing features. You can put
these at the bottom in an "Extra Credit" section with `test.skip`. This way people who work through the solutions
quickly can have something to solidify their learning further while others finish the core content. Please follow the
instructions above when contributing. Thanks for your help!

## opt into git hooks

There are git hooks set up with this project that are automatically installed when you install dependencies. They're
really handy, but are turned off by default (so as to not hinder new contributors). You can opt into these by creating
a file called `.opt-in` at the root of the project and putting this inside:

```
precommit
```

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[all-contributors]: https://github.com/kentcdodds/all-contributors
[onchange]: https://npmjs.com/package/onchange
[jest-watch]: https://egghead.io/lessons/javascript-use-jest-s-interactive-watch-mode?pl=testing-javascript-with-jest-a36c4074
[nps]: https://npmjs.com/package/nps

# JavaScript ASTs Workshop

_Improved productivity 💯 with the practical 🤓 use of the power 💪 of Abstract
Syntax Trees 🌳 to lint ⚠️ and transform 🔀 your code_

[![slides-badge][slides-badge]][slides]
[![chat-badge][chat-badge]][chat]
[![Build Status][build-badge]][build]
[![Dependencies][dependencyci-badge]][dependencyci]
[![MIT License][license-badge]][LICENSE]
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]
[![Code of Conduct][coc-badge]][coc]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

<a href="https://app.codesponsor.io/link/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/asts-workshop" rel="nofollow"><img src="https://app.codesponsor.io/embed/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/asts-workshop.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

**Before You Start**

I've used this repo to teach about ASTs in various settings. I've branched the
repo for each one of them. Reference those branches based on what you're
following along with:

- Frontend Masters: [`fem`](https://github.com/kentcdodds/asts-workshop/tree/fem)

To checkout that branch run: `git checkout <branch name>`. From there on you
should be good.

You may also want to check out the `Changes` section in the README below.

## Welcome

By coding along with us in this workshop you’ll:

- Learn what can be done with Abstract Syntax Trees.
- Explore what tools are available for learning about and developing with ASTs.
- Discover what ASTs are.
- Understand why and how to write custom ESLint rules
- Write custom Babel plugins
- Learn why and how to write a codemod with Babel

## Workshop workflow

The workflow of this workshop is fairly simple and based on
[Make It Stick][makeitstick] methodologies:

1. Learn a few concepts via demos
2. Apply the concepts via exercises
3. Write down three core concepts you learned and provide feedback on the
   exercise (elaboration and reflection)

## Project

### System Requirements

- [git][git] v2.10.2 or greater
- [NodeJS][node] v6.9.5 or greater
- [yarn][yarn] v0.20.3 or greater (or [npm][npm] v4.2.0 or greater)

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```
git --version
node --version
yarn --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for
[windows][win-path] or [mac/linux][mac-path].

### Setup

After you've made sure to have the correct things (and versions) installed, you should be able to just run a few
commands to get set up:

```
git clone https://github.com/kentcdodds/asts-workshop.git
cd asts-workshop
yarn run setup --silent
node scripts/autofill-feedback-email.js YOUR_EMAIL@DOMAIN.COM
git commit -am "ready to go"
```

> Replace `YOUR_EMAIL@DOMAIN.COM` with your email address

This may take a few minutes. If you get any errors, please read the error output
and see whether there's any instructions to fix things and try again. If you're
still getting errors or need any help at all, then please
[file an issue][issue].

If this finishes without issues, great 👏! However, if you have problems, please
file an issue on this repo [here][setup-issue].

### Note on yarn

If you don't have `yarn` installed and don't want to use it for some reason, you
can use [`npm`][npm] as well. Instead of `yarn start setup`, run
`node ./scripts/install && npm start validate` and enjoy waiting (and hopefully
things don't break for you). May be a good idea to still run
`node ./scripts/verify` to verify you have the right version of other things
too.

## Running the workshop

The workshop is set up to place the right exercise in the `exercises` directory
when you run a special script. This way you always know exactly where to go.
For example, to start the first ESLint exercise:

```
npm start exercise.eslint.0
```

You'll notice that this will create an `exercises` directory with the source
file and tests in it. Your job is to make that test pass! To run the tests, run:

```
npm start
```

> Tip: You could run `npm start` in a separate terminal window, and use another
> one to run the `npm start exercise...` scripts

### On your own

This workshop is intended to be grouped with a lecture, but if you're unable
to watch a recording or have a lecture, then you can feel free to run through
the workshop yourself. The solutions are all in the `other/final` directory
if you get stuck. Good luck! 🎉 To get a primer on ASTs, you may find this
talk recording helpful: [ASTs for Beginners](https://youtu.be/CFQBHy8RCpg)

### Contributing

If you have any questions, [let me know][issue].

If you want to edit/update anything in the exercises, please see (and follow)
the [contributing guidelines][contributing]!

## Events

If you use this workshop, please [make a Pull Request][makepr] this README with
a link to your event.

- [Kent C. Dodds][twitter-kentcdodds] at [Frontend Masters][fem] (in April 2017)

## Changes

The community and tools move fast. Here's a list of changes since I first gave
this workshop:

- [babel-plugin-tester][tester] was released and is a fantastic way to test your plugins

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/asts-workshop/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/asts-workshop/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/asts-workshop/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/tigermarques"><img src="https://avatars3.githubusercontent.com/u/15315098?v=3" width="100px;" alt="João Marques"/><br /><sub><b>João Marques</b></sub></a><br /><a href="https://github.com/kentcdodds/asts-workshop/issues?q=author%3Atigermarques" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mstaicu"><img src="https://avatars0.githubusercontent.com/u/999432?v=4" width="100px;" alt="Mircea Staicu"/><br /><sub><b>Mircea Staicu</b></sub></a><br /><a href="https://github.com/kentcdodds/asts-workshop/commits?author=mstaicu" title="Code">💻</a> <a href="https://github.com/kentcdodds/asts-workshop/commits?author=mstaicu" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/StanimiraVlaeva"><img src="https://avatars2.githubusercontent.com/u/7893485?v=4" width="100px;" alt="Stanimira Vlaeva"/><br /><sub><b>Stanimira Vlaeva</b></sub></a><br /><a href="https://github.com/kentcdodds/asts-workshop/commits?author=sis0k0" title="Code">💻</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt="Justin Dorfman"/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

# LICENSE

MIT

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[slides]: http://kcd.im/asts-workshop-slides
[slides-badge]: https://cdn.rawgit.com/kentcdodds/custom-badges/2/badges/slides.svg
[chat]: https://gitter.im/kentcdodds/asts-workshop
[chat-badge]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[build-badge]: https://img.shields.io/travis/kentcdodds/asts-workshop.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/asts-workshop
[dependencyci-badge]: https://dependencyci.com/github/kentcdodds/asts-workshop/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/kentcdodds/asts-workshop
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/asts-workshop/blob/master/other/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/asts-workshop/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/asts-workshop.svg?style=social
[github-watch]: https://github.com/kentcdodds/asts-workshop/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/asts-workshop.svg?style=social
[github-star]: https://github.com/kentcdodds/asts-workshop/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20asts-workshop%20by%20@kentcdodds%20https://github.com/kentcdodds/asts-workshop%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/asts-workshop.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[watch-mode]: https://egghead.io/lessons/javascript-use-jest-s-interactive-watch-mode?pl=testing-javascript-with-jest-a36c4074
[makeitstick]: http://makeitstick.net/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/asts-workshop/issues/new
[setup-issue]: https://github.com/kentcdodds/asts-workshop/issues/new?title=Issues%20Setting%20Up&body=Here%27s%20my%20node/yarn%20version%20and%20the%20output%20when%20I%20run%20the%20commands:
[makepr]: http://makeapullrequest.com
[twitter-kentcdodds]: https://twitter.com/kentcdodds
[fem]: https://frontendmasters.com/
[contributing]: https://github.com/kentcdodds/asts-workshop/blob/master/CONTRIBUTING.md
[nps]: https://npmjs.com/package/nps
[tester]: https://github.com/babel-utils/babel-plugin-tester

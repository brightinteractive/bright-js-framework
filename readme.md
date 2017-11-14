[![Build Status](https://travis-ci.org/brightinteractive/bright-js-framework.svg?branch=master)](https://travis-ci.org/brightinteractive/bright-js-framework)
[![Coverage Status](https://coveralls.io/repos/github/brightinteractive/bright-js-framework/badge.svg?branch=AP-84_coveralls)](https://coveralls.io/github/brightinteractive/bright-js-framework?branch=master)
![NPM Version](https://img.shields.io/npm/v/@brightinteractive/bright-js-framework.svg)

A batteries-included React framework for rapidly developing fast, testable, desktop-calibre web apps in React.


Getting started:
==

Documentation and quickstart guides can be found on the project site. The rest of this readme is only of interest if you want to work on the framework itself.

https://brightinteractive.github.io/bright-js-framework


Development guide
==

Prerequisites
--
Node 8.3+ or higher.

This repo uses gulp as a task runner. Which is *so* 2015, but it fits the range of build tasks this library needs quite well. You will need to install the gulp cli in order to run the build commands:

```
npm i -g gulp-cli
```


Initial setup
---

This repo uses npm to manage dependencies. It also includes a helpful pre-commit script, which auto-fixes minor linting and code formatting issues that are irritating to handle manually (indentation, quote styles, etc).

```
npm install

# Optional: symlink githook scripts
ln -s ../../githooks/pre-commit .git/hooks/pre-commit
```

Running test/ci scripts
---

Running individual CI tasks:

* `gulp typecheck`
* `gulp lint`
* `gulp test`
* `gulp coverage`

To run everything that the CI runs against open pull requests:

* `gulp`

To run on file change:

* `gulp watch`


Running local framework changes against an application
---

It may sometimes be useful to develop this framework against a live-reloading application.
You can symlink a local copy of the framework into your app's node_modules by running:

```
cd (path to framework)
npm link
cd (path to your app)
npm link @brightinteractive/bright-js-framework
```

Note that you'll need to do this again whenever you `npm install` in your app.

By default, webpack will only monitor changes to the transpiled javascript from this library, not the source typescript files. To rebuild on source changes, use `gulp watch:rebuild`.

To revert to the previously installed version:

`npm unlink @brightinteractive/bright-js-framework`

To replace with the latest version after merging to master:

`npm install @brightinteractive/bright-js-framework@latest`


Release workflow
---

Releases are auto-deployed on merge to master if the version in package.json has incremented.


Documentation
---

Documentation is autogenerated from typescript files in [src/api](/bright-js-framework/tree/master/src/api). The documentation site is deployed on merge to master and built using [gatsby](https://gatsbyjs.org). Site templates live in [/site](/bright-js-framework/tree/master/docs-site/)

Pull requests must include documentation for new or updated APIs. This may consist of either header-docs or high-level conceptual documentation or both.

For information about working on the documentation, refer to the docsite's [readme](/bright-js-framework/blob/master/docs-site/README.md)

License
==
MIT

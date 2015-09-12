# `lighter-type`
[![NPM Version](https://img.shields.io/npm/v/lighter-type.svg)](https://npmjs.org/package/lighter-type)
[![Downloads](https://img.shields.io/npm/dm/lighter-type.svg)](https://npmjs.org/package/lighter-type)
[![Build Status](https://img.shields.io/travis/lighterio/lighter-type.svg)](https://travis-ci.org/lighterio/lighter-type)
[![Code Coverage](https://img.shields.io/coveralls/lighterio/lighter-type/master.svg)](https://coveralls.io/r/lighterio/lighter-type)
[![Dependencies](https://img.shields.io/david/lighterio/lighter-type.svg)](https://david-dm.org/lighterio/lighter-type)
[![Support](https://img.shields.io/gratipay/Lighter.io.svg)](https://gratipay.com/Lighter.io/)

The `lighter-type` module is a lightweight inheritance utility.

It supports:
* Constructors (`Type.prototype.init`)
* Prototypal inheritance (`Type.extend`)
* Multiple inheritance (`Type.decorate`)
* Non-enumerable property definitions (`Type.hide`)


## Installation

From your project directory, install and save as a dependency:
```bash
npm install --save lighter-type
```


## API

For now, please see the [source](https://github.com/lighterio/lighter-type/blob/master/lighter-type.js).


## Examples

For now, please see the [tests](https://github.com/lighterio/lighter-type/blob/master/test/type.js).


## Acknowledgements

We would like to thank all of the amazing people who use, support,
promote, enhance, document, patch, and submit comments & issues -
`lighter-type` couldn't exist without you.

Additionally, huge thanks go to [Goin’](https://goin.io) for employing
and supporting [`lighter-type`](http://lighter.io/lighter-type) project
maintainers, and for being an epically awesome place to work (and play).


## MIT License

Copyright (c) 2014 Sam Eubank

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## How to Contribute

We welcome contributions from the community and are happy to have them.
Please follow this guide when logging issues or making code changes.

### Logging Issues

All issues should be created using the
[new issue form](https://github.com/lighterio/lighter-type/issues/new).
Please describe the issue including steps to reproduce. Also, make sure
to indicate the version that has the issue.

### Changing Code

Code changes are welcome and encouraged! Please follow our process:

1. Fork the repository on GitHub.
2. Fix the issue ensuring that your code follows the
   [style guide](http://lighter.io/style-guide).
3. Add tests for your new code, ensuring that you have 100% code coverage.
   (If necessary, we can help you reach 100% prior to merging.)
   * Run `npm test` to run tests quickly, without testing coverage.
   * Run `npm run cover` to test coverage and generate a report.
   * Run `npm run report` to open the coverage report you generated.
4. [Pull requests](http://help.github.com/send-pull-requests/) should be made
   to the [master branch](https://github.com/lighterio/lighter-type/tree/master).

### Contributor Code of Conduct

As contributors and maintainers of `lighter-type`, we pledge to respect all
people who contribute through reporting issues, posting feature requests,
updating documentation, submitting pull requests or patches, and other
activities.

If any participant in this project has issues or takes exception with a
contribution, they are obligated to provide constructive feedback and never
resort to personal attacks, trolling, public or private harassment, insults, or
other unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, edits, issues, and other contributions
that are not aligned with this Code of Conduct. Project maintainers who do
not follow the Code of Conduct may be removed from the project team.

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by opening an issue or contacting one or more of the project
maintainers.

We promise to extend courtesy and respect to everyone involved in this project
regardless of gender, gender identity, sexual orientation, ability or
disability, ethnicity, religion, age, location, native language, or level of
experience.

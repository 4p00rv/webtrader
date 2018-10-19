# Webtrader ![Build Status](https://travis-ci.org/binary-com/webtrader.svg?branch=master)

This repository contains HTML, Javascript, CSS, and images for [WebTrader](http://binary-com.github.io/webtrader) website.

## Project goal
The goal of this project is to create a full-screen trading interface for [Binary.com](https://www.binary.com) according to the following design:
![Webtrader](https://banners.binary.com/misc/webtrader-layout.jpg)

## Prerequisites

        * git
        * node JS
        * yarn

## How to work with this project

        $ git clone https://github.com/binary-com/webtrader.git
        $ cd webtrader
        $ yarn install
        $ yarn build #compiles the project
        $ yarn start #Start a local server and serve the compiled files

Running this command will launch local server at http://localhost:9001

Since backend needs an https web address for **oauth app register** if you intend to debug oauth login on localhost,  you need to modify your `/etc/hosts` file. For example the `https://webtrader.local/` token in `src/oauth/app_id.josn` is registered to `https://webtrader.local/` address, you need to do the following in order to use it locally.

*Add this line to your /etc/hosts file.*

        127.0.0.1 webtrader.local

*Use this command to run your local server on https.*

        $ sudo node_modules/.bin/grunt connect:https

*Use this command to watch the files.*

        $ node_modules/.bin/grunt && node_modules/.bin/grunt watch:https

Go to https://webtrader.local:35729 and accept the self signed ssl certificate for grunt livereload.

Now you can debug your app on https://webtrader.local/ locally.

In order to get SLOC(Source line of Code, which displays total number of lines of source code) report, run

        $ yarn sloc

To bump release version, run

        $ yarn major-rel
        or
        $ yarn minor-rel
        or
        $ yarn patch-rel

Every check-in or merge into master will trigger travis-ci build and do a release to production.

Every check-in or merge of PR into development will trigger travis-ci build and do a beta release

#### Translations

Translation related files are in `/translations` folder.
    
  To extract text for translation:

        $ yarn build
        $ cd ./translations
        $ python extract.py
        $ extract.py # extracts string literals from `dist/uncompressed` (from *.html and *.js)
        $ extract.py # for merging `.po` files uses `msgmerge` command line tool.

The tool should be available on linux, if you are on Osx try `brew install gettext && brew link gettext --force`.
to submit text to translators: push to *translation* branch, weblate hook will be triggered.

To see CrowdIn In-Context translations pass querystring `?lang=ach` (obs not for production env)

### Contribution
In order to contribute, please fork and submit pull request by following all the above mentioned coding rules.
While submitting your PR, make sure that you deploy your code to your forked gh-pages by running following command, so that the reviewer can have a look at the deployed code:

        $ grunt deploy-branch
        For releasing compressed code

JavaScript Guidelines
=============

### General Guidelines
In order to improve the clarity, quality and development time it is worth considering the following principles whenever possible:
- [DRY (Don't Repeat Yourself)](https://en.wikipedia.org/wiki/Don't_repeat_yourself)
- [KISS (Keep It Simple, Stupid)](https://en.wikipedia.org/wiki/KISS_principle)
- [SoC (Separation of Concerns)](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter)

---

### Style Guide

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md) is partially being followed in our code base.

- Most styling issues will be caught by ESLint, so before pushing your changes remember to run `grunt eslint` to catch and fix any issues that it finds.

- Check below for the rules that are not caught by ESLint but should be followed.

### Naming Conventions

<a id="naming-conventions-variables"></a>
**[Variables:](#naming-conventions-variables)** Variables should be lowercase words separated by `_`.
    
```js
const field_name = '...';
```

<a id="naming-conventions-functions"></a>
**[Functions:](#naming-conventions-functions)** Functions should be camelCase. This is to easily distinguish between variables and functions.
    
```js
const myFunction = () => { ... };
```

<a id="naming-conventions-modules"></a>
**[Modules:](#naming-conventions-modules)** Module names and classes should be PascalCase.
    
```js
const MyModule = (() => { ... })();
```

<a id="naming-conventions-jquery-variables"></a>
**[jQuery variables:](#naming-conventions-jquery-variables)** jQuery variables should have a `$` in the beginning to mark them.
    
```js
const $test = $('#test');
```

<a id="naming-conventions-javascript-elements"></a>
**[JavaScript elements:](#naming-conventions-javascript-elements)** JavaScript elements start with `el_` for a similar effect.
    
```js
const el_test = document.getElementById('test');
``` 

<a id="naming-conventions-boolean"></a>
**[Boolean:](#naming-conventions-boolean)** Those variables which store a boolean value, should start with `is_`, `has_`, ...

```js
const is_updated = true;
const has_crypto = false;
```

<a id="naming-conventions-form-elements"></a>
**[Form elements:](#naming-conventions-form-elements)** Consider prefixes for form elements to make it more obvious what type of field they are, such as:

```js
const fields = {
    txt_name  : { id: '#txt_name' },
    chk_tnc   : { id: '#chk_tnc' },
    ddl_agents: { id: '#ddl_agents' },
};
```

---

### Commenting

<a id="commenting-explanations"></a>
**[Explanations:](#commenting-explanations)** Feel free to add comments to explain any code that is confusing.

<a id="commenting-todo"></a>
**[To do:](#commenting-todo)** Use `TODO: ...` comments anywhere that needs consideration or attention in the future.

<a id="commenting-api-requests"></a>
**[API requests:](#commenting-api-requests)** Comments should be added to highlight logic that is hardcoded in the front-end and should move to API:

- For changes that can be done in API V3, use the comment 
    
    ```js
    // API_V3: [description of what needs to be moved to API]
    ```

- For changes that should be done in API V4, use the comment 

    ```js
    // API_V4: [description of what needs to be moved to API]
    ```

---

### Import Rules

<a id="import-rules-require"></a>
**[Require:](#import-rules-require)** Use `require` instead of `import` to stay consistent with the current codebase. We could change it to `import` when switching to React.

<a id="import-rules-align-by-equal"></a>
**[Align by equal:](#import-rules-align-by-equal)** Assignments are generally aligned by `=` for readability purposes.

```js
const moment             = require('moment');                       // moment is an npm package
const CookieStorage      = require('./storage').CookieStorage;      // our own function
const applyToAllElements = require('./utility').applyToAllElements; // our own function
const createElement      = require('./utility').createElement;      // our own function
require('../../_common/lib/polyfills/array.includes');              // polyfill from lib folder
require('../../_common/lib/polyfills/string.includes');             // polyfill from lib folder
```

<a id="import-rules-alphabetical-ordering"></a>
**[Alphabetical ordering:](#import-rules-alphabetical-ordering)** The order is important; it should be sorted alphabetically according to path: 
    
- `moment` comes first as it's not a relative path.
- `s` is before `u` so `./storage` comes before `./utility`.
- Both `applyToAllElements` and `createElement` are from the same file, but `a` is before `c`
- Unassigned `require` goes to the end 

<a id="import-rules-combining-require"></a>
**[Combining require:](#import-rules-combining-require)** When there are many functions being imported from the same file, consider combining it into one import line.

```js
const Utility = require('./utility');

...

Utility.handleHash();
Utility.createElement('div');
...
```
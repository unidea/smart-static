# About smart-html

**smart-html** is tool for building static website using HTML, Javascript and SASS.
Behind the scene, **Gulp** provides tasks that will help you during the development process.

This is a simple static site generator which is perfect for a personal, blog or documentation site.
It is similar to other static site generators in that it takes your Markdown content, renders it, optimises it and creates a production-ready site that can be served by Nginx, Apache or another web server.

#### Key features

1. Development server and browser reload on change.
2. Support for bower_components.
3. Support for file inclusion (partials) in html files.
4. Conversion of scss file into css.
5. Minification and concatenation of javascript files (to a single all.min.js).
6. Sourcemapscreation for both css and js documents.

## Installation

First, you must [download and install](https://nodejs.org/) node.js.  The node package manager (npm) will be installed at the same time.
You will also need to [install git](https://git-scm.com/) as **bower** requires node, npm and git.
After, use the `npm` command to install **gulp** and **bower** globally.

```bash
sudo npm install -g gulp-cli
sudo npm install -g bower
```

Finally, clone this repository, go to your project folder and run both `npm install` and `bower install`.  To start the server, type `gulp serve`.

## How it's work

**smart-html** use gulp and other packages to facilitate the delelopment of static website.  Three task are provided:

1. `gulp clean` will remove the _build folder
2. `gulp build` will build a static copy of the site, into the _build folder.
3. `gulp serve` will run `gulp clean` and `gulp build`, the start a server on port 3000.

When the server is started, Gulp will watch for change in the development folder, complete some tasks and output the result to the _build folder.
If needed, the server will then be reloaded.

#### Partials

All partials file (fragment of html) must be put in the __partials__ folder.  This folder will never be copied the the _build folder.
[gulp-file-include](https://www.npmjs.com/package/gulp-file-include) package is used to perform the inclusion task.

#### CSS

SCSS will be compile and output to CSS in the _build/css folder.

#### Deployment

When the site is complete, FTP the content of the _build folder to the production server and voilà!

## Main technologies used by **smart-html**

* [nodejs](https://nodejs.org/)
* [bower](http://bower.io/)
* [gulp](http://gulpjs.com/)
* [sass](http://sass-lang.com/)
* [browser-sync](https://www.browsersync.io/)

#### Gulp related packages

* [gulp-changed](https://www.npmjs.com/package/gulp-changed)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-util](https://www.npmjs.com/package/gulp-util)

#### Miscellaneous packages

* [del](https://www.npmjs.com/package/del)

---

## License

[MIT](./LICENSE).

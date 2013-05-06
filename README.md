# Gang Garrison 2 homepage design

I decided to try my hand at making a homepage design for Gang Garrison 2, using ajf's design as a starting point.

I am also trying to setup a nice development environment for creating the homepage.
I'm using Bootstrap's responsive grid, scaffolding, and CSS normalizer, HTML5 Boilerplate for the base HTML,
and Jade templates to build the HTML.  DocPad automatically renders the website in realtime while you're editing.

## Getting Started

You must have **Node.js** installed.  Get it here: [http://nodejs.org](http://nodejs.org)

Clone this repo or download the code (duh).

In a terminal, `cd` into the source code directory and run:

`npm install`

Any time you change the Twitter Bootstrap `.less` files, recompile them by running:

`node build`

To rebuild the website and host it on a local webserver, run DocPad like so:

`node_modules/.bin/docpad run`

DocPad should automatically rebuild the website every time a file changes.  If it doesn't, just restart the DocPad server.

## Repo structure

The important bits are:

* `bootstrap`: Twitter Bootstrap source code, customized for our needs
* `out`: output directory for DocPad, where the rendered website is saved
* `src`: DocPad source code, split into three directories:
  * `documents`: rendered by docpad into website pages, css files, or Javascript files.  File extensions tell docpad how to render stuff
  * `files`: copied verbatim by DocPad into the output directory
  * `layouts`: HTML layouts, can be referenced by other layouts or files in the `documents` directory
* `build.js`: Build script to re-compile Bootstrap's `less` into `css`
* `docpad.coffee`: CoffeeScript configuration for DocPad; tells it how to build the website

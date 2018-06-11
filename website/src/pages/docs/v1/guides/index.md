---
title: Anatomy of an extension
sectionTitle: Guides (v1)
description: What's the structure of a Mozaïk extension
path: /docs/v1/extension-anatomy
position: 400
---
## Directory layout

You should use the following directory layout when developing a Mozaïk extension.

``` default
mozaik-ext-awesome/ # root extension directory
  preview/     # put preview images in this directory, you can reference them in the README
  src/         # extension javascript code
    components/  # put all your extension's widgets in there
      WidgetA.jsx  # a widget (React component)
      WidgetB.jsx  # another one :)
      index.js     # entry point to all your widgets
    client.js    # extension's client
    config.js    # define your extension's client configuration schema using convict
  styl/        # custom extension styles if you need some
    index.styl   # this is the file that gets collected by Mozaïk
  test/        # of course :)
  .eslintrc    # javascript linter configuration 
  .babelrc     # required for es6/jsx transiplation
  .npmignore   # files to ignore when publishing your extension to npm
  .travis.yml  # to automatically run your tests
  client.js    # entry point to your extension's client
  package.json # dependencies, meta, scripts…
  README.md    # extension description and documentation
```


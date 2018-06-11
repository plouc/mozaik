---
title: Using extensions
description: Use & configure Mozaïk extensions
path: /docs/using-extensions
position: 130
---

## Installation

**Mozaïk** [extensions](/extensions) are maintained as separate modules,
available as `@mozaik/ext-EXT_NAME` npm packages, third party
extensions usually use `mozaik-ext-EXT_NAME` format.

In order to use an extension, you first have to install it:

```
yarn add @mozaik/ext-gitlab
```

## UI registration

Once you've installed the extension, you must register it on the Mozaïk UI.
To do so, you'll have to append it to the `src/index.js` file:

```javascript
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import Mozaik, { Registry } from '@mozaik/ui'
import gitlab from '@mozaik/ext-gitlab'

Registry.addExtensions({
    // it's important that you respect the extension's name here
    gitlab,
})

ReactDOM.render(
    <Mozaik/>,
    document.getElementById('root')
)
```

This will make the extension's widgets available for usage, but if the extension
involves data retrieval through a client, you'll also need to register it on the Mozaïk server.

## Server registration

Now that the extension is available on the UI, you must register it on the server side.
The default entrypoint for the server, is `server.js`.

```javascript
const path = require('path')
const Mozaik = require('@mozaik/server')

// loads the YAML configuration file
Mozaik.configureFromFile(path.join(__dirname, 'conf/config.yml'))
    .then(config => {
        // it's important that you respect the extension's name here
        Mozaik.registerApi('gitlab', require('@mozaik/ext-gitlab/client'))

        // starts the Mozaïk server
        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })
```

Note that while registering the extension's UI, we imported `@mozaik/ext-gitlab`,
for the server we must use `@mozaik/ext-gitlab/client` as extensions expose.

## Widgets configuration

Widgets are the building blocks of a Mozaïk dashboard, a widget is in fact
a react component which may communicate with an API through the extension's client.

Widgets share some common properties which are all required:

| key         | description                         |
| ----------- | ----------------------------------- |
| **type**    | *the type of widget to instantiate* |
| **columns** | *width expressed in columns*        |
| **rows**    | *height expressed in rows*          |
| **x**       | *x position*                        |
| **y**       | *y position*                        |

Example:

``` yaml
# ~/mozaik-demo/config.yml
dashboards:
  - columns: 3
    rows:    2
    widgets:
      - type:    ext.widget_type
        columns: 1
        rows:    1
        x:       0
        y:       0
```

*for properties related to position/size see [grid system](/docs/grid-system).*

## Core widgets

Mozaïk comes with core widgets (prefixed with `mozaik.`) which do not require any further
installation to be used, for now you have the `inspector` widget which monitors installed
extensions and usage, in order to use it you should add the following entry:

``` yaml
# ~/mozaik-demo/config.yml
dashboards:
  - columns: 3
    rows:    2
    widgets:
      - type:    mozaik.inspector
        columns: 1
        rows:    1
        x:       0
        y:       0
```

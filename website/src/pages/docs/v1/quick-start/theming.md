---
title: Theming
description: Configure Mozaïk theme
path: /docs/v1/theming
position: 330
---
## Configuration

You can set the theme you want with the `theme` key in the config file:

``` javascript
{
  //…
  theme: 'yellow',
  //…
}
```
### Available themes

Mozaïk comes with 6 themes:

- bordeau
- light-grey
- light-yellow
- night-blue
- snow
- yellow

Take a look at the theme gallery

## Creating a custom theme

Mozaïk eases the creation of a custom theme by providing a bunch of customizable variables.
To create your theme you'll have to follow this directory layout:

```
your-mozaik-app/ # root Mozaïk app directory, if you used the demo repository, should be 'mozaik-demo'
  build/
  src/
  themes/         # custom themes directory
    my-theme/     # your theme, name must match config key
      _vars.styl  # theme variables
      index.styl  # theme overrides
```

So, you have to create `themes` and `my-theme` directories and `_vars.styl`, `index.styl` files.
Your theme can now be used by setting `theme` config key to **my-theme**.

The theme compilation run in two phases:

1. loads Mozaïk core styles using the stylus variables defined in `_vars.styl`
2. loads overrides defined in `index.styl`

You should take a look at [an existing theme](https://github.com/plouc/mozaik/tree/master/src/themes/night-blue) to see how it's built.

### _vars.styl

As seen previously, this file contains variables availables in core Mozaïk styles, for an exhaustive list of them, see [this file](https://github.com/plouc/mozaik/blob/master/src/styl/__vars.styl).
You don't have to set all variables, if one is not set, default value defined in [this file](https://github.com/plouc/mozaik/blob/master/src/styl/__vars.styl) will be used.

### index.styl

This file contains overrides, it differs from `_vars.styl` because it's completely independent from Mozaïk core styles.
If you want to customize a certain widget or if you don't find a variable which fit your needs, you should put your rules there.

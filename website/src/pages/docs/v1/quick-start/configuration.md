---
title: Configuration
description: Configure Mozaïk
path: /docs/v1/configuration
position: 310
---
**config.js** is the main **Mozaïk** config, it's where you configure your dashboards.
It must be located at the root of your main **Mozaïk** project directory.

Let see how to define it:

``` javascript
// ~/mozaik-demo/config.js

// because we use plain js file, the config object must be exported
module.exports = {
    host: 'localhost', // Mozaïk host
    port: 5000,        // Mozaïk port

    theme: 'night-blue', // Mozaïk theme to use

    rotationDuration: 8000, // Mozaïk dashboard rotation interval (ms)

    // Dashboards definition
    dashboards: [
        // first dashboard
        {
            // defines dashboard grid: 4 x 3
            columns: 4, rows: 3,
        },

        // a second dashboard
        {
            // add title
            title: 'My second Mozaïk dashboard',
            // defines dashboard grid: 5 x 4
            columns: 5, rows: 4,
        }
    ]
};
```

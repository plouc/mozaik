---
title: Configuration
description: Configure Mozaïk V2
path: /docs/configuration
position: 110
---
**config.yml** is the main **Mozaïk** config, it's where you configure your dashboards.
It should be located at the root of your main **Mozaïk** project directory.

Let see how to define it:

``` yaml
# ~/mozaik-demo/config.yml

host: localhost # Mozaïk host
port: 5000      # Mozaïk port

# Mozaïk dashboard rotation interval (ms)
rotationDuration: 8000 

dashboards:
    # first dashboard
    - columns: 4
      rows:    3
      widgets: []
    
    # second dashboard
    - columns: 3
      rows:    3
      widgets: []
```

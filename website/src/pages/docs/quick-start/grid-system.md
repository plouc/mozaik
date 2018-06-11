---
title: Grid system
description: Configure Mozaïk V2 grid system
path: /docs/grid-system
position: 120
---
As we saw previously in the [config.yml](/docs/configuration) section,
**Mozaïk** provides a simple way to define dashboard layout.
Let's see how it works.


To configure a layout like this:

``` raw
                         columns: 3
 +——————————————————+——————————————————+——————————————————+
 |                  |                                     |
 | A -> x: 0  y: 0  |        B -> x: 1  y: 0              |
 |      columns: 1  |             columns: 2              |
 |      rows:    1  |             rows:    1              |
 |                  |                                     |
 +——————————————————+——————————————————+——————————————————+  rows: 2
 |                                     |                  |
 |        C -> x: 0  y: 1              | D -> x: 2  y: 1  |
 |             columns: 2              |      columns: 1  |
 |             rows:    1              |      rows:    1  |
 |                                     |                  |
 +——————————————————+——————————————————+——————————————————+

```

You should have the following config:

``` yaml
# ~/mozaik-demo/config.yml
dashboards:
  - columns: 3
    rows:    2
    widgets:
    
      # widget A
      - type:    whatever
        columns: 1
        rows:    1
        x:       0
        y:       0
        
      # widget B
      - type:    whatever
        columns: 2
        rows:    1
        x:       1
        y:       0 

      # widget C
      - type:    whatever
        columns: 2
        rows:    1
        x:       0
        y:       1
         
      # widget D
      - type:    whatever
        columns: 1
        rows:    1
        x:       2
        y:       1          
```

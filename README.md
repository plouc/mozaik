# MOZAÏK

Mozaïk is a tool based on nodejs / reactjs to easily build beautiful dashboards.




## Installation

### Install dependencies

```
npm install
```

### Configure your dashboards

```
cp config.sample.js config.js
vim config.js
```

### Publish assets and start the app

```
gulp publish
node mozaik.js
```





## Configuration

Mozaïk can be configured through a simple js config file `config.js` located at the root folder.
You have a sample config file `config.sample.js` which you can start from.

```javascript
module.exports = {
  dashboards: [
    {
      columns: 3,
      rows:    2
    }
  ]
};
```

### Grid system

Mozaïk provide a simple way to define dashboard layout


To configure a layout like this:

```
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

```javascript
  dashboards: [
    {
      columns: 3,
      rows:    2,
      widgets: [
          {   // A
              type: 'whatever',
              columns: 1, rows: 1,
              x: 0, y: 0
          },
          {   // B
              type: 'whatever',
              columns: 2, rows: 1,
              x: 1, y: 0
          },
          {  // C
              type: 'whatever',
              columns: 2, rows: 1,
              x: 0, y: 1
          },
          {   // D
              type: 'whatever',
              columns: 1, rows: 1,
              x: 2, y: 1
          }
      ]
    }
  ]
```





## Widgets

### Jenkins

#### Jenkins — job builds histogram

> Show jenkins job builds histogram.

![jenkins job builds histogram screenshot](https://raw.githubusercontent.com/wiki/plouc/mozaik/assets/jenkins.job_builds_histogram.png)

##### parameters

key   | description
------|--------------------------
`job` | *jenkins job identifier*

##### usage

```javascript
{
  type: 'jenkins.job_build_histogram', job: 'my-job',
  columns: 1, rows: 1, x: 0, y: 0
}
```



### Github

#### Github — User badge

> Show github user badge.

##### parameters

key     | description
--------|--------------------------
`plouc` | *github user identifier*

##### usage

```javascript
{
  type: 'github.user_badge', user: 'plouc',
  columns: 1, rows: 1, x: 0, y: 0
}
```



### Travis



### AWS



### Sensu

#### Sensu — Events

> Display sensu current events.

##### parameters

*This widget has no parameter*

##### usage

```javascript
{
  type: 'sensu.events',
  columns: 1, rows: 1, x: 0, y: 0
}
```



Visit the [Wiki](https://github.com/plouc/mozaik/wiki)
# MOZAÏK

[![Travis CI][travis-image]][travis-url]
[![Quality][codeclimate-image]][codeclimate-url]
[![Dependencies][gemnasium-image]][gemnasium-url]

Mozaïk is a tool based on nodejs / reactjs to easily build beautiful dashboards.



## Installation

### Install dependencies

```
npm install
```

### Publish assets and start the app

```
gulp publish
node mozaik.js
```





## Configuration

Mozaïk can be configured through a simple js config file `config.js` located at the root folder.
You should start from the default config file `config.sample.js` and customize it to fit your needs.

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




## Testing

React components are tested through **jest**, in order to run the test suite:

```
npm test
```






## Widgets

### Jenkins

#### Jenkins — client


##### parameters

key             | description
----------------|-------------------------
`baseUrl`       | *jenkins base url*
`auth.user`     | *jenkins auth user*
`auth.password` | *jenkins auth password*

##### usage

```javascript
{
  //…
  api: {
    jenkins: {
      baseUrl: 'https://my-jenkins.ci',
      auth: {
        user:     'user',
        password: 'password'
      }
    }
  }
}
```

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





# Extend

You can easily add your own widgets to mozaïk.

## Anatomy of an extension

```
  |
  +——+ src/
     |
     +——+ ext/
        |
        +——+ my-extension/ # your extension root directory
           |
           +——+ components/ # React components
           |  |
           |  +——— MyComponent.jsx
           |  +——— register.js
           |
           +——+ __tests__/ # React components tests (jest)
           |  |
           |  +——— MyComponent-test.js
           |
           +——+ scss/ # custom styles (sass)
           |  |
           |  +——— _my-component.scss
           |  +——— index.scss
           |
           +——— client.js # server side javascript (used to fetch data)
```

Note that you do not have to manually import your extension to make it available:

* the `collect:js` gulp task imports the components defined in `my-extension/components/register.js`
  in `src/collectedComponents`.
* the `collect:sass` gulp task will take care of your custom styles, all you have to do is provide an `index.scss`
  which wil be automatically imported in `src/collected.scss`.




Visit the [Wiki](https://github.com/plouc/mozaik/wiki)




[travis-image]: https://img.shields.io/travis/plouc/mozaik.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik
[codeclimate-image]: https://img.shields.io/codeclimate/github/plouc/mozaik.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/plouc/mozaik
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik

---
title: Extension client
description: How to craft connected widgets
path: /docs/v1/guides/client
position: 410
---

## When to use it

When developing a Mozaïk extension, you'll probably have to fetch data from external services, for example retrieve entities through an API, querying a database…

For now there is only one extension which doesn't require a client, [`mozaik-ext-time`](https://github.com/plouc/mozaik-ext-time).

So to communicate with thoses external services, Mozaïk provides a simple way to feed your components, using a [**Bus**](https://github.com/plouc/mozaik/blob/master/src/Bus.js) on the server side, and a [**mixin**](https://github.com/plouc/mozaik/blob/master/src/browser/mixins/ApiConsumerMixin.js) on the frontend to easily notify your widgets when some fresh data is fetched from the server.

## The big picture

*Crafting schema…*

## How to use it

When you create an extension, you provide a set of widgets (React components). Those widgets can use the [**ApiConsumerMixin**](https://github.com/plouc/mozaik/blob/master/src/browser/mixins/ApiConsumerMixin.js) to tell Mozaïk they need data from a client.

### Creating a connected component

We'll create an imaginary component named `ClientConsumer` for an imaginary extension named `mozaik-ext-sample`.

```javascript
// mozaik-ext-sample/src/components/ClientConsumer.jsx
import React, { Component } from 'react';
import reactMixin           from 'react-mixin';    // to be able to use Mixins on es6 classes
import { ListenerMixin }    from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import Mozaik               from 'mozaik/browser'; // Mozaïk browser utilities


class ClientConsumer extends Component {
    // we extend the constructor to set a default state 
    constructor(props) {
        super(props);
        
        this.state = { count: 0 };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        return { id: 'sample.sampleMethod' };
    }
    
    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(data) {
        console.log(data);
        this.setState({ count: data.count });
    }

    render() {
        const { count } = this.state;
    
        return (
            <div>{count}</div>
        );
    }
}

// apply the mixins on the component
reactMixin(ClientConsumer.prototype, ListenerMixin);
reactMixin(ClientConsumer.prototype, Mozaik.Mixin.ApiConsumer);

export default ClientConsumer;
```

Simple rules to define request id:

- use the name of your extension for the first part, so here we used `sample` because our extension is `mozaik-ext-sample`
- use the name of the client's method you want to call for the second part, here we're interested in data produced by `sampleMethod`

### Creating a client

Now we have our connected widget ready to receive data from our extension's client, so let's create it.

A client must be a single exported function which returns an **object whose keys correspond to all available operations**.
All operations **must return a Promise**, for this simple example, it's not really useful, but most of the time, you'll be performing asynchronous operations.

```javascript
// mozaik-ext-sample/src/client.js
import Promise from 'bluebird'; // use bluebird for simplicity, you should also use a Promise polyfill

// When Mozaïk instanciate a client, it pass the mozaik instance to it,
// it's usefull to use the builtin Mozaïk logger for example.
// This function MUST return an object whose keys correspond to all available operations.
const client = mozaik => {
    const count = 0;

    return {
        // Remember the request id `sample.sampleMethod`.
        // This function MUST return a promise.
        sampleMethod() {
            // each time this method is invoked, we increment the count by 1
            count += 1;
            
            return Promise.resolve({ count }); 
        }
    };
};

export default client;
```
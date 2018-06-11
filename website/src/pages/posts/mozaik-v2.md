---
title: Mozaïk v2
date: 2016-12-12
---
I'm currently working on Mozaïk v2, at the time of writing, it's in alpha stage.
This release will contains a lot of breaking changes, but let's see why and how
it will differ from Mozaïk v1.

## Improving DX

When working with Mozaïk v1, some people legitimately complained about the constrain
of having to restart the server each time they wanted to change the config file: widgets,
theme… Mozaïk v2 now supports hot reloading and watcher on config file.

You'll find the corresponding issue [here](https://github.com/plouc/mozaik/issues/97).

## Ease extension authoring

Developing Mozaïk extensions was really painful, no guide, tricky workflow, thanks to
hot reloading and migration to [redux](http://redux.js.org/), it's now easier to develop
a custom extension and debug it.

I'm also planing to add an in depth guide on how to craft a Mozaïk extension for v2,
so stay tuned!

The usage of React components mixin has been completely removed, which makes easier
to code your component following the current React.js best practices and ease
extensions testing.

## Modules upgrade/replacement

[reflux](https://github.com/reflux/refluxjs) is a great library,
but [redux](http://redux.js.org/) has became the de facto state management
library for React, and its ecosystem is really complete.

`react` and `react-dom` have also been upgraded, which means you should be
able to use recent libraries and third party components.

Some people had problem with [ws](https://github.com/websockets/ws) module,
while it offers great performance and did the job, Mozaïk v2 uses
[socket.io](http://socket.io/) which is widely adopted and has already been
used for many projects, it also provide higher abstractions, meaning less
code to maintain and a more robust implementation.

## Contributing

If you're interested in contributing to Mozaïk v2, check the dedicated
[milestone](https://github.com/plouc/mozaik/milestone/2) and don't hesitate
to contact me.

If you're an extension maintainer, you should have a look at the
[migrated extensions](https://github.com/plouc/mozaik/issues/98)
to understand how to make it works with Mozaïk v2.


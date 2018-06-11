---
title: Extension client [push mode]
description: How to feed your hungry widgets in near real time
path: /docs/v1/guides/client-push-mode
position: 430
---
If you didn't read the [intro](/docs/v1/guides/client/) on Mozaïk extension client,
then you should consider [reading it first](/docs/v1/guides/client/).

When you register your extension's client to Mozaïk, you have the ability to pass a **mode**
which determine how the data will be pulled from your external service to Mozaïk.

`push` must be specified when you register a client to Mozaïk.

## When using `push` mode

It's useful when you communicate with an external service through websockets or if you want
to connect Mozaïk to some sort of message queue.

The main difference with `poll` mode is that Mozaïk is no more responsible for fetching the data
at a given interval, your client acts as a producer and notify Mozaïk when it wants to push
some fresh data to its bound widgets.

## How to use it

{{< gist 5fc5d80aa74e4a6c3196a265602c509c >}}
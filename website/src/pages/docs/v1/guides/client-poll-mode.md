---
title: Extension client [poll mode]
description: How to feed your hungry widgets by regularly fetching some external API data
path: /docs/v1/guides/client-poll-mode
position: 420
---
If you didn't read the [intro](/docs/v1/guides/client/) on Mozaïk extension clients,
then you should consider [reading it first](/docs/v1/guides/client/).

When you register your extension's client to Mozaïk, you have the ability to pass a **mode**
which determine how the data will be pulled from your external service to Mozaïk.

`poll` mode is the default mode set when you register a client to Mozaïk.

## When using `poll` mode

It's useful when you want your client to fetch data from an external service at a given interval.

See [this page](/docs/v1/guides/client/) for usage.

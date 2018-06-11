---
title: Mozaïk 1.3.0 Released
date: 2016-04-09
---
Mozaïk **1.3.0** was released, shipping a **critical feature**:
support for `push` mode, it solves [an issue](https://github.com/plouc/mozaik/issues/34)
which have been there for far too long.

Before, Mozaïk just provided a polling model, which worked nicely for most of the cases.

However, some users wanted to push data from **live streams**, for example another WebSocket
or a Message queue, but prior to this version, you can not decide when to send data to Mozaïk,
you can only provide some endpoints to be called at a given interval.

So, now you have the ability to **decide when to push data**,
more details on this [here]({{< relref "v1/hack/client-push-mode.md" >}}).

As usual, **release notes** are available on [GitHub](https://github.com/plouc/mozaik/releases/tag/v1.3.0).

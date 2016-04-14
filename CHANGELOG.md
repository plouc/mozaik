# Mozaïk Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]


## v1.4.4 (2016-04-14)

* **Internal**
 * `build`: [#79](https://github.com/plouc/mozaik/pull/79) Reduce Mozaïk js build size.


## v1.4.3 (2016-04-13)

* **Polish**
 * `packages`: [c1f00c5](https://github.com/plouc/mozaik/commit/c1f00c52f7a86a51edc9f3d08f0188ffe35a8621) Upgrade outdated packages.


## v1.4.2 (2016-04-13)

* **New Feature**
 * `themes`: [4de8fa5](https://github.com/plouc/mozaik/commit/4de8fa542b68d8ea0ff415e766a46d45e470f237) Add new **harlequin** theme.

* **Polish**
 * `charts`: [7a73927](https://github.com/plouc/mozaik/commit/7a7392705b462893a9d97c528d0f93af01c13d0f) Improve pie and gauge components.


## v1.4.1 (2016-04-12)

* **Bug Fix**
 * `ws`: [5c3f0be](https://github.com/plouc/mozaik/commit/5c3f0becb607ad782193a509d8802ca2473ea965) fix typo in ConnectionStatusStore.


## v1.4.0 (2016-04-12)

* **New Feature**
 * `ws`: [#77](https://github.com/plouc/mozaik/pull/77) Add ability to automatically reconnect websockets.
 * `notifications`: [5a0bea9](https://github.com/plouc/mozaik/commit/5a0bea974be433701af8365d2fb5e66aaef94457) Add notifications support.

* **Polish**
 * `styles`: [6d577dc](https://github.com/plouc/mozaik/commit/6d577dc771915a19fe6b8a326f7059e8e33b091b) Change the way stylus var are defined in order to have more concise themes.


## v1.3.0 (2016-04-07)

* **New Feature**
 * `Bus`: [#76](https://github.com/plouc/mozaik/pull/76) Add ability to define 'push' apis.

* **Bug Fix**
 * `gulp`: [39a2667](https://github.com/plouc/mozaik/commit/39a2667cf53ae448eaf859364a984a263e7d9c13) Fix inspector component uptime formatting


## v1.2.1 (2016-04-06)

* **New Feature**
 * `Bus`: [#75](https://github.com/plouc/mozaik/pull/75) Add ability to define custom apis poll interval.


## v1.2.0 (2016-04-06)

* **New Feature**
 * `mozaik.inspector`: [#74](https://github.com/plouc/mozaik/pull/74) Add Mozaïk Inspector widget.
 * `Bus`: [#74](https://github.com/plouc/mozaik/pull/74) Add `clientCount()` method on Bus to return connected clients count.
 
* **Bug Fix**
 * `gulp`: [d5dc3ed](https://github.com/plouc/mozaik/commit/d5dc3edcff30d897ab9506646bf11daa9340bf73) Fix styles watcher.

* **Internal**
 * `Bus`: [ba4a24a](https://github.com/plouc/mozaik/commit/ba4a24ad94213bcdb89c3f7d3086a5b4900a6659) Move Mozaïk `Bus` to simple function.
 * `npm`: [f64592a](https://github.com/plouc/mozaik/commit/f64592ae6d89c26f9c4a83eacfcf37f71b59921c) Enforce `npm@3` usage.


## v1.1.0 (2016-04-04)

* **Internal**
 * `packages`: [#71](https://github.com/plouc/mozaik-ext-travis/pull/71) Update babel and other packages.


## v1.0.13 (2016-04-02)

* **New Feature**
 * `Dashboard`: [#70](https://github.com/plouc/mozaik/pull/70) Add optional title to dashboard.
 
* **Bug Fix**
 * `build`: [#69](https://github.com/plouc/mozaik/pull/69) Update watchify to prevent segment fault errors.
 * `websockets`: [#68](https://github.com/plouc/mozaik/pull/68) Fixing unexpected end of input console error.


## v1.0.12 (2016-03-23)

* **Bug Fix**
 * `styles`: [#65](https://github.com/plouc/mozaik/pull/65) Added `overflow: hidden` to avoid V & H scrollbars.


## v1.0.11 (2016-03-18)

* **Bug Fix**
 * `build`: [e0e8a7e](https://github.com/plouc/mozaik/commit/e0e8a7e7adf3824c4fff9783153803947568945e) Fix copy issue when using npm@3.


## v1.0.10 (2016-01-14)

* **Bug Fix**
 * `server`: [#51](https://github.com/plouc/mozaik/pull/51) Use server configuration port.
 * `server`: [#54](https://github.com/plouc/mozaik/pull/54) Use server configuration host.

* **Polish**
 * `server`: [#55](https://github.com/plouc/mozaik/pull/55) improve es6 usage for Mozaïk backend.

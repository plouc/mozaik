MOZAÏK
======

[Wiki](plouc/mozaik/wiki)

Installation
------------

**Install dependencies**

```
npm install
```

**Configure your dashboards**

```
cp config.sample.js config.js
vim config.js
```

**Publish assets and start the app**

```
gulp publish
node mozaik.js
```

Available widgets
-----------------

**Jenkins**

`jenkins.jobs`

`jenkins.job_builds`

`jenkins.job_build_durations`

**Github**

`github.pull_requests`

**AWS**

`aws.instances`

`aws.stacks`

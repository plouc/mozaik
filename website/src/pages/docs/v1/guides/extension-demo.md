---
title: Automated extension demo
description: How to automatically publish a demo of your Mozaïk extension (for free)
path: /docs/v1/guides/extension-demo
position: 440
---
The best way to promote your brand new Mozaïk extension is to provide a
[demo](http://mozaik.herokuapp.com/) for it.

But because we're talking about open source stuff, you probably don't want to spend
money for a dedicated hosting, we'll see how you can use a free [heroku](https://www.heroku.com/)
hosting to showcase your extension.

Also manual deployment is painful and hard to maintain, the goal is to automate
everything so that you don't have to worry about which version is deployed,
your demo will always be up to date.

## Requirements

- [An heroku account](https://signup.heroku.com/)
- A Mozaïk extension hosted on [GitHub](https://github.com/)
- git/Node.js/wget/unzip

## Steps

### Create a dedicated branch

First, you'll have to create a new orphan branch on your repository:

``` bash
git checkout --orphan demo
git rm --cached -r .
```

Next, remove all unwanted files, **make sure you don't delete the `.git` directory**.

### Fetch the template

Now, you'll have to get the [Mozaïk extension demo template](https://github.com/plouc/mozaik-ext-demo-template):

``` bash
wget https://github.com/plouc/mozaik-ext-demo-template/archive/master.zip
unzip master.zip
mv {mozaik-ext-demo-template-master/*,mozaik-ext-demo-template-master/.*} .
rm -r mozaik-ext-demo-template-master master.zip
```

### Define proper settings

You need to adjust several files:

- **package.json**: replace `EXT_NAME`, `FULL_NAME`, `GITHUB_USER` and set the correct version of your package
- **README.md**: replace `EXT_NAME`
- **src/App.jsx**: replace `EXT_NAME`

If your extension involves a client, tweak **src/server.js** by uncommenting the following lines and replacing `EXT_NAME`:

``` javascript
import EXT_NAME  from 'mozaik-ext-EXT_NAME/client'

mozaik.bus.registerApi('EXT_NAME', EXT_NAME)
```

Finally, edit dashboard configuration: **config.js**.

### Test & push

```
npm install
npm start
```

Now open http://localhost:5000/ and check your dashboard works as expected.

If everything is OK, commit and push the demo branch:

``` bash
git add . && git commit -m "feat(demo): init demo"
git push --set-upstream origin demo
```

### Heroku setup

Login to your heroku account.

#### Create a new app

Click on the **Create new app** button located in the top right drop down.

![new heroku app](/images/extension-demo/heroku-create-app.png)

Set your app name, should be something like **mozaik-EXT_NAME** and
click on **Create App** to validate.

![heroku app form](/images/extension-demo/heroku-create-app-form.png)

Connect your app to your GitHub repository,
click on the **GitHub** button inside the **Deployment method** section.

![heroku deployment method](/images/extension-demo/heroku-deploy-method.png)

Search for your repository and click the **connect** button.

![heroku connect github](/images/extension-demo/heroku-connect-github.png)

Enable auto deployment, choose the **demo** branch and click **Enable Automatic Deploys**
inside the **Automatic Deploys** section. This will trigger a deploy each time
you push to the **demo** branch.

![heroku auto deployment](/images/extension-demo/heroku-auto-deploy.png)

Add config vars, click on the **Settings** tab and click **Reveal Config Vars**,
then add **USE_SSL** var with value **true**. This is required to tell Mozaïk to use
https and wss.

![heroku vars](/images/extension-demo/heroku-vars.png)

It's also a good opportunity to add required credentials if your extension
relies on a http client requiring some (don't put it in the repo!),
those vars will then be available as regular environment variables.

Deploy your app by clicking on the **Deploy** tab, choosing the **demo** branch
and clicking **Deploy Branch** inside the **Manual Deploy** section.

![heroku deploy](/images/extension-demo/heroku-deploy.png)

Your app should be deployed in a few minutes and then availabe at https://mozaik-EXT_NAME.herokuapp.com/.
To update the demo for newer releases, you'll just have to edit the extension version in the
**package.json** file from the **demo** branch, it will automatically re-deploy it.

### Enjoy and share :)

You can now add the demo as your repository website on GitHub.

![GitHub extension website](/images/extension-demo/github-extension-website.png)

If you want to have a link to the demo on the Mozaïk website extensions page,
feel free to fork the [website repo](https://github.com/plouc/mozaik-website/)
and edit **config.yaml** or just [create an issue](https://github.com/plouc/mozaik-website/issues/new),
I'll take care of it.


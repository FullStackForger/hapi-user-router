# Hapi User Router

This hapi plugin is an attempt to expose user singing and authentication routes.

> Note: This is work in progress!

## Routes
* [+] `login/twitter`
* [+] `login/facebook`
* [-] `login/github`
* [-] `login/email`
* [-] `logout`
* [-] `register`

## Configuration

### Configuring Twitter
Before we can actually start to code we have to create a Twitter application that will be granted by the user.    
To do this go to apps.twitter.com, sign in and click on `Create New App` and fill the form.    
Make sure to set a "Callback URL" and check the "Allow this application
to be used to Sign in with Twitter" on the "Settings" tab in your Twitter application

### Configuring Facebook
You'll need to go to `https://developers.facebook.com/` and set up a Website application to get started
Once you create your app, fill out `Settings` and set the `App Domains` under `Settings >> Advanced`,
set the Valid OAuth redirect URIs to include `http://<yourdomain.com>` and enable Client OAuth Login


### Example config
Configuration should override one exported by `default.js`.

```js
{
  "auth": {
    "session": {
      "isSecure": false,
      "password": "cookie_pass_for_iron_encrypt"
    },
    "twitter": {
      "active": true,
      "clientId": "app_client_id",
      "clientSecret": "app_client_secret"
    },
    "facebook": {
      "active": true,
      "clientId": "app_client_id",
      "clientSecret": "app_client_secret"
    },
    "status": {
      "active": true
    }
  }
}
```

### `server.app.config`

**Important:** Plugin will look for configuration at `server.app.config` so remember to pass expose configuration file under `server.app.config` before you register the plugin.

**Note:** It will change when I find better way of passing configuration into registered plugin with both (1) regular `server.register` method and (2) registration with `glue` manifest configs

### Custom handlers

You can overwrite default successful authentication `handler` by
```
auth.twitter.handler = function(request, reply) {
  // setup cookies, store credentials, etc.
  return reply.redirect('/');
}
```

## Provided examples

Before your run any of provided examples, there are few steps you have to make:

1. Register twitter application - one registered application is enough to run all of the examples
2. Update config.json with authentication credentials - as in previous point, one is enough for all examples
3. Run `npm install` - run it from the main directory
4. Run demo with: `node <example>.js` - you should run in from the `example` folder

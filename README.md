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
Plugin will look for configuration at `server.app.config`.

You can pass handler method by overriding default authentication `handler`:
```
auth.twitter.handler = function(request, reply) {
  return reply.redirect('/');
}
```

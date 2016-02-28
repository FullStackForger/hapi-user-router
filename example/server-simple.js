'use strict'
/* --------------------------------
Before your run this example
1. Register twitter application
2. Update config.json with authentication credentials
3. Run `npm install`
4. Run demo with: `node server-simple.js`
---------------------------------- */
const
	Hapi = require('hapi'),
	Boom = require('boom'),
	Hoek = require('hoek'),
	config = require('./config.json'),
	server = new Hapi.Server()

// plugins registration complete handler
function onRegister(err) {
  Hoek.assert(!err, err)

  // auto redirect to twitter login route from main one
	server.route({
		method: 'GET',
		path: '/',
		config: {
			handler: function (request, reply) {
        reply.redirect('login/twitter')
      }
		}
	})

	// Start the server
	server.start((err) => {
		if (err) throw err
		console.log('Server running at:', server.info.uri)
	})
}

// setup connections
server.connection({
	port: config.port || process.env.PORT || 3000,
	host: config.host || process.env.HOST || 'localhost'
})

// register required plugins
server.register(require('bell'), function (err) {
  Hoek.assert(!err, err)

  // important!
  // make configuration available to plugin
  server.app.config = config

  server.register(require('../lib/login-plugin'), onRegister)
})

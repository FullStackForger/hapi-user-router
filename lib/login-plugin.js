'use strict'
const
	Hoek = require('hoek'),
	Boom = require('boom'),
	routes = {},
	providers = ['status', 'email', 'twitter', 'facebook'],
	defaults = require('./defaults.js')

routes.login = {}

routes.login.status = {
	method: 'GET',
	path: '/login/status',
	config: {
		auth: false,
		handler: function (request, reply) {
			reply({status: 'ok'})
		}
	}
}

routes.login.twitter = {
	method: 'GET',
	path: '/login/twitter',
	config: {
		auth: 'twitter',
		handler: function (request, reply) {
			if (!request.auth.isAuthenticated) {
				return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message))
			}
			request.server.app.config.auth.twitter.handler(request, reply)
		}
	}
}

routes.login.facebook = {
	method: 'GET',
	path: '/login/facebook',
	config: {
		auth: 'facebook',
		handler: function (request, reply) {
			if (!request.auth.isAuthenticated) {
				return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message))
			}
			request.server.app.config.auth.facebook.handler(request, reply)
		}
	}
}

exports.register = function (server, options, next) {
	let config = Hoek.applyToDefaults(defaults, server.app.config, false)

	// make options runtime available for the plugin
	server.app.config = config

	// Setup twitter authentication strategy
	server.auth.strategy('twitter', 'bell', {
		provider: 'twitter',
		password: config.auth.session.password,
		isSecure: config.auth.session.isSecure,
		clientId: config.auth.twitter.clientId,
		clientSecret: config.auth.twitter.clientSecret
	})

	// setup facebook authentication strategy
	server.auth.strategy('facebook', 'bell', {
		provider: 'facebook',
		password: config.auth.session.password,
		isSecure: config.auth.session.isSecure,
		clientId: config.auth.facebook.clientId,
		clientSecret: config.auth.facebook.clientSecret,
		location: server.info.uri
	});

	// activate all active provider routes
	providers.forEach((provider) => {
		if (config.auth[provider] && config.auth[provider].active) {
			server.route(routes.login[provider])
		}
	})
	next()
}

exports.register.attributes = {
 	pkg: require('./../package.json')
}

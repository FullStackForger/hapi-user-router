'use strict';
const
// Load modules
	Code = require('code'),
	Hapi = require('hapi'),
	Hoek = require('hoek'),
	Lab = require('lab'),
// Declare internals
	internals = {},
// Test shortcuts
	lab = exports.lab = Lab.script(),
	describe = lab.describe,
	it = lab.it,
	expect = Code.expect

internals.config = { auth: { status: { active: true } } }

describe('plugin', () => {

	it('should register correctly', (done) => {
		const server = new Hapi.Server()
		server.app.config = internals.config
		server.connection({ host: 'localhost', port: '3000' })

		// register dependency plugin
		server.register(require('bell'), (err) => {
			expect(err).to.not.exist()

			// register plugin
			server.register(require('../lib/login-plugin.js'), (err) => {
				expect(err).to.not.exist()

				server.inject('/login/status', (res) => {
					expect(res.statusCode).to.equal(200)
					expect(res.result).to.contain({status: "ok"})
					done()
				})
			})
		})
	})

	it('should register correctly with route prefix', (done) => {
		const server = new Hapi.Server()
		server.app.config = internals.config
		server.connection({ host: 'localhost', port: '3000' })

		// register dependency plugin
		server.register(require('bell'), (err) => {
			expect(err).to.not.exist()
			let opts = { routes: { prefix: '/test' } }
			// register plugin
			server.register(require('../lib/login-plugin.js'), opts, (err) => {
				expect(err).to.not.exist()

				server.inject('/test/login/status', (res) => {
					expect(res.statusCode).to.equal(200)
					expect(res.result).to.contain({status: "ok"})
					done()
				})
			})
		})
	})

})

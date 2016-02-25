'use strict'
const defaultHandler = function (request, reply) {
	return reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>')
}

module.exports = {
	"auth": {
		"session": {
			"isSecure": false,
			"password": "cookie_pass_for_iron_encrypt"
		},
		"twitter": {
			"active": false,
			"handler": defaultHandler,
			"clientId": "app_client_id",
			"clientSecret": "app_client_secret"
		},
		"facebook": {
			"active": false,
			"handler": defaultHandler,
			"clientId": "app_client_id",
			"clientSecret": "app_client_secret"
		},
		"status": {
			"active": false
		},
		"email": { "active": false }
	}
}
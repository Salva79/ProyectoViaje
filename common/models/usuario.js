'use strict';

var config = require('../../server/config.local.js');
var path = require('path');

module.exports = function(Usuario) {

	Usuario.request_password_reset = function(email, cb) {
		Usuario.resetPassword({
			email: email
		}, function(err) {
			if (err) {
				var err = new Error('No existe el email');
				err.statusCode = 401;
				return cb(err);
			}

			return cb(null, 'Password reset requested. Check your email for further instructions')
		});
	};

	Usuario.reset_password_get = function(accessToken, res, cb) {
		if (!accessToken) {
			var err = new Error('No existe el usuario');
			err.statusCode = 404;
			return cb(err);
		}
	    return res.render('password-reset', {
	      accessToken: accessToken.id
    	});

	};

	Usuario.reset_password_post = function(passwords, accessToken, cb) {
		if (!accessToken) {
			var err = new Error('No existe el usuario');
			err.statusCode = 404;
			return cb(err);
		}

		//verify passwords match
		if (!passwords.password ||
			!passwords.confirmation ||
			passwords.password !== passwords.confirmation) {
			var err = new Error('Contraseñas incorrrectas');
			err.statusCode = 400;
			return cb(err);
		}

		Usuario.findById(accessToken.userId, function(err, user) {
			if (err) {
				var err = new Error('No existe el usuario');
				err.statusCode = 404;
				return cb(err);
			}
			user.updateAttribute('password', passwords.password, function(err, user) {
				if (err) {
					var err = new Error('Error al actualizar al usuario');
					err.statusCode = 404;
					return cb(err);
				}
				console.log('> password reset processed successfully');
				return cb(null, 'contraseña modificada correctamente')
			});
		});
	};

	//send verification email after registration
	Usuario.afterRemote('create', function(context, usuario, next) {
		console.log('> user.afterRemote triggered');

		var options = {
			type: 'email',
			to: usuario.email,
			from: config.emailDs.transports[0].auth.user,
			subject: 'Thanks for registering.',
			template: path.resolve(__dirname, '../../server/views/verify.ejs'),
			redirect: '/verified',
			user: usuario
		};

		usuario.verify(options, function(err, response) {
			if (err) {
				Usuario.deleteById(usuario.id);
				return next(err);
			}

			console.log('> verification email sent:', response);

			context.res.render('response', {
				title: 'Signed up successfully',
				content: 'Please check your email and click on the verification link ' +
					'before logging in.',
				redirectTo: '/',
				redirectToLinkText: 'Log in'
			});
		});
	});

	//send password reset link when requested
	Usuario.on('resetPasswordRequest', function(info) {
		var url = 'http://' + config.hostname + ':' + config.port + '/api/Usuarios/reset_password';
		var html = 'Click <a href="' + url + '?access_token=' +
			info.accessToken.id + '">here</a> to reset your password';

		Usuario.app.models.Email.send({
			to: info.email,
			from: info.email,
			subject: 'Password reset',
			html: html
		}, function(err) {
			if (err) return console.log('> error sending password reset email');
			console.log('> sending password reset email to:', info.email);
		});
	});

	Usuario.remoteMethod(
		'request_password_reset', {
			description: 'Solicita el reseteo de la contraseña.',
			accepts: [{
				arg: 'email',
				type: 'string'
			}, ],
			returns: {
				arg: 'msg',
				type: 'string'
			},
			http: {
				path: '/request_password_reset',
				verb: 'post'
			},
		}
	);

	Usuario.remoteMethod(
		'reset_password_get', {
			description: 'Mostrar el formulario para el cambio de contraseña.',
			accepts: [{
				arg: 'access_token',
				type: 'object',
				required: true,
				http: function(ctx) {
					var req = ctx && ctx.req;
					var accessToken = req && req.accessToken;

					return accessToken;
				}
			}, {
				arg: 'res',
				type: 'object',
				required: true,
				http: function(ctx) {
					var res = ctx && ctx.res;
					return res;
				}
			}, ],
			returns: {
				arg: 'tokenId',
				type: 'string'
			},
			http: {
				path: '/reset_password',
				verb: 'get'
			},
		}
	);

	Usuario.remoteMethod(
		'reset_password_post', {
			description: 'Permite generar una nueva contraseña para un usuario.',
			accepts: [{
				arg: 'passwords',
				type: 'object',
				required: true,
				http: {
					source: 'body'
				}
			}, {
				arg: 'access_token',
				type: 'object',
				required: true,
				http: function(ctx) {
					var req = ctx && ctx.req;
					var accessToken = req && req.accessToken;

					return accessToken;
				}
			}, ],
			returns: {
				arg: 'msg',
				type: 'string'
			},
			http: {
				path: '/reset_password',
				verb: 'post'
			},
		}
	);

};

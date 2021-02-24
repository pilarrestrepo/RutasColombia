'use strict';

var _ = require('lodash');

var usuariosRepositorio = require('../repositorios/usuarios.repositorio');

function autenticarUsuario(usuario, callback) {

    usuariosRepositorio.autenticarUsuario(usuario, function (error, resultado) {
        if (error) {
            return callback(error);
        } else if (resultado) {
            return callback(null, resultado);
        }
    });
}

module.exports = {
    autenticarUsuario
}
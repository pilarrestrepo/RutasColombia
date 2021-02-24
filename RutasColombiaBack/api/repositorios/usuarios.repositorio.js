'use strict';

let _ = require('lodash');
let usuarios = require('../modelos/usuarios');

function autenticarUsuario(usuario, callback) {
    usuarios.find({ usuario: usuario.usuario, clave: usuario.usuario, activo: true })
        .then((resultado) => {
            let usuario = null;
            resultado.forEach(element => {
                usuario = element.toCleanObject();
            });
            return callback(null, usuario);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}

module.exports = {
    autenticarUsuario
}

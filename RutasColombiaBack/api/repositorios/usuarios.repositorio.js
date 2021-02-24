'use strict';

let _ = require('lodash');
let usuarios = require('../modelos/usuarios');

function autenticarUsuario(usuario, callback) {
    console.log('autenticarUsuario repository');
    usuarios.find({ usuario: usuario.usuario, clave: usuario.clave, activo: true })
        .then((resultado) => {
            console.log('respuesta', resultado);
            let usuario = {usuario:null};
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

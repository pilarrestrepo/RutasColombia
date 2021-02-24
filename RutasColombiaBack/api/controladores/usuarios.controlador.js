'use strict';

var util = require('util');
var usuariosServicio = require('../servicios/usuarios.servicio');

function autenticarUsuario(req, res) {
  console.log('entro autenticarUsuario');

  console.log(req.body);

  var usuario = {
    usuario: req.body.usuario,
    clave: req.body.clave
  };
  
  usuariosServicio.autenticarUsuario(usuario, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

module.exports = {
  autenticarUsuario
};
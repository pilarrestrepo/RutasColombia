'use strict';

var _ = require('lodash');

var administradoresRepositorio = require('../repositorios/administradores.repositorio');

function listarAdministradores(callback) {
  administradoresRepositorio.listarAdministradores(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function crearAdministrador(administrador, callback) {
  administradoresRepositorio.crearAdministrador(administrador, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarAdministrador(administrador, callback) {
  administradoresRepositorio.editarAdministrador(administrador, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {  
  listarAdministradores,
  crearAdministrador,
  editarAdministrador
}
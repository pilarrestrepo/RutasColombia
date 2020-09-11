'use strict';

var _ = require('lodash');

var personasRepositorio = require('../repositorios/personas.repositorio');

function listarPersonas(callback) {
  personasRepositorio.listarPersonas(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function crearPersona(persona, callback) {
  personasRepositorio.crearPersona(persona, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarPersona(persona, callback) {
  personasRepositorio.editarPersona(persona, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {  
  listarPersonas,
  crearPersona,
  editarPersona
}
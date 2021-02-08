'use strict';

var _ = require('lodash');

var departamentosRepositorio = require('../repositorios/departamentos.repositorio');

function listarDepartamentos(callback) {
    departamentosRepositorio.listarDepartamentos(function (error, resultado) {
      if (error) {
        return callback(error);
      } else if (resultado) {
        return callback(null, resultado);
      }
    });
  }

  module.exports = {
    listarDepartamentos
  } 
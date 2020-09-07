'use strict';

var _ = require('lodash');

var municipiosRepositorio = require('../repositorios/municipios.repositorio');

function listarMunicipios(callback) {
    municipiosRepositorio.listarMunicipios(function (error, resultado) {
      if (error) {
        return callback(error);
      } else if (resultado) {
        return callback(null, resultado);
      }
    });
  }
'use strict';

var _ = require('lodash');

var visitasSitioRepositorio = require('../repositorios/visitasSitio.repositorio');

function listarVisitasSitio(callback) {
  visitasSitioRepositorio.listarVisitasSitio(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}
function obtenerVisitaSitio(idVisitaSitio, callback) {
  visitasSitioRepositorio.obtenerVisitaSitio(idVisitaSitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}
function crearVisitaSitio(visitaSitio, callback) {
  visitasSitioRepositorio.crearVisitaSitio(visitaSitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarVisitaSitio(visitaSitio, callback) {
  visitasSitioRepositorio.editarVisitaSitio(visitaSitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {  
  listarVisitasSitio,
  obtenerVisitaSitio,
  crearVisitaSitio,
  editarVisitaSitio
}
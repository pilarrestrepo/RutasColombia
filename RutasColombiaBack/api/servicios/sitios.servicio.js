'use strict';

var _ = require('lodash');

var sitiosRepositorio = require('../repositorios/sitios.repositorio');

function sitiosCercanos(punto, callback) {
  sitiosRepositorio.sitiosCercanos(punto, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });

}

function sitiosCercanosRuta(punto, callback) {

  sitiosRepositorio.sitiosCercanosRuta(punto, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });

}
function listarSitios(callback) {
  sitiosRepositorio.listarSitios(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}


function obtenerSitio(idSitio, callback) {
  sitiosRepositorio.obtenerSitio(idSitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}
function crearSitio(sitio, callback) {
  sitiosRepositorio.crearSitio(sitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarSitio(sitio, callback) {
  sitiosRepositorio.editarSitio(sitio, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {
  sitiosCercanos,
  sitiosCercanosRuta,
  listarSitios,
  obtenerSitio,
  crearSitio,
  editarSitio
}
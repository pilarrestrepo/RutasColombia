'use strict';

var _ = require('lodash');

var sitiosCategoriasRepositorio = require('../repositorios/sitiosCategorias.repositorio');

function listarSitiosCategorias(callback) {
  sitiosCategoriasRepositorio.listarSitiosCategorias(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function crearSitioCategoria(sitioCategoria, callback) {
  sitiosCategoriasRepositorio.crearSitioCategoria(sitioCategoria, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarSitioCategoria(sitioCategoria, callback) {
  sitiosCategoriasRepositorio.editarSitioCategoria(sitioCategoria, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {  
  listarSitiosCategorias,
  crearSitioCategoria,
  editarSitioCategoria
}
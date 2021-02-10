
'use strict';

var _ = require('lodash');

var sitiosEmpresasRepositorio = require('../repositorios/sitiosEmpresas.repositorio');

function listarSitiosEmpresas(callback) {
  sitiosEmpresasRepositorio.listarSitiosEmpresas(function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function crearSitioEmpresa(sitioEmpresa, callback) {
  sitiosEmpresasRepositorio.crearSitioEmpresa(sitioEmpresa, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

function editarSitioEmpresa(sitioEmpresa, callback) {
  sitiosEmpresasRepositorio.editarSitioEmpresa(sitioEmpresa, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });
}

module.exports = {  
  listarSitiosEmpresas,
  crearSitioEmpresa,
  editarSitioEmpresa
}
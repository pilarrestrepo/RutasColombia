'use strict';

var util = require('util');
var sitiosCategorias = require('../servicios/sitiosCategorias.servicio');

module.exports = {  
  listarSitiosCategorias: listarSitiosCategorias,
  crearSitioCategoria: crearSitioCategoria,
  editarSitioCategoria: editarSitioCategoria
};

function listarSitiosCategorias(req, res) {

  console.log('entro listarSitiosCategorias');

  sitiosCategorias.listarSitiosCategorias(function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
function crearSitioCategoria(req, res) {
  var sitioCategoria = {
    nombre: req.body.nombre,   
    idiomas: {
      es:
      {
        nombre: req.body.es.nombre
      },
      en:
      {
        nombre: req.body.idiomas.en.nombre
      }

    }
  }

  sitiosCategorias.crearSitioCategoria(sitioCategoria, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitioCategoria(req, res) {
  console.log('entro editarSitio ' + req);

  var sitio = {
    id: req.body.id,
    nombre: req.body.nombre,
    idiomas: {
      es:
      {
        nombre: req.body.es.nombre
      },
      en:
      {
        nombre: req.body.idiomas.en.nombre
      }

    }
  }

  sitiosCategorias.editarSitioCategoria(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
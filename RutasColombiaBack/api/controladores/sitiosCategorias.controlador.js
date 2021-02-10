'use strict';

var util = require('util');
var sitiosServicio = require('../servicios/sitiosCategorias.servicio');

module.exports = {  
  listarSitiosCategorias: listarSitiosCategorias,
  crearSitioCategoria: crearSitioCategoria,
  editarSitioCategoria: editarSitioCategoria
};

function listarSitiosCategorias(req, res) {

  console.log('entro listarSitiosCategorias');

  sitiosServicio.listarSitiosCategorias(function (error, resultado) {
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

  sitiosServicio.crearSitioCategoria(sitioCategoria, function (error, resultado) {
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

  sitiosServicio.editarSitio(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
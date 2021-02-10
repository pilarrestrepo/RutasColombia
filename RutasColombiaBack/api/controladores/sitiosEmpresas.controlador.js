'use strict';

var util = require('util');
var sitiosEmpresas = require('../servicios/sitiosEmpresas.servicio');

module.exports = {  
  listarSitiosEmpresas: listarSitiosEmpresas,
  crearSitioEmpresa: crearSitioEmpresa,
  editarSitioEmpresa: editarSitioEmpresa
};

function listarSitiosEmpresas(req, res) {

  console.log('entro listarSitiosEmpresas');

  sitiosEmpresas.listarSitiosEmpresas(function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
function crearSitioEmpresa(req, res) {
  var sitioEmpresa = {
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

  sitiosEmpresas.crearSitioEmpresa(sitioEmpresa, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitioEmpresa(req, res) {
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

  sitiosEmpresas.editarSitioEmpresa(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
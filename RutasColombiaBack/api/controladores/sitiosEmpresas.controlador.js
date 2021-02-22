'use strict';

var util = require('util');
var sitiosEmpresasServicio = require('../servicios/sitiosEmpresas.servicio');

module.exports = {  
  listarSitiosEmpresas: listarSitiosEmpresas,
  obtenerSitioEmpresa: obtenerSitioEmpresa,
  crearSitioEmpresa: crearSitioEmpresa,
  editarSitioEmpresa: editarSitioEmpresa
};

function listarSitiosEmpresas(req, res) {

  console.log('entro listarSitiosEmpresas');

  sitiosEmpresasServicio.listarSitiosEmpresas(function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function obtenerSitioEmpresa(req, res) {
  console.log('entro obtenerSitioEmpresa ' + req);  
  sitiosEmpresasServicio.obtenerSitioEmpresa(req.body.id, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function crearSitioEmpresa(req, res) {
  console.log('entro crearSitioEmpresa ' + req.body);

  var empresa = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion   
  }
  sitiosEmpresasServicio.crearSitioEmpresa(empresa, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitioEmpresa(req, res) {
  console.log('entro editarSitioEmpresa ' , req.body.nombre, req.body.id);

  
  var empresa = {
    id: req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion 
  }

  sitiosEmpresasServicio.editarSitioEmpresa(empresa, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
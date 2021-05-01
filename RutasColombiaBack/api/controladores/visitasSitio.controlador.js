'use strict';

var util = require('util');
var visitasSitioServicio = require('../servicios/visitasSitio.servicio');

function listarVisitasSitio(req, res) {

  console.log('entro listarVisitasSitio');

  visitasSitioServicio.listarVisitasSitio(function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function obtenerVisitaSitio(req, res) {
  console.log('entro obtenerVisitaSitio ' + req);  
  visitasSitioServicio.obtenerVisitaSitio(req.body.id, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function crearVisitaSitio(req, res) {
  console.log('entro crearVisitaSitio ' , req.body);
  var visitaVisitaSitio = {
    sitio: req.body.sitio,
    tipoVisita: req.body.tipoVisita,
    urlVisita: req.body.urlVisita,
    fecha: req.body.fecha
  }
  console.log('var visitaVisitaSitio ' , visitaVisitaSitio);
  visitasSitioServicio.crearVisitaSitio(visitaVisitaSitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarVisitaSitio(req, res) {
  console.log('entro editarVisitaSitio ' , req.body.nombre, req.body.id);

  var visitaVisitaSitio = {
    id: req.body.id,
    sitio: req.body.sitio,
    tipoVisita: req.body.tipoVisita,
    urlVisita: req.body.urlVisita,
    fecha: req.body.fecha
  }

  visitasSitioServicio.editarVisitaSitio(visitaVisitaSitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}


module.exports = {
  listarVisitasSitio,
  obtenerVisitaSitio,
  crearVisitaSitio,
  editarVisitaSitio
};
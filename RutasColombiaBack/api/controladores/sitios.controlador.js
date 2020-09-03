'use strict';

var util = require('util');
var sitiosServicio = require('../servicios/sitios.servicio');

module.exports = {
    sitiosCercanos: sitiosCercanos,
    listarSitios: listarSitios
};

function sitiosCercanos(req, res) {

  var punto = {
      latitud: req.body.latitud,
      longitud: req.body.longitud,
      distancia: req.body.distancia
  }

  console.log('entro',punto);
  
  sitiosServicio.sitiosCercanos(punto, function (error, resultado) {
    if (error || resultado == undefined) {
        return res.status(500).json(error);
    } else {
        return res.status(200).json(resultado);
    }
    
  })

}
function listarSitios(req, res) {

  console.log('entro listarSitios');
  
  sitiosServicio.listarSitios(function (error, resultado) {
    if (error || resultado == undefined) {
        return res.status(500).json(error);
    } else {
        return res.status(200).json(resultado);
    }
    
  })

}
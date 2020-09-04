'use strict';

var util = require('util');
var sitiosServicio = require('../servicios/sitios.servicio');

module.exports = {
  sitiosCercanos: sitiosCercanos,
  listarSitios: listarSitios,
  crearSitio: crearSitio,
  editarSitio: editarSitio
};

function sitiosCercanos(req, res) {

  var punto = {
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    distancia: req.body.distancia
  }

  console.log('entro', punto);

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

function crearSitio(req, res) {
  console.log('entro crearSitio ' + req);

  var sitio = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    categoria: req.body.categoria,
    municipio: req.body.municipio,
    punto: {
      latitud: req.body.punto.latitud,
      longitud: req.body.punto.longitud
    },
    icono: req.body.icono,
    urlImagen: req.body.urlImagen,
    url: req.body.url,
    idiomas: {
      es:
      {
        nombre: req.body.es.nombre,
        descripcion: req.body.es.descripcion,
      },
      en:
      {
        nombre: req.body.idiomas.en.nombre,
        descripcion: req.body.idiomas.en.descripcion
      }

    },
    coordenadas: req.body.coordenadas
  }

  sitiosServicio.crearSitio(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitio(req, res) {
  console.log('entro editarSitio ' + req);

  var sitio = {
    id: req.body.id,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    categoria: req.body.categoria,
    municipio: req.body.municipio,
    punto: {
      latitud: req.body.punto.latitud,
      longitud: req.body.punto.longitud
    },
    icono: req.body.icono,
    urlImagen: req.body.urlImagen,
    url: req.body.url,
    idiomas: {
      es:
      {
        nombre: req.body.es.nombre,
        descripcion: req.body.es.descripcion,
      },
      en:
      {
        nombre: req.body.idiomas.en.nombre,
        descripcion: req.body.idiomas.en.descripcion
      }

    },
    coordenadas: req.body.coordenadas
  }

  sitiosServicio.editarSitio(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}
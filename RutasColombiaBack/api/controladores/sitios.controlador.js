'use strict';

var util = require('util');
var sitiosServicio = require('../servicios/sitios.servicio');

function sitiosCercanos(req, res) {

  var punto = {
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    distancia: req.body.distancia
  }

  console.log('entro sitiosCercanos', punto);

  sitiosServicio.sitiosCercanos(punto, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function sitiosCercanosRuta(req, res) {

  var punto = {    
    coordenadas: req.body.coordenadas,
    distancia: req.body.distancia
  }

  console.log('entro sitiosCercanosRuta', punto);

  sitiosServicio.sitiosCercanosRuta(punto, function (error, resultado) {
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

function obtenerSitio(req, res) {
  console.log('entro obtenerSitio ' + req);  
  sitiosServicio.obtenerSitio(req.body.id, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function crearSitio(req, res) {
  console.log('entro crearSitio ' , req.body);
  var urlImagen = "";
  if (req.body.imagenb64){
    const fs = require('fs');

    var base64result = req.body.imagenb64.substr(req.body.imagenb64.indexOf(',') + 1);  
    const imageBufferData = Buffer.from(base64result, 'base64')
    urlImagen = "/assets/imagenesSitios/"+ req.body.nombreArchivo;
  
    fs.writeFileSync(__dirname + "../../../public/assets/imagenesSitios/" + req.body.nombreArchivo, imageBufferData, function (err) {
      if (err) {
        return console.log(err);
      }    
    });
  
  }  
  var sitio = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    categoria: req.body.categoria,
    empresa: req.body.empresa,
    municipio: req.body.municipio,
    URLWeb: req.body.URLWeb,
    URLContacto: req.body.URLContacto,
    URLRelacionada: req.body.URLRelacionada,
    URLCalificacion: req.body.URLCalificacion,
    correo: req.body.correo,       
    punto: {type: "Point", coordinates: [req.body.punto.longitud, req.body.punto.latitud ]},
    nombreArchivo: req.body.nombreArchivo,
    urlImagen: urlImagen,
    idiomas: req.body.idiomas,    
    activo: req.body.activo
  }
  console.log('var sitio ' , sitio);
  sitiosServicio.crearSitio(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitio(req, res) {
  console.log('entro editarSitio ' , req.body.nombre, req.body.id);
  var urlImagen = "";
  if (req.body.imagenb64){
    const fs = require('fs');

    var base64result = req.body.imagenb64.substr(req.body.imagenb64.indexOf(',') + 1);  
    const imageBufferData = Buffer.from(base64result, 'base64')
    urlImagen = "/assets/imagenesSitios/"+ req.body.nombreArchivo;
  
    fs.writeFileSync(__dirname + "../../../public/assets/imagenesSitios/" + req.body.nombreArchivo, imageBufferData, function (err) {
      if (err) {
        return console.log(err);
      }    
    });
  
  }
  var sitio = {
    id: req.body.id,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    categoria: req.body.categoria,
    empresa: req.body.empresa,
    municipio: req.body.municipio,
    URLWeb: req.body.URLWeb,
    URLContacto: req.body.URLContacto,
    URLRelacionada: req.body.URLRelacionada,
    URLCalificacion: req.body.URLCalificacion,
    correo: req.body.correo,
    punto: {type: "Point", coordinates: [req.body.punto.longitud, req.body.punto.latitud ]},    
    nombreArchivo: req.body.nombreArchivo,
    urlImagen: urlImagen,
    idiomas: req.body.idiomas,    
    activo: req.body.activo
  }

  sitiosServicio.editarSitio(sitio, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}


module.exports = {
  sitiosCercanos,
  sitiosCercanosRuta,
  listarSitios,
  obtenerSitio,
  crearSitio,
  editarSitio
};
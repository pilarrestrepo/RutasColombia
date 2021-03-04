'use strict';

var util = require('util');
var sitiosCategoriasServicio = require('../servicios/sitiosCategorias.servicio');

module.exports = {  
  listarSitiosCategorias: listarSitiosCategorias,
  obtenerSitioCategoria:obtenerSitioCategoria,
  crearSitioCategoria: crearSitioCategoria,
  editarSitioCategoria: editarSitioCategoria
};

function listarSitiosCategorias(req, res) {

  console.log('entro listarSitiosCategorias');

  sitiosCategoriasServicio.listarSitiosCategorias(function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function obtenerSitioCategoria(req, res) {
  console.log('entro obtenerSitioCategoria ' + req);  
  sitiosCategoriasServicio.obtenerSitioCategoria(req.body.id, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function crearSitioCategoria(req, res) {
  console.log('entro crearSitioCategoria ' + req.body);
  var urlImagen = "";
  if (req.body.imagenb64){
    const fs = require('fs');

    var base64result = req.body.imagenb64.substr(req.body.imagenb64.indexOf(',') + 1);  
    const imageBufferData = Buffer.from(base64result, 'base64')
    urlImagen = "/assets/imagenesSitioCategorias/"+ req.body.nombreArchivo;
  
    fs.writeFileSync(__dirname + "../../../public/assets/imagenesSitioCategorias/" + req.body.nombreArchivo, imageBufferData, function (err) {
      if (err) {
        return console.log(err);
      }    
    });
  
  }
  var categoria = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    nombreArchivo: req.body.nombreArchivo,
    urlImagen: urlImagen,
    idiomas: req.body.idiomas
  }
  sitiosCategoriasServicio.crearSitioCategoria(categoria, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

function editarSitioCategoria(req, res) {
  console.log('entro editarSitioCategoria ' , req.body.nombre, req.body.id);
  var urlImagen = "";
  if (req.body.imagenb64){
    const fs = require('fs');

    var base64result = req.body.imagenb64.substr(req.body.imagenb64.indexOf(',') + 1);  
    const imageBufferData = Buffer.from(base64result, 'base64')
    urlImagen = "/assets/imagenesSitioCategorias/"+ req.body.nombreArchivo;
  
    fs.writeFileSync(__dirname + "../../../public/assets/imagenesSitioCategorias/" + req.body.nombreArchivo, imageBufferData, function (err) {
      if (err) {
        return console.log(err);
      }    
    });
  
  }
  var categoria = {
    id: req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    nombreArchivo: req.body.nombreArchivo,
    urlImagen: urlImagen,
    idiomas: req.body.idiomas
  }
  console.log('categoria', categoria);
  sitiosCategoriasServicio.editarSitioCategoria(categoria, function (error, resultado) {
    if (error || resultado == undefined) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(resultado);
    }

  })

}

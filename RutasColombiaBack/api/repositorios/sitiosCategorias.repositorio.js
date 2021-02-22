'use strict';

let _ = require('lodash');
let sitiosCategorias = require('../modelos/sitiosCategorias');

function listarSitiosCategorias(callback) {
    sitiosCategorias.find({})
        .then((resultado) => {
            let vectorSitiosCategorias = [];
            resultado.forEach(element => {
                vectorSitiosCategorias.push(element.toCleanObject());
            });
            return callback(null, vectorSitiosCategorias);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}
function obtenerSitioCategoria(idSitioCategoria, callback) {
  console.log("obtenerSitioCategoria", idSitioCategoria)
  sitiosCategorias.find({ _id: idSitioCategoria })
      .then((resultado) => {
          let sitioCategoria = null;
          resultado.forEach(element => {
            sitioCategoria = element.toCleanObject();
          });
          return callback(null, sitioCategoria);
      }).catch((error) => {
          console.log('error', error);
          return callback(error);
      })

}
function crearSitioCategoria(sitio, callback) {

  let nuevoSitioCategoria = new sitiosCategorias(sitio);

  nuevoSitioCategoria.save(function (err, result) {
      if (err) {
          return callback(err);
      } else if (result) {
          return callback(null, result.toCleanObject());
      } else {
          return callback();
      }
  });

}

function editarSitioCategoria(sitioCategoria, callback) {
  console.log("editarSitioCategoria", sitioCategoria)
  sitiosCategorias.findOneAndUpdate(
      {
          _id: sitioCategoria.id
      },
      {
          $set: {
              nombre: sitioCategoria.nombre,
              descripcion: sitioCategoria.descripcion,              
              nombreArchivo: sitioCategoria.nombreArchivo,
              urlImagen: sitioCategoria.urlImagen,
              idiomas: sitioCategoria.idiomas
          }
      },
      {
          new: true
      })
      .then((result) => {
          return callback(null, result.toCleanObject());
      }).catch((err) => {
          return callback(err);
      })

}

module.exports = {    
    listarSitiosCategorias,
    obtenerSitioCategoria,
    crearSitioCategoria,
    editarSitioCategoria    
}


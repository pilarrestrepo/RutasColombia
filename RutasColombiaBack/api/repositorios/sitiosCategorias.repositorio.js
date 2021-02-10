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

function crearSitioCategoria(sitioCategoria, callback) {

    let nuevoSitioCategoria = new sitiosCategorias(sitioCategoria);
  
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

    sitiosCategorias.findOneAndUpdate(
      {
        _id: sitioCategoria.id
      },
      {
        $set: {
            nombre: sitioCategoria.nombre,
            idiomas:{
                es:
                {
                    nombre: sitioCategoria.idiomas.es.nombre
                },
                en:
                {
                    nombre: sitioCategoria.idiomas.en.nombre
                }        
                    
            }
        }
      },
      {
        new: true
      })
      .then((result) => {
        return callback(null, result.toCleanObject);
      }).catch((err) => {
        return callback(err);
      })
  
  }

module.exports = {    
    listarSitiosCategorias,
    crearSitioCategoria,
    editarSitioCategoria    
}


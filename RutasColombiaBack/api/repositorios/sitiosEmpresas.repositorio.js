'use strict';

let _ = require('lodash');
let sitiosEmpresas = require('../modelos/sitiosEmpresas');

function listarSitiosEmpresas(callback) {
    sitiosEmpresas.find({})
        .then((resultado) => {
            let vectorSitiosEmpresas = [];
            resultado.forEach(element => {
                vectorSitiosEmpresas.push(element.toCleanObject());
            });
            return callback(null, vectorSitiosEmpresas);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}

function crearSitioEmpresa(sitioEmpresa, callback) {

    let nuevoSitioEmpresa = new sitiosEmpresas(sitioEmpresa);
  
    nuevoSitioEmpresa.save(function (err, result) {
      if (err) {
        return callback(err);
      } else if (result) {
        return callback(null, result.toCleanObject());
      } else {
        return callback();
      }
    });
  
  }

  function editarSitioEmpresa(sitioEmpresa, callback) {

    sitiosEmpresas.findOneAndUpdate(
      {
        _id: sitioEmpresa.id
      },
      {
        $set: {
            nombre: sitioEmpresa.nombre,
            idiomas:{
                es:
                {
                    nombre: sitioEmpresa.idiomas.es.nombre
                },
                en:
                {
                    nombre: sitioEmpresa.idiomas.en.nombre
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
    listarSitiosEmpresas,
    crearSitioEmpresa,
    editarSitioEmpresa    
}

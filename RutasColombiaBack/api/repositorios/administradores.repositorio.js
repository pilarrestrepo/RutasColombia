'use strict';

let _ = require('lodash');
let administradores = require('../modelos/administradores');


function listarAdministradores(callback) {
    administradores.find({}).populate({
            path: 'persona',
            populate:{
              path: 'tipo_documento',
              path: 'genero'
            } 
          })    
        .then((resultado) => {
          console.log('res', resultado);
            let vectorAdministradores = [];
            resultado.forEach(element => {
                vectorAdministradores.push(element.toCleanObject());
            });
            return callback(null, vectorAdministradores);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}

function crearAdministrador(administrador, callback) {

    let nuevoAdministrador = new administradores(administrador);
  
    nuevoAdministrador.save(function (err, result) {
      if (err) {
        return callback(err);
      } else if (result) {
        return callback(null, result.toCleanObject());
      } else {
        return callback();
      }
    });
  
  }

  function editarAdministrador(administrador, callback) {

    administradores.findOneAndUpdate(
      {
        _id: administrador.id
      },
      {
        $set: {
            nombre: administrador.nombre,    
            direccion: administrador.direccion,      
            telefono: administrador.telefono,     
            categoria: administrador.categoria,
            municipio: administrador.municipio,
            punto: {
                latitud: administrador.punto.latitud,
                longitud: administrador.punto.longitud
            },        
            icono: administrador.icono,        
            urlImagen: administrador.urlImagen,     
            url: administrador.url,
            idiomas:{
                es:
                {
                    nombre: administrador.idiomas.es.nombre,     
                    descripcion: administrador.idiomas.es.descripcion,     
                },
                en:
                {
                    nombre: administrador.idiomas.en.nombre,     
                    descripcion: administrador.idiomas.en.descripcion     
                }        
                    
            },
            coordenadas: administrador.coordenadas
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
    listarAdministradores,
    crearAdministrador,
    editarAdministrador    
}


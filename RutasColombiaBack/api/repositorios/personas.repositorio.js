'use strict';

let _ = require('lodash');
let personas = require('../modelos/personas');


function listarPersonas(callback) {
    personas.find({}).populate({
            path: 'persona'            
        })
        .populate({
            path: 'tipoDocumento'
        }) 
        .populate({
            path: 'genero'
        })
        .then((resultado) => {
            let vectorPersonas = [];
            resultado.forEach(element => {
                vectorPersonas.push(element.toCleanObject());
            });
            return callback(null, vectorPersonas);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}

function crearPersona(persona, callback) {

    let nuevoPersona = new personas(persona);
  
    nuevoPersona.save(function (err, result) {
      if (err) {
        return callback(err);
      } else if (result) {
        return callback(null, result.toCleanObject());
      } else {
        return callback();
      }
    });
  
  }

  function editarPersona(persona, callback) {

    personas.findOneAndUpdate(
      {
        _id: persona.id
      },
      {
        $set: {
            nombre: persona.nombre,    
            direccion: persona.direccion,      
            telefono: persona.telefono,     
            categoria: persona.categoria,
            municipio: persona.municipio,
            punto: {
                latitud: persona.punto.latitud,
                longitud: persona.punto.longitud
            },        
            icono: persona.icono,        
            urlImagen: persona.urlImagen,     
            url: persona.url,
            idiomas:{
                es:
                {
                    nombre: persona.idiomas.es.nombre,     
                    descripcion: persona.idiomas.es.descripcion,     
                },
                en:
                {
                    nombre: persona.idiomas.en.nombre,     
                    descripcion: persona.idiomas.en.descripcion     
                }        
                    
            },
            coordenadas: persona.coordenadas
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
    listarPersonas,
    crearPersona,
    editarPersona    
}


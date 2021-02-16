'use strict';

let _ = require('lodash');
let sitios = require('../modelos/sitios');

function sitiosCercanos(punto, callback) {
    sitios.find(
        {
            coordenadas:
            {
                $near:
                {
                    $geometry: {
                        type: "Point",
                        coordinates: [punto.longitud, punto.latitud]
                    },
                    $maxDistance: punto.distancia
                }
            }
        }
    ).populate({
            path: 'municipio',
            select: { 'nombre': 1 },
            populate: {
                path: 'departamento',
                select: { 'nombre': 1 },
                populate: {
                    path: 'pais',
                    select: { 'nombre': 1 }
                }
            }
        })
        .populate({
            path: 'categoria'
        })
        .then((resultado) => {
            let vectorSitios = [];
            resultado.forEach(element => {
                vectorSitios.push(element.toCleanObject());
            });
            return callback(null, vectorSitios);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}

function listarSitios(callback) {
    sitios.find({}).populate({
            path: 'municipio',
            select: { 'nombre': 1 },
            populate: {
                path: 'departamento',
                select: { 'nombre': 1 },
                populate: {
                    path: 'pais',
                    select: { 'nombre': 1 }
                }
            }
        })
        .populate({
            path: 'categoria'
        })
        .then((resultado) => {
            let vectorSitios = [];
            resultado.forEach(element => {
                vectorSitios.push(element.toCleanObject());
            });
            return callback(null, vectorSitios);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}
function obtenerSitio(idSitio, callback) {
    console.log("obtenerSitio", idSitio)
    sitios.find({_id: idSitio}).populate({
        path: 'municipio',
        select: { 'nombre': 1 },
        populate: {
            path: 'departamento',
            select: { 'nombre': 1 },
            populate: {
                path: 'pais',
                select: { 'nombre': 1 }
            }
        }
    })
    .populate({
        path: 'categoria'
    })
    .populate({
        path: 'empresa'
    })
    .then((resultado) => {
        let sitio = null;
        resultado.forEach(element => {
            sitio =element.toCleanObject();            
        });
        return callback(null, sitio);
    }).catch((error) => {
        console.log('error', error);
        return callback(error);
    })
  
  }
function crearSitio(sitio, callback) {

    let nuevoSitio = new sitios(sitio);
  
    nuevoSitio.save(function (err, result) {
      if (err) {
        return callback(err);
      } else if (result) {
        return callback(null, result.toCleanObject());
      } else {
        return callback();
      }
    });
  
  }

  function editarSitio(sitio, callback) {
    console.log("editarSitio", sitio)
    sitios.findOneAndUpdate(
      {
        _id: sitio.id
      },
      {
        $set: {
            nombre: sitio.nombre,    
            direccion: sitio.direccion,      
            telefono: sitio.telefono,     
            categoria: sitio.categoria,
            empresa: sitio.empresa,
            municipio: sitio.municipio,
            URLWeb: sitio.URLWeb,
            uURLContactorl: sitio.URLContacto,
            URLRelacionada: sitio.URLRelacionada,
            correo: sitio.correo,
            punto: sitio.punto,
            nombreArchivo: sitio.nombreArchivo,
            urlImagen: sitio.urlImagen,
            idiomas: sitio.idiomas,    
            activo: sitio.activo
           /* punto: {
                latitud: sitio.punto.latitud,
                longitud: sitio.punto.longitud
            },        
            icono: sitio.icono,        
            urlImagen: sitio.urlImagen,     
           
            idiomas:{
                es:
                {
                    nombre: sitio.idiomas.es.nombre,     
                    descripcion: sitio.idiomas.es.descripcion,     
                },
                en:
                {
                    nombre: sitio.idiomas.en.nombre,     
                    descripcion: sitio.idiomas.en.descripcion     
                }        
                    
            },
            coordenadas: sitio.coordenadas*/
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
    sitiosCercanos,
    listarSitios,
    obtenerSitio,
    crearSitio,
    editarSitio    
}


'use strict';

let _ = require('lodash');
let sitios = require('../modelos/sitios');


////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function sitiosCercanos(punto, callback) {


    /*let sit = sitios.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ -74 , 4 ] },
             distanceField: "distancia",
             spherical: true,
             maxDistance: 72000 
                
          }
        },
        { $limit: 2 }
     ]);*/

    sitios.find(
        {
            coordenadas:
            {
                $near:
                {
                    $geometry: {
                        type: "Point",
                        coordinates: [-74, 4]
                    },
                    $maxDistance: 72000
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
            path: 'categoria',
            select: { 'nombre': 1 }
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

/*function initDefaultAutenticacion(autenticacionSet) {
    autenticacion = autenticacionSet.slice();
}*/

module.exports = {
    sitiosCercanos
    // getAutenticacion,
    // initDefaultAutenticacion
}


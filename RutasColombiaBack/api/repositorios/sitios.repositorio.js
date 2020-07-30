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


    sitios.find({})
        .populate({
            path: 'municipio',
            populate: {
                path: 'departamento',
                populate: {
                    path: 'pais'
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
            console.log('error',error);
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


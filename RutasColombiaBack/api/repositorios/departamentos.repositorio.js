'use strict';

let _ = require('lodash');
let departamentos = require('../modelos/departamentos');

function listarDepartamentos(callback) {
    departamentos.find().populate({
                path: 'municipios',
                select: { 'nombre': 1 }             
            }).
            populate({
                path: 'pais',
                select: { 'nombre': 1 }
            
        })       
        .then((resultado) => {
            let vectorDepartamentos = [];
            resultado.forEach(element => {
                vectorDepartamentos.push(element.toCleanObject());
            });
            return callback(null, vectorDepartamentos);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}
module.exports = {
    listarDepartamentos 
}
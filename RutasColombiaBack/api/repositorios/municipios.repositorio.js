'use strict';

let _ = require('lodash');
let municipios = require('../modelos/municipios');

function listarMunicipios(callback) {
    municipios.find({}).populate({
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
            let vectorMunicipios = [];
            resultado.forEach(element => {
                vectorMunicipios.push(element.toCleanObject());
            });
            return callback(null, vectorMunicipios);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}
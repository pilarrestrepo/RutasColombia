'use strict';

let _ = require('lodash');
let visitasSitio = require('../modelos/visitasSitio');

function listarVisitasSitio(callback) {
    visitasSitio.find({})
        .populate({
            path: 'sitio'
        })
        .then((resultado) => {
            let vectorVisitasSitio = [];
            resultado.forEach(element => {
                vectorVisitasSitio.push(element.toCleanObject());
            });
            return callback(null, vectorVisitasSitio);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })
}
function obtenerVisitaSitio(idVisitaSitio, callback) {
    console.log("obtenerVisitaSitio", idVisitaSitio)
    visitasSitio.find({ _id: idVisitaSitio })
        .populate({
            path: 'sitio'
        })        
        .then((resultado) => {
            let sitio = null;
            resultado.forEach(element => {
                sitio = element.toCleanObject();
            });
            return callback(null, sitio);
        }).catch((error) => {
            console.log('error', error);
            return callback(error);
        })

}
function crearVisitaSitio(visitaSitio, callback) {
    console.log("repositirio crearVisitaSitio ", visitaSitio)
    let nuevoVisitaSitio = new visitasSitio(visitaSitio);

    nuevoVisitaSitio.save(function (err, result) {
        if (err) {
            console.log("error", err)
            return callback(err);
        } else if (result) {
            return callback(null, result.toCleanObject());
        } else {
            return callback();
        }
    });

}

function editarVisitaSitio(visitaSitio, callback) {
    console.log("editarVisitaSitio", visitaSitio)
    visitasSitio.findOneAndUpdate(
        {
            _id: visitaSitio.id
        },
        {
            $set: {
                sitio: visitaSitio.sitio,
                tipoVisita: visitaSitio.tipoVisita,
                urlVisita: visitaSitio.urlVisita,
                fecha: visitaSitio.fecha
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
    listarVisitasSitio,
    obtenerVisitaSitio,
    crearVisitaSitio,
    editarVisitaSitio
}

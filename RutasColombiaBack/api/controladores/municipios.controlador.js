'use strict';

var util = require('util');
var municipiosServicio = require('../servicios/municipios.servicio');

module.exports = {    
    listarMunicipios: listarMunicipios
};

function listarMunicipios(req, res) {

    console.log('entro listarMunicipios');

    municipiosServicio.listarMunicipios(function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}

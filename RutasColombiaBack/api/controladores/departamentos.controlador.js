'use strict';

var util = require('util');
var departamentosServicio = require('../servicios/departamentos.servicio');

module.exports = {    
    listarDepartamentos: listarDepartamentos
};

function listarDepartamentos(req, res) {

    console.log('entro listarDepartamentos');

    departamentosServicio.listarDepartamentos(function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}


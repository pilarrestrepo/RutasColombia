'use strict';

var util = require('util');
var personasServicio = require('../servicios/personas.servicio');

module.exports = {
    personasCercanos: personasCercanos,
    listarPersonas: listarPersonas,
    crearPersona: crearPersona,
    editarPersona: editarPersona
};

function listarPersonas(req, res) {

    console.log('entro listarPersonas');

    personasServicio.listarPersonas(function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}

function crearPersona(req, res) {
    console.log('entro crearPersona ' + req);
    var persona = {
        tipoDocumento: req.body.tipoDocumento,
        numeroDocumento: req.body.numeroDocumento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        correoElectronico: req.body.correoElectronico,
        telefonoCelular: req.body.telefonoCelular,
        telefonoFijo: req.body.telefonoFijo
    }

    personasServicio.crearPersona(persona, function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}

function editarPersona(req, res) {
    console.log('entro editarPersona ' + req);

    var persona = {
        id: req.body.id,
        tipoDocumento: req.body.tipoDocumento,
        numeroDocumento: req.body.numeroDocumento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        correoElectronico: req.body.correoElectronico,
        telefonoCelular: req.body.telefonoCelular,
        telefonoFijo: req.body.telefonoFijo
    }

    personasServicio.editarPersona(persona, function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}
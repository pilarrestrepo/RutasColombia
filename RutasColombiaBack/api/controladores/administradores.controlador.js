'use strict';

var util = require('util');
var administradoresServicio = require('../servicios/administradores.servicio');

module.exports = {    
    listarAdministradores: listarAdministradores,
    crearAdministrador: crearAdministrador,
    editarAdministrador: editarAdministrador
};

function listarAdministradores(req, res) {

    console.log('entro listarAdministradores');

    administradoresServicio.listarAdministradores(function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}

function crearAdministrador(req, res) {
    console.log('entro crearAdministrador ' + req);
    var administrador = {
        usuario: req.body.usuario,
        persona: req.body.persona,
        clave: req.body.clave,
        fechaRegistro: req.body.fechaRegistro
    }

    administradoresServicio.crearAdministrador(administrador, function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}

function editarAdministrador(req, res) {
    console.log('entro editarAdministrador ' + req);

    var administrador = {
        usuario: req.body.usuario,
        persona: req.body.persona,
        clave: req.body.clave,
        fechaRegistro: req.body.fechaRegistro
    }

    administradoresServicio.editarAdministrador(administrador, function (error, resultado) {
        if (error || resultado == undefined) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(resultado);
        }

    })

}
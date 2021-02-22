'use strict';

let _ = require('lodash');
let sitiosEmpresas = require('../modelos/sitiosEmpresas');

function listarSitiosEmpresas(callback) {
  sitiosEmpresas.find({})
    .then((resultado) => {
      let vectorSitiosEmpresas = [];
      resultado.forEach(element => {
        vectorSitiosEmpresas.push(element.toCleanObject());
      });
      return callback(null, vectorSitiosEmpresas);
    }).catch((error) => {
      console.log('error', error);
      return callback(error);
    })
}

function obtenerSitioEmpresa(idSitioEmpresa, callback) {
  console.log("obtenerSitioEmpresa", idSitioEmpresa)
  sitiosEmpresas.find({ _id: idSitioEmpresa })
    .then((resultado) => {
      let sitioEmpresa = null;
      resultado.forEach(element => {
        sitioEmpresa = element.toCleanObject();
      });
      return callback(null, sitioEmpresa);
    }).catch((error) => {
      console.log('error', error);
      return callback(error);
    })

}
function crearSitioEmpresa(empresa, callback) {

  let nuevoSitioEmpresa = new sitiosEmpresas(empresa);

  nuevoSitioEmpresa.save(function (err, result) {
    if (err) {
      return callback(err);
    } else if (result) {
      return callback(null, result.toCleanObject());
    } else {
      return callback();
    }
  });

}

function editarSitioEmpresa(sitioEmpresa, callback) {
  console.log("editarSitioEmpresa", sitioEmpresa)
  sitiosEmpresas.findOneAndUpdate(
    {
      _id: sitioEmpresa.id
    },
    {
      $set: {
        nombre: sitioEmpresa.nombre,
        descripcion: sitioEmpresa.descripcion
      }
    },
    {
      new: true
    })
    .then((result) => {
      return callback(null, result.toCleanObject());
    }).catch((err) => {
      return callback(err);
    })

}

module.exports = {
  listarSitiosEmpresas,
  obtenerSitioEmpresa,
  crearSitioEmpresa,
  editarSitioEmpresa
}

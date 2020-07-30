'use strict';

var _ = require('lodash');

var sitiosRepositorio = require('../repositorios/sitios.repositorio');

function sitiosCercanos(punto, callback) {

  /*let sitios = [{
      "nombre": "El parque",
      "ubicacion": punto
  },
  {
      "nombre": "El restaurante",
      "ubicacion": punto
  }];

  return callback(null, sitios);*/


  sitiosRepositorio.sitiosCercanos(punto, function (error, resultado) {
    if (error) {
      return callback(error);
    } else if (resultado) {
      return callback(null, resultado);
    }
  });

  /*autenticacionRepository.getAutenticacion(params, function(err, res) {
    console.log("SERVICE",res);
    //return {id:1};
    if (err) {
      return callback(err);
    } else if (res) {
      let token = "0";
      if(res == null){
        token = "0";
      }else{
        token = "1";
      }
      let autenticacionResult = {
        "links": {
          "self": "1",
          "first": "1",
          "last": "1",
          "prev": "1",
          "next": "1"
        },
        "data": {
          "token": token,
          "usuario": res,
          "menu": [
            {
              "label": "Tareas Asignadas",
              "routerLink": "",
              "icon": "",
              "isHeader": true
            },
            {
              "label": "Cultivos",
              "routerLink": "",
              "icon": "",
              "isHeader": false,
              "submenu": [
                {
                  "label": "transitorios",
                  "routerLink": "",
                  "icon": ""
                },
                {
                  "label": "permanentes",
                  "routerLink": "",
                  "icon": ""
                }
              ]
            },
            {
              "label": "pecuaria",
              "routerLink": "",
              "icon": "",
              "isHeader": false
            }
          ]
        },
        "error": {
          "status":200,
          "title": "OK"
        }
      }  
 
      return callback(null, autenticacionResult);
    } else {
      return callback();
    }
  });*/
}

module.exports = {
  sitiosCercanos
}
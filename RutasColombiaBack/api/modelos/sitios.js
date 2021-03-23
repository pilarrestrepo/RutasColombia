let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;
const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
//Schema for Usuario
let sitiosSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    nombre: {
        type: String
    },    
    direccion: {
        type: String
    },      
    telefono: {
        type: String
    },     
    categoria: {
        type: Schema.ObjectId,
        ref: 'sitiosCategorias'
    },
    empresa: {
        type: Schema.ObjectId,
        ref: 'sitiosEmpresas'
    },    
    municipio: {
        type: Schema.ObjectId,
        ref: 'municipios'
    },       
    URLWeb: {
        type: String
    },    
    URLContacto: {
        type: String
    },    
    URLRelacionada: {
        type: String
    },    
    correo: {
        type: String
    },    
    punto: { 
        type: { type: String, 
            enum: "Point", default: "Point" 
        }, 
        coordinates: { 
            type: [Number], 
            default: [0,0] 
        } 
    },
    urlImagen: {
        type: String
    },     
    nombreArchivo: {
        type: String
    }, 
    idiomas:{
        es:
        {
            nombre:{
                type: String
            },     
            descripcion:{
                type: String
            },     
        },
        en:
        {
            nombre: {
                type: String
            },     
            descripcion:{
                type: String
            },     
        }        
            
    },
    activo: {
        type: Boolean
    }
},{ collection: 'sitios'});

sitiosSchema.plugin(snakeToCamel);

//Define the model for sitios
let sitios;

if (mongoose.models.sitios)
    sitios = mongoose.model('sitios');
else
    sitios = mongoose.model('sitios', sitiosSchema);
    
//Export the sitios Model
module.exports = sitios;
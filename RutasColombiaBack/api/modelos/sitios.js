let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

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
    municipio: {
        type: Schema.ObjectId,
        ref: 'municipios'
    },
    punto: {
        latitud: {type: Number},
        longitud: {type: Number}
    },        
    icono: {
        type: String
    },        
    urlImagen: {
        type: String
    },     
    url: {
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
    coordenadas: {
        type: [Number]
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
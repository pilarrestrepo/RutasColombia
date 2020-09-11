let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let personasSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    tipo_documento: {
        type: Schema.ObjectId, 
        ref: 'tiposDocumentos'
    }, 
    numero_documento: {
        type: String
    },       
    nombre: {
        type: String
    }, 
    apellido: {
        type: String
    },               
    fecha_nacimiento: {
        type: Date
    },     
    genero: {
        type: Schema.ObjectId, 
        ref: 'generos'
    },       
    correo_electronico: {
        type: String
    },   
    telefono_celular: {
        type: String
    },      
    telefono_fijo: {
        type: String
    }
},{ collection: 'personas'});

personasSchema.plugin(snakeToCamel);

//Define the model for personas
let personas;

if (mongoose.models.personas)
    personas = mongoose.model('personas');
else
    personas = mongoose.model('personas', personasSchema);
    
//Export the personas Model
module.exports = personas;
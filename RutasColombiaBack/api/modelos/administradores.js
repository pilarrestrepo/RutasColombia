let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let administradoresSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    usuario: {
        type: String
    },       
    persona: {
        type: Schema.ObjectId,
        ref: 'personas'
    },
    clave: {
        type: String
    },      
    fecha_registro: {
        type: String
    }
},{ collection: 'administradores'});

administradoresSchema.plugin(snakeToCamel);

//Define the model for administradores
let administradores;

if (mongoose.models.administradores)
    administradores = mongoose.model('administradores');
else
    administradores = mongoose.model('administradores', administradoresSchema);
    
//Export the administradores Model
module.exports = administradores;
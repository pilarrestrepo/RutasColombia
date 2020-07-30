let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for municipios
let municipiosSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    codigo: {
        type: String
    },
    codigo_municipio: {
        type: String
    },
    nombre: {
        type: String
    },
    departamento: {
        type: Schema.ObjectId,
        ref: 'departamentos'
    },
    categoria: {
        type: String
    },
    region: {
        type: String
    }
},{ collection: 'municipios'});

municipiosSchema.plugin(snakeToCamel);

//Define the model for municipios
let municipios;

if (mongoose.models.municipios)
    municipios = mongoose.model('municipios');
else
    municipios = mongoose.model('municipios', municipiosSchema);
    
//Export the municipios Model
module.exports = municipios;
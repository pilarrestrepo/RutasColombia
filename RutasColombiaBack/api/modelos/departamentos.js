let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for departamentos
let departamentosSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    codigo: {
        type: String
    },
    nombre: {
        type: String
    },
    municipios: [{
        type: Schema.ObjectId,
        ref: 'municipios'
    }],
    pais: {
        type: Schema.ObjectId,
        ref: 'paises'
    } 
},{ collection: 'departamentos'});

departamentosSchema.plugin(snakeToCamel);

//Define the model for departamentos
let departamentos;

if (mongoose.models.departamentos)
    departamentos = mongoose.model('departamentos');
else
    departamentos = mongoose.model('departamentos', departamentosSchema);
    
//Export the departamentos Model
module.exports = departamentos;
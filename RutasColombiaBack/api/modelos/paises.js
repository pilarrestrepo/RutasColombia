let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for paises
let paisesSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    nombre: {
        type: String
    },
    codigo: {
        type: Number
    },
    idioma: {
        type: String
    },
    departamentos: [{
        type: Schema.ObjectId,
        ref: 'departamentos'
    }]
},{ collection: 'paises'});

paisesSchema.plugin(snakeToCamel);

//Define the model for paises
let paises;

if (mongoose.models.paises)
    paises = mongoose.model('paises');
else
    paises = mongoose.model('paises', paisesSchema);
    
//Export the paises Model
module.exports = paises;
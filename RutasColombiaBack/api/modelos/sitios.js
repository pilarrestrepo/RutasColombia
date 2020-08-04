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
    punto: {
        latitud: {type: Number},
        longitud: {type: Number}
    },    
    municipio: {
        type: Schema.ObjectId,
        ref: 'municipios'
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'sitiosCategorias'
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
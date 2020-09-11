let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let tiposDocumentosSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    nombre: {
        type: String
    }
},{ collection: 'tiposDocumentos'});

tiposDocumentosSchema.plugin(snakeToCamel);

//Define the model for tiposDocumentos
let tiposDocumentos;

if (mongoose.models.tiposDocumentos)
    tiposDocumentos = mongoose.model('tiposDocumentos');
else
    tiposDocumentos = mongoose.model('tiposDocumentos', tiposDocumentosSchema);
    
//Export the tiposDocumentos Model
module.exports = tiposDocumentos;
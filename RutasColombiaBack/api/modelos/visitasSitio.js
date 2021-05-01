let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;
//Schema for Usuario
let visitasSitioSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    sitio: {
        type: Schema.ObjectId,
        ref: 'sitios'
    },    
    tipoVisita: {
        type: String
    },    
    urlVisita: {
        type: String
    },      
    fecha: {
        type: Date
    },     

},{ collection: 'visitasSitio'});

visitasSitioSchema.plugin(snakeToCamel);

//Define the model for visitasSitio
let visitasSitio;

if (mongoose.models.visitasSitio)
    visitasSitio = mongoose.model('visitasSitio');
else
    visitasSitio = mongoose.model('visitasSitio', visitasSitioSchema);
    
//Export the visitasSitio Model
module.exports = visitasSitio;
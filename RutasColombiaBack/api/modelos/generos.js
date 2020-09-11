let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let generosSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    nombre: {
        type: String
    }
},{ collection: 'generos'});

generosSchema.plugin(snakeToCamel);

//Define the model for generos
let generos;

if (mongoose.models.generos)
    generos = mongoose.model('generos');
else
    generos = mongoose.model('generos', generosSchema);
    
//Export the generos Model
module.exports = generos;
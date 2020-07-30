let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let sitiosCategoriasSchema = new Schema({
    _id: {
        type: Schema.ObjectId, 
        auto: true 
    },
    nombre: {
        type: String
    }
},{ collection: 'sitios_categorias'});

sitiosCategoriasSchema.plugin(snakeToCamel);

//Define the model for sitiosCategorias
let sitiosCategorias;

if (mongoose.models.sitiosCategorias)
    sitiosCategorias = mongoose.model('sitiosCategorias');
else
    sitiosCategorias = mongoose.model('sitiosCategorias', sitiosCategoriasSchema);
    
//Export the sitiosCategorias Model
module.exports = sitiosCategorias;
let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let usuariosSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    nombre: {
        type: String
    },
    usuario: {
        type: String
    },    
    clave: {
        type: String
    },
    activo: {
        type: Boolean
    }    

}, { collection: 'usuarios' });

usuariosSchema.plugin(snakeToCamel);

//Define the model for usuarios
let usuarios;

if (mongoose.models.usuarios)
    usuarios = mongoose.model('usuarios');
else
    usuarios = mongoose.model('usuarios', usuariosSchema);

//Export the usuarios Model
module.exports = usuarios;

let mongoose = require('mongoose');
let snakeToCamel = require('mongoose-snake-to-camel');

let Schema = mongoose.Schema;

//Schema for Usuario
let sitiosEmpresasSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    nombre: {
        type: String
    }
}, { collection: 'sitios_empresas' });

sitiosEmpresasSchema.plugin(snakeToCamel);

//Define the model for sitiosEmpresas
let sitiosEmpresas;

if (mongoose.models.sitiosEmpresas)
    sitiosEmpresas = mongoose.model('sitiosEmpresas');
else
    sitiosEmpresas = mongoose.model('sitiosEmpresas', sitiosEmpresasSchema);

//Export the sitiosEmpresas Model
module.exports = sitiosEmpresas;

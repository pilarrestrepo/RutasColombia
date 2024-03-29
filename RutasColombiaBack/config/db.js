var mongoose = require('mongoose'); 

//var dbURI = 'mongodb+srv://diego:admin@cluster0.r9jrb.mongodb.net/rutas_colombia?retryWrites=true&w=majority'; 
var dbURI = 'mongodb://186.155.206.74:80/rutas_colombia?retryWrites=true&w=majority'; 
//var dbURI = 'mongodb://186.155.206.74:80/rutas_colombia_pr?retryWrites=true&w=majority'; 

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }); 

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

require('../api/modelos/departamentos');
require('../api/modelos/municipios');
require('../api/modelos/paises');
require('../api/modelos/sitios');
require('../api/modelos/sitiosCategorias');
require('../api/modelos/administradores');
require('../api/modelos/generos');
require('../api/modelos/personas');
require('../api/modelos/tiposDocumentos');
'use strict';

const path = require("path");
const fs = require("fs");
var https = require('https');
var SwaggerExpress = require('swagger-express-mw');
// var app = require('express')();
var express = require('express');
var app = express();
require('./config/db');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//module.exports = app; // for testing

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

// module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var options = {
  key: fs.readFileSync(path.resolve('config/certificate/private.key')),
  cert: fs.readFileSync(path.resolve('config/certificate/certificate.crt'))
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get("/", express.static(path.join(__dirname, "./assets/imagenesSitios")));
app.use(express.static('public'));


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  // app.listen(port);
  https.createServer(options, app).listen(port, function () {
    console.log('Server started @ %s!', port);
  });
  /*if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }*/
});

/* SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
  var port = process.env.PORT || 443;
    https.createServer(options, app).listen(port, function () {
        console.log('Server started @ %s!', port);
    });
}); */

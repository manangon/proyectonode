
'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

//CONEXION TIPO PROMESA DE LA BASE DE DATOS 
mongoose.Promise = global.Promise;
//DESCOMENTAR LA BASE DE DATOS DE MONGO 
mongoose.connect("mongodb+srv://gracekarla995:TV9EoRNDfbR6O9jH@cluster0.ih2fwnq.mongodb.net/curso")
    .then(() => {
            console.log("Conexión a la base de datos es establecida con exito");
            // CREAR EL SERVIDOR
            var server = app.listen(port , ()=>{ 
                console.log("Servidor corriendo correctamente en la url: http://localhost:" + port)
            })
            server.timeout =12000;
        })
    .catch(err => console.log(err));




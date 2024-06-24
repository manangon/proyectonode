'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AlumnosSchema =Schema({
    n_cuenta: {type: Number, required: true, unique:true},
    nombre : {type : String, required : true},
    edad: {type: Number, required: true},
    genero: {type : String, required : true},
});


module.exports = mongoose.model('alumnos' , AlumnosSchema);
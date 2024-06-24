'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsuariosSchema =Schema({
    mail: {type: String, required: true, unique:true},
    pass : {type : String, required : true}
   
});


module.exports = mongoose.model('usuarios' , UsuariosSchema);
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsersseccionSchema =Schema({
    user_id: {type: String, required: true, unique:true},
    jwt : String
   
});


module.exports = mongoose.model('sessions' , UsersseccionSchema );
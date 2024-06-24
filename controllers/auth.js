'use strict'

const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
var Usuarios = require('../models/usuarios')
var Sessions = require('../models/sessions')

var controller = {
    login: function(req, res) {
        // VALIDAMOS LOS DATOS QUE SE ENVÍAN AL ENDPOINT 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array()
            });
        }

        // Obtener información que se envía
        let login_info = req.body;

        Usuarios.findOne({ mail: login_info.mail, pass: login_info.pass })
            .then(existingPassword => {
                if (existingPassword) {
                    // Crear payload después de obtener existingPassword
                    const payload = {
                        user_id: existingPassword._id
                    };

                    // Se recomienda hacer llaves de 256 Caracteres
                    const access_token = jwt.sign(payload, 'estaesmiprimerallaveparaeltoken123456', {
                        expiresIn: '1d' // SE EXPIRA EN UN DÍA
                    });

                    let update = {
                        user_id: existingPassword.id,
                        jwt: access_token
                    };

                    Sessions.findOneAndUpdate({ user_id: existingPassword.id }, update, { upsert: true, new: true })
                        .then(sessionsUpdate => {
                            if (!sessionsUpdate) {
                                return res.status(404).json({
                                    status: 404,
                                    message: "Datos Erroneos"
                                });
                            } else {
                                return res.status(200).json({
                                    status: 200,
                                    message: "Autenticación correcta",
                                    data: sessionsUpdate,
                                    token: access_token
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({
                                status: 500,
                                message: "Error al intentar iniciar la sesión y actualizarla"
                            });
                        });
                } else {
                    return res.status(404).json({
                        status: 404,
                        message: "Los datos no son válidos "
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({
                    status: 500,
                    message: "Error al intentar el login"
                });
            });
    },

    logout: function(req, res) {
        // Implementación del logout
        console.log(req.decoded);
        Sessions.findOneAndDelete({ user_id: req.decoded.user_id })
            .then(usuarioDeletedSeccion => {
                if (!usuarioDeletedSeccion) return res.status(404).send({ message: "Datos erroneos" });
                return res.status(200).send({ message: "USUARIO CERRAR SESIÓN CORRECTAMENTE" });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({ message: err });
            });
    }

 
}

module.exports = controller;

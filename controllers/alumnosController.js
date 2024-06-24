'use strict'
const {validationResult} = require('express-validator')
var Alumnos = require('../models/alumnos')

var controller = {

    alumnos: function(req, res){

        Alumnos.find({}) 
        .then(alumnos => {
            // Verificar si hay alumnos
            if (alumnos.length > 0) {
                console.log(alumnos);
                return res.status(200).send({
                    status: 200,
                    Message: "Alumnos encontrados",
                    data: alumnos
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    Message: "No se encontraron alumnos"
                });
            }
        }) //cierra then
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status:500,
                    Message: "Error detectado"})
        }); //cierra catch
    },//Cierra controller alumnos

    // Encontrar un alumno por identificacion
    alumno: function(req, res){

        var params = req.params;
        console.log(params)
        var n_cuenta = params.n_cuenta;

        console.log(n_cuenta)
        Alumnos.findOne({n_cuenta : parseInt(n_cuenta)}) 
        .then(alumno => {
            // Verificar si hay alumnos
            if (alumno) {
                console.log(alumno);
                return res.status(200).send({
                    status: 200,
                    Message: "Alumno encontrado",
                    data: alumno
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    Message: "No se encontro el alumno"
                });
            }
        }) //cierra then
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status:500,
                    Message: "Error detectado"})
        }); //cierra catch
    },//Cierra controller alumno

    alumnoId: function(req, res){
        var params = req.params;
        console.log(params)
        var n_cuenta = params.n_cuenta;
        console.log(n_cuenta)

        Alumnos.findOne({n_cuenta : parseInt(n_cuenta)}) 
        .then(alumno => {
            // Verificar si hay alumnos
            if (alumno) {
                console.log(alumno);
                return res.status(200).send({
                    status: 200,
                    Message: "Alumno encontrado",
                    data: alumno
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    Message: "No se encontro el alumno"
                });
            }
        }) //cierra then
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status:500,
                    Message: "Error detectado"})
        }); //cierra catch
    }, // Cierra controller alumno

   


    crear_alumno: function (req, res) {
            // VALIDAMOS LOS DATOS QUE SE ENVÍAN AL ENDPOINT 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: errors.array()
                });
            }
    
            let user_info = req.body;
            console.log(user_info);
    
            // Verificar si ya existe un alumno con el mismo número de cuenta
            Alumnos.findOne({ n_cuenta: user_info.n_cuenta })
                .then(existingAlumno => {
                    if (existingAlumno) {
                        return res.status(409).json({
                            status: 409,
                            message: "Ya existe un alumno con este número de cuenta"
                        });
                    }

                    // Si no existe un alumno con el mismo número de cuenta, proceder a guardar el nuevo alumno
                    let alumnos_model = new Alumnos({
                        n_cuenta: user_info.n_cuenta,
                        nombre: user_info.nombre,
                        edad: user_info.edad,
                        genero: user_info.genero
                    });

                    return alumnos_model.save();
                })
                .then(alumnosStored => {
                    // Verificar si hay alumnos almacenados
                    if (alumnosStored) {
                        console.log(alumnosStored);
                        return res.status(200).json({
                            status: 200,
                            message: "Usuario almacenado",
                            data: alumnosStored
                        });
                    } else {
                        return res.status(404).json({
                            status: 404,
                            message: "No se logró almacenar el alumno"
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    return res.status(500).json({
                        status: 500,
                        message: "Error al intentar almacenar el alumno"
                    });
                });
        }, 


        update_alumno: function(req, res){
                // VALIDAMOS LOS DATOS QUE SE ENVÍAN AL ENDPOINT 
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        status: 400,
                        errors: errors.array()
                    });
                }

                let user_info = req.body;
                console.log(user_info);

                var params = req.params;
                console.log(params)
                var n_cuenta = params.n_cuenta;
                console.log(n_cuenta);

                let alumnos_info_update = {
                    nombre: user_info.nombre,
                    edad: user_info.edad,
                    genero: user_info.genero
                };

                Alumnos.findOneAndUpdate({ n_cuenta: parseInt(n_cuenta) }, alumnos_info_update , { new: true })
                .then(alumno_update => {
                    // Verificar si hay alumnos
                    if (alumno_update) {
                        console.log(alumno_update);
                        return res.status(200).send({
                            status: 200,
                            Message: "Alumno actualizado",
                            data: alumno_update,
                          
                        });
                    } else {
                        return res.status(404).send({
                            status: 404,
                            Message: "Alumno no encontrado, no actualizado"
                        });
                    }
                }) //cierra then
                    .catch(error => {
                        console.log(error)
                        return res.status(500).send({
                            status:500,
                            Message: "Error detectado en la actualización"})
                }); //cierra catch

        },//Cierre update_alumno
        
     delete_alumno : function(req, res){
        var params = req.params;
        console.log(params)
        var n_cuenta = params.n_cuenta;
        console.log(n_cuenta);

        Alumnos.findOneAndDelete({ n_cuenta: parseInt(n_cuenta) })
                .then(alumno_delete => {
                    // Verificar si hay alumnos
                    if (alumno_delete) {
                        console.log(alumno_delete);
                        return res.status(200).send({
                            status: 200,
                            Message: "Alumno Elimanado",
                            data: alumno_delete,
                          
                        });
                    } else {
                        return res.status(404).send({
                            status: 404,
                            Message: "Alumno no encontrado, no elimando"
                        });
                    }
                }) //cierra then
                    .catch(error => {
                        console.log(error)
                        return res.status(500).send({
                            status:500,
                            Message: "Error detectado en la eliminación de alumno"})
                }); //cierra catch





     } // Cierre delete alumno

}; // Cierra controller
module.exports = controller;
'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator')



var WelcomeController = require('../controllers/welcome');

// CONSTANTE DEL MIDDLEWARE
let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get('/', WelcomeController.welcome);

/*api.get('/alumnos' , WelcomeController.alumnos);
api.get('/alumno' , WelcomeController.alumno);

api.post('/alumno', WelcomeController.crear_alumno);
api.put('/alumno', WelcomeController.actualizar_alumno);
api.delete('/alumno', WelcomeController.eliminar_alumno);*/

var AlumnosController = require('../controllers/alumnosController')
api.get('/alumnos',   AlumnosController.alumnos),
//api.get('/alumnos/:n_cuenta',   AlumnosController.alumno)
api.get('/alumnos/:n_cuenta',   AlumnosController.alumnoId)
api.post('/alumno', userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno); // CREAR ALUMNO

api.put('/alumno/:n_cuenta',[
    //body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno); // ACTUALIZAR ALUMNO


api.delete('/alumno/:n_cuenta', AlumnosController.delete_alumno); // ACTUALIZAR ALUMNO

/*---------------------------------------------------------------*/




let AuthController = require ('../controllers/auth')
api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
      
], AuthController.login)

api.post("/logout", userProtectUrl, AuthController.logout)



module.exports = api;
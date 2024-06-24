'use strict'
var controller = {
    welcome: function(req,res){
        console.log("GET ejecutado en raiz en controlador welcome") //SERVIDOR EN CONSOLA
        res.send("Mi primer endpoint en controlador Welcome"); // AL CLIENTE
    }
    
    
    /*alumnos: function(req, res){
        res.send("Mi listado de alumnos desde el controlador alumnos"); 
    },
    alumno: function(req, res){
        let calf1=10;
        let calf2 = 1;
        let calf3 =5;
        let final = (calf1+calf2+calf3)/3
        console.log(final);
        //res.send("La calificacion final es: "+ final );
        if (final <= 6){
            return res.status(400).json({
                status: 400,
                cal_final: final
            })// Todo fue correcto
        }
        else{
            return res.status(200).json({
                status: 200,
                cal_final: final
            })// Todo fue correcto

        }
       

    },
    crear_alumno:function(req, res){

        let user_info = req.body;
        console.log(user_info)
        //res.send("Creamos un alumno desde el controlador ==> " + user_info.nombre  + " edad ==> " + user_info.edad)
        // Informacion  que muestra
        return res.status(200).json({
            status: 200,
            nombre_de_alumno: user_info.nombre + " " + user_info.apellido, 
            edad: user_info.edad
        });
    },


    actualizar_alumno:function(req, res){
        res.send("Actualizamos un alumno desde el controlador")

    },
    eliminar_alumno:function(req, res){
        res.send("Eliminar un alumno desde el controlador")

    }*/
};

//Exportar
module.exports = controller;

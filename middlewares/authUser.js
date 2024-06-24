'use strict'

const jwt = require ('jsonwebtoken')
let Sessions = require('../models/sessions')
const middlewares = {
    userProtectUrl : function(req, res, next){
        const token  = req.headers ['access-token'];
        if (token){
            jwt.verify(token, 'estaesmiprimerallaveparaeltoken123456', (err, decoded) =>{
                if(err){
                    return res.status(403).json({ message: "Token inválido" });
                } else {
                    console.log("Token válido desde el middleware")
                    req.decoded = decoded;
                    Sessions.findOne({ user_id: req.decoded.user_id, jwt: token }).then(session => {
                        if (!session) return res.status(404).send({ message: "Los datos de autenticación no son válidos" });
                        next();
                    }).catch(err => {
                        console.error(err);
                        return res.status(500).send({ message: "Error al devolver los datos" });
                    });
                    
    
        
                }
            });
        }
        else{
            res.status(403).send({
                message: "Token no válido"
            })
        }

    }
};

module.exports = middlewares;

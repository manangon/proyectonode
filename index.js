const express = require('express');
const app = express();
const port = 3000;

app.get('/' , (req, res)=> {
    console.log("GET ejecutado en raiz") //SERVIDOR EN CONSOLA
    res.send("Mi primer endpoint"); // AL CLIENTE
});

app.get('/alumnos' , (req, res)=> {
    res.send("Mi listado de alumnos"); // AL CLIENTE
});

app.get('/alumno' , (req, res)=> {
    let calf1=10;
    let calf2 = 9;
    let calf3 =8;
    let final = (calf1+calf2+calf3)/3
    res.send("La calificacion final es: "+ final ); // AL CLIENTE
});

app.post('/alumno', (req ,res) =>{
    res.send("Creamos un alumno")
});


app.put('/alumno', (req ,res) =>{
    res.send("Actualizamos un alumno")
});


app.delete('/alumno', (req ,res) =>{
    res.send("Elimanamos un alumno")
});

app.listen(port, () => {
    console.log("Servidor de ejemplo ejecutando en "+ port);
    
});


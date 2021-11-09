const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, ()=> {console.log("Puerto conectado de pana")});

app.use(express.static("assets"));

app.use("/abracadabra/juego/:nombre", (req, res, next) =>{
    const {usuarios} = JSON.parse(fs.readFileSync("usuarios.json"))
    //console.log(usuarios)
    const nombre = req.params.nombre
    if(usuarios.some(u => u==nombre)){
        console.log(`${nombre} pertenece a los usuarios`)
        next()
    }else{
        res.sendFile(__dirname + "/assets/who.jpeg")
        console.log("El nombre ingresado no corresponde a los usuarios registrados anteriormente. Por favor, intentalo nuevamente")
    }
});

app.get("/abracadabra/juego/:nombre", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
});
app.get("/usuarios", (req, res) =>{
    res.sendFile(__dirname + "/usuarios.json")
});

app.get("/abracadabra/conejo/:numero", (req, res) =>{
    const n = Math.floor(Math.random() * (4 - 1)) + 1;
    const numero = req.params.numero;
    console.log(`El parametro ${n} coincide con el ${numero} generado de forma aleatoria`)
    if(numero == n){
        res.send('<img src="/conejito.jpg"/>');
        console.log("Aparecio el conejo, has ganado. Felicidades");
    }else{
        res.end('<img src="/voldemort.jpg"/>');
        console.log("Mala suerte, si gustas vuelve a intentarlo (:");
    }
});

app.get("*", (req, res) =>{
    res.end(`<p style="color: red"> Error al consultar esta direccion, no existe </p>`);
});
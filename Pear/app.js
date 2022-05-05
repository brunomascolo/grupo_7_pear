const express = require('express');
const path = require('path');

const app = express();


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath)); //esta linea le dice a express que queremos tener a la carpeta public como un recurso de archivos estaticos para que se puedan consumit 
//de manera sencilla

app.listen(3000, () => 
console.log("Servidor corriendo en el puerto 3000"));

app.get('/', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./views/home.html");
    res.sendFile(viewsPath);
})

app.get('/register', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./views/register.html");
    res.sendFile(viewsPath);
})

app.get('/login', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./views/login.html");
    res.sendFile(viewsPath);
})
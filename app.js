const express = require('express');
const path = require('path');

const app = express();


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath)); //esta linea le dice a express que queremos tener a la carpeta public como un recurso de archivos estaticos para que se puedan consumit 
//de manera sencilla

app.listen(3000, () => 
console.log("Servidor corriendo en el puerto http://localhost:3000"));

app.get('/', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./src/views/index.html");
    res.sendFile(viewsPath);
})

app.post("/", function(req, res){
    res.sendFile(path.resolve(__dirname,"./src/views/index.html"))
})

app.get('/register', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./src/views/users/register.html");
    res.sendFile(viewsPath);
})

app.get('/login', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./src/views/users/login.html");
    res.sendFile(viewsPath);
})

app.get("/detail", (req, res) => {
  let viewsPath = path.resolve(__dirname, "./src/views/products/details.html");
  res.sendFile(viewsPath);
});

app.get('/shopping-cart', (req,res) => {
    let viewsPath = path.resolve(__dirname, "./src/views/users/shoppingcart.html");
    res.sendFile(viewsPath);
   
});

app.get("/products/create", (req, res) => {
    let viewsPath = path.resolve(__dirname, "./src/views/products/create.html");
    res.sendFile(viewsPath);
  });

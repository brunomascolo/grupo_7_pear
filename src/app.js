const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(methodOverride('_method')); 

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const userRouter = require("./routes/user");

app.use('/', mainRouter); //Rutas del menu principal
app.use('/products', productsRouter); // Rutas de los productos
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000")
})




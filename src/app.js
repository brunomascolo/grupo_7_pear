const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para que se usa??
app.use(express.json()); // Para traer información del body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const userRouter = require("./routes/user");

app.use('/', mainRouter); //Rutas del menu principal
app.use('/products', productsRouter); // Rutas de los productos
app.use('/user', userRouter);

// ************ Set the server to listen - (don't touch) ************
app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000")
})




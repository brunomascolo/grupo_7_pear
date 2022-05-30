const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath)); //esta linea le dice a express que queremos tener a la carpeta public como un recurso de archivos estaticos para que se puedan consumit 
//de manera sencilla
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src/views'));

const mainRouter = require(path.resolve(__dirname,"src/routes/main"));
const productRouter = require(path.resolve(__dirname,"src/routes/product"));
const userRouter = require(path.resolve(__dirname,"src/routes/user"));

app.listen(3000, () => 
console.log("Servidor corriendo en el puerto 3000"));

app.use('/', mainRouter);

app.post("/", function(req, res){
    res.sendFile(path.resolve(__dirname,"./src/views/index.html"))
})

app.use('/user',userRouter);


app.use("/products", productRouter);


const path = require('path');
const fs = require('fs');
const { equal } = require('assert');

/* const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8')); */

let db = require("../database/models");

const controladorProducts = {
    index: (req, res) => {
        //Listado de NFT desde la base de datos con sequelize
        let pedidoProducto = db.Product.findAll();

        let pedidoCreador = db.User.findAll();

        Promise.all([pedidoProducto, pedidoCreador])
            .then(function([products, creators]){
                
                res.render('products/products.ejs', {products: products, creators: creators})
            })

     //Listado de NFT desde un archibo JSON

       /*  const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let nftFiltrados = nft.filter(article => article.condition == 1)
        
        res.render('products/products.ejs', { nftFiltrados }) */
    },
    create: (req, res) => {
        db.Category.findAll()
            .then(function(categories){
                return res.render("products/create.ejs", {categories: categories})
            })
        /* res.render('products/create.ejs') */
    },
    detail: (req, res) => {
        //obteniendo detalle desde la base de datos
        console.log(req.params.id);
        db.Product.findByPk(req.params.id, {include: ["creator", "category"]} )
        .then (function(product){
            
            res.render('products/details', {product: product});

        })



       /*  // entrega de datos de detalle co el json
        let nftDetail = nft.find(nft => req.params.id == nft.id)
        if(nftDetail.condition == 0){
            res.render('products/404')
        }else{
        res.render('products/details', { nftDetail: nftDetail })
        } */
    },

    edit: (req, res) => {
        let pedidoProducto = db.Product.findByPk(req.params.id);

        let pedidoCreador = db.User.findAll();
        let pedidoCategoria = db.Category.findAll();

        Promise.all([pedidoProducto, pedidoCreador, pedidoCategoria])
            .then(function([product, creator, category]){
                res.render("products/edit", {product: product, creator: creator, category: category});
            })


        /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let id = req.params.id
        let productToEdit = nft.find(article => article.id == id)
        res.render('products/edit', { productToEdit }) */
    },
    update: (req, res) => {
        
        db.Product.update({
            name: req.body.name,
            id_category: req.body.category,
            image: req.file == undefined ? "/img/images/default.jpg" : "/img/images/" + req.file.filename,
            url: req.body.url,
            cid: req.file == undefined ? req.body.name : req.file.filename,
            price: req.body.priceeth,
            description: req.body.description,
            id_creator: 1,
            state: 1
            
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            
            res.redirect("/products")

        })
        .catch(error => res.send(error))



        //Hay campos como el autor, el price en usd y el rating que no deben modificarse.
       /*  const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
		let productToEdit = products.find(product => product.id == req.params.id)
        let editedProduct = {
			id: productToEdit.id,
			name: req.body.name,
            author: productToEdit.author,
            category: req.body.category == "" ? productToEdit.category : req.body.category,
			priceeth: req.body.priceeth,
            priceusd: productToEdit.priceusd,
			url: req.body.url,
            rating: productToEdit.rating,
			description: req.body.description,
            condition: productToEdit.condition,
            img: req.file == undefined ? productToEdit.img : "/img/images/" + req.file.filename
		}
		let indice = products.findIndex(product => product.id == req.params.id);
		products[indice] = editedProduct;
		fs.writeFileSync(nftFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products"); */
    },
    store: (req, res) => {
        //creacion del NFT en la base de datos
        
        db.Product.create({
            name: req.body.name,
            id_category: req.body.category,
            image: req.file == undefined ? "/img/images/default.jpg" : "/img/images/" + req.file.filename,
            url: req.body.url,
            cid: req.file == undefined ? req.body.name : req.file.filename,
            price: req.body.priceeth,
            description: req.body.description,
            id_creator: 1,
            state: 1
            
        })
        .then(() => {
            
            res.redirect("/products")

        })
        .catch(error => res.send(error))


        //El if lo utilizaremos para rescatar errores. Por el momento no se exigen validaciones, simplemente lo cargo vacio y con una imagen por defecto
            
            // Creacion de datos a una estructura JSON
            /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
            let newNFT = {
                id: nft[nft.length - 1].id + 1,
                name: req.body.name,
                author: "defaultAuthor",
                category: req.body.category,
                priceeth: req.body.priceeth,
                priceusd: req.body.priceeth,
                url: req.body.url,
                rating: "0/5",
                description: req.body.description,
                condition: 1,
                img: req.file == undefined ? "/img/images/default.jpg" : "/img/images/" + req.file.filename
            }
            nft.push(newNFT);
            fs.writeFileSync(nftFilePath, JSON.stringify(nft, null, " "));
            res.redirect("/products") */
    },
    disable: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            
            res.redirect("/products");

        })
        .catch(error => res.send(error))
        



        /* const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
		let productToEdit = products.find(product => product.id == req.params.id)
        let editedProduct = {
			id: productToEdit.id,
			name: productToEdit.name,
            author: productToEdit.author,
            category: productToEdit.category,
			priceeth: productToEdit.priceeth,
            priceusd: productToEdit.priceusd,
			url: productToEdit.url,
            rating: productToEdit.rating,
			description: req.body.description,
            condition: 0,
            img: productToEdit.img
		}
		let indice = products.findIndex(product => product.id == req.params.id);
		products[indice] = editedProduct;
		fs.writeFileSync(nftFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products"); */
    }
}

module.exports = controladorProducts;
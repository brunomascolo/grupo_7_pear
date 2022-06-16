const path = require('path');
const fs = require('fs');
const { equal } = require('assert');

const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));



const controladorProducts = {
    index: (req, res) => {
        const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let nftFiltrados = nft.filter(article => article.condition == 1)
        res.render('products/products.ejs', { nftFiltrados })
    },
    create: (req, res) => {
        res.render('products/create.ejs')
    },
    detail: (req, res) => {
        let nftDetail = nft.find(nft => req.params.id == nft.id)
        res.render('products/details', { nftDetail: nftDetail })
    },

    edit: (req, res) => {
        const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let id = req.params.id
        let productToEdit = nft.find(article => article.id == id)
        res.render('products/edit', { productToEdit })
    },
    update: (req, res) => {
        //Hay campos como el autor, el price en usd y el rating que no deben modificarse.
        const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
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
		res.redirect("/products");
    },
    store: (req, res) => {
        //El if lo utilizaremos para rescatar errores. Por el momento no se exigen validaciones, simplemente lo cargo vacio y con una imagen por defecto
            const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
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
            res.redirect("/products")
    },
    disable: (req, res) => {
        const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
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
		res.redirect("/products");
    }
}

module.exports = controladorProducts;
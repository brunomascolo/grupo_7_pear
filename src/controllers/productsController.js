const path = require('path');
const fs = require('fs');
const { equal } = require('assert');

const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));



const controladorProducts = {
    index: (req, res) => {
        const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        res.render('products/products.ejs', { nft })
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
        const products = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
		let productToEdit = products.find(product => product.id == req.params.id)
        let editedProduct = {
			id: req.params.id,
			name: req.body.name,
            author: productToEdit.author,
            category: req.body.category,
			priceeth: req.body.priceeth,
            priceusd: productToEdit.priceusd,
			url: req.body.url,
            rating: productToEdit.rating,
			description: req.body.description,
			img: productToEdit.img
		}
		let indice = products.findIndex(product => product.id == req.params.id);
		products[indice] = editedProduct;
		fs.writeFileSync(nftFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products");
        /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        res.render('products/products.ejs', { nft }) */
    },
    store: (req, res) => {
        if (req.file) {
            const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
            let newNFT = {
                id: nft[nft.length - 1].id + 1,
                name: req.body.name,
                author: "defaultAuthor",
                category: req.body.category,
                priceeth: req.body.priceeth,
                priceusd: req.body.priceeth,
                url: req.body.url,
                rating: "5/5",
                description: req.body.description,
                img: "/img/images/" + req.file.filename
            }
            nft.push(newNFT);
            fs.writeFileSync(nftFilePath, JSON.stringify(nft, null, " "));
            res.redirect("/products")
        } else {
            res.render('products/create.ejs')
        }
    }
}

module.exports = controladorProducts;
const path = require('path');
const fs = require('fs');

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
        let productToEdit = nft.find(nft => nft.id == id)
        res.render('products/edit', { productToEdit })
    },
    update: (req, res) => {
        const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        let productToEdit = nft.find(product => product.id == req.params.id)
        let editedProduct = {
            id: req.params.id,
            name: req.body.nombrenft,
            category: req.body.categoria,
            priceEth: req.body.precioeth,
            url: req.body.url,
            description: req.body.descripcion,
            img: productToEdit.img
        }
        let indice = nft.findIndex(product => product.id == req.params.id);
        nft[indice] = editedProduct;
        fs.writeFileSync(nftFilePath, JSON.stringify(nft, null, " "));
        res.redirect("/products")
        /* const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
        res.render('products/products.ejs', { nft }) */
    },
    store: (req, res) => {
        if (req.file) {
            const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
            let newNFT = {
                id: nft[nft.length - 1].id + 1,
                name: req.body.nombrenft,
                author: "defaultAuthor",
                category: req.body.categoria,
                priceEth: req.body.precioeth,
                priceUSD: req.body.precioeth,
                url: req.body.url,
                rating: "5/5",
                description: req.body.descripcion,
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
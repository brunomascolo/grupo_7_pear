const path = require('path');
const fs = require('fs');

const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));


const controladorProducts = {
    index: (req, res)=>{
        const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
		res.render('products/products.ejs', { nft })
    },
    create: (req,res)=>{
        res.render('products/create.ejs')
    }, 
    detail: (req,res)=>{
        let nftDetail = nft.find(nft => req.params.id == nft.id)
        res.render('products/details',{nftDetail:nftDetail})
    },
    edit:(req, res) => {
		const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));
		let id = req.params.id
		let productToEdit = nft.find(nft => nft.id == id)
		res.render('products/edit', { productToEdit })

    }
}

module.exports = controladorProducts;
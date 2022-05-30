const path = require('path');
const publicPath = path.resolve(__dirname, "./public")
const express = require ('express');
const app = express();
const fs = require('fs');

const nftFilePath = path.join(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));


const controladorProduct = {
    create: (req,res)=>{
        res.render('products/create')
    }, 
    detail: (req,res)=>{
        let nftDetail = nft.find(nft => req.params.id == nft.id)
        res.render('products/details',{nftDetail:nftDetail})
    }
}

module.exports = controladorProduct;
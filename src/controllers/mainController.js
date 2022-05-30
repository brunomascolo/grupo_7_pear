const path = require('path');
const publicPath = path.resolve(__dirname, "./public")
const express = require ('express');
const app = express();
const fs = require('fs');

app.use(express.static(publicPath))
const nftFilePath = path.resolve(__dirname, '../data/nft.json');
const nft = JSON.parse(fs.readFileSync(nftFilePath, 'utf-8'));

const controladorMain ={
    index: (req,res)=>{
        res.render('index', {nft:nft})
    },
    cart:(req,res)=>{
        res.render('users/shoppingcart', {nft:nft})
    }
}

module.exports = controladorMain;
const path = require('path');
const publicPath = path.resolve(__dirname, "./public")
const express = require ('express');
const app = express();

const controladorUser = {
    login: (req,res) => {
        res.render('users/login.ejs')
    },
    register:(req,res) => {
        res.render('users/register.ejs')
    }
}

module.exports = controladorUser;
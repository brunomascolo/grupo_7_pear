const path = require('path');
const fs = require('fs');


const controladorUser = {
    login: (req,res) => {
        res.render('users/login.ejs')
    },
    register:(req,res) => {
        res.render('users/register.ejs')
    }
}

module.exports = controladorUser;
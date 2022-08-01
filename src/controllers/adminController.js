const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const bcrypt = require('bcryptjs');
const session = require('express-session');
let db = require("../database/models");
const { send } = require('process');


const controladorAdmin = {
    login: (req, res) => {
        res.render('admin/login.ejs')
    },
    loginProcess: (req, res) => {

        let totalUserEnable = db.User.count({ where: { user_state: 1 } })
            .then((totalUserEnable) => {
                return totalUserEnable
            })

        let totalUserDisable = db.User.count({ where: { user_state: 0 } })
            .then((totalUserDisable) => {
                return totalUserDisable
            })

        let totalProduct = db.Product.count({ where: { state: 1 } })
            .then((totalProduct) => {
                return totalProduct
            })
        let userToLogin = db.User.findOne({ where: { email: req.body.email } })

            .then((user) => {
                if (user.id_rol == 1) {
                    if (user) {
                        let contraseñaCorrecta = bcrypt.compareSync(req.body.password, user.password);
                        if (contraseñaCorrecta) {
                            req.session.userLogged = user;
                            console.log(totalUserEnable);
                            Promise.all([totalUserEnable, totalUserDisable, totalProduct])
                                .then(function ([totalUserEnable, totalUserDisable, totalProduct]) {
                                    res.render("admin/profileAdmin", { totalUserEnable, totalUserDisable, totalProduct })
                                })
                        }
                    }
                } else {
                    res.render('users/login.ejs')
                }
                /* return res.render('admin/login.ejs', {
                    errors: {
                        email: {
                            msg: "Datos de usuario incorrectos"
                        }
                    }
                }) */
            })
    },
    profile: (req, res) => {
        res.render('admin/profileAdmin.ejs', { user: req.session.userLogged })
    }
}
module.exports = controladorAdmin;
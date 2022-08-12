const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const bcrypt = require('bcryptjs');
const session = require('express-session');
/* const usersFilePath = path.join(__dirname, '../data/Users.json');
const user = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); */
let db = require("../database/models");
const { default: Swal } = require('sweetalert2');

const controladorUser = {
    login: (req,res) => {
        res.render('users/login.ejs')
    },
    loginProcess: (req, res)=>{

        let userToLogin = db.User.findOne({where: {email: req.body.email}})
        .then((user)=>{
            if(user){
                let contraseñaCorrecta = bcrypt.compareSync(req.body.password, user.password);
                if(contraseñaCorrecta){
                    /* delete userToLogin.password */
                    req.session.userLogged = user;
                    return res.redirect("/user/profile")
                }
            }
            return res.render('users/login.ejs', {
                errors: {
                    email: {
                        msg: "Datos de usuario incorrectos"
                    }
                }
            }) 
        })
        /* let findUser = function(field, text){
            let usuarioBuscado = user.find(oneUser => oneUser[field] === text)
            return usuarioBuscado};
        let userToLogin = findUser("email", req.body.email);
        if(userToLogin){
            let contraseñaCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(contraseñaCorrecta){
                /* delete userToLogin.password; */
                /*
                req.session.userLogged = userToLogin;
                return res.redirect("/user/profile")
            }
        }               
        return res.render('users/login.ejs', {
            errors: {
                email: {
                    msg: "Datos de usuario incorrectos"
                }
            }
        }) 
        */
    },

    profile: (req, res)=>{
        res.render('users/profile.ejs', {user: req.session.userLogged})
 },

    register:(req,res) => {
        res.render('users/register.ejs')
    },
    store:(req,res) =>{
        const newEmail = db.User.findOne({where: {email: req.body.email}})
        const newUser = db.User.findOne({where: {username : req.body.username}})
        Promise.all([newEmail, newUser])
        .then(function(user, email){
            if(email != null || email != undefined || email != ""){            
                return res.render('users/register.ejs', {
                    errors: {
                        email: {
                            msg: "El correo registrado ya esta en uso."
                        }
                    }
                })
            } else {
                if(user != null || user != undefined || user != ""){            
                    return res.render('users/register.ejs', {
                        errors: {
                            username: {
                                msg: "El usuario ingresado ya esta en uso."
                            }
                        }
                    })
                }
            }
            if(req.body.password != req.body.repeatPassword){
                return res.render('users/register.ejs', {
                    errors: {
                        password: {
                            msg: "Las contraseñas no coinciden."
                        }
                    }
                })
            }
            else{
                let user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password,10),
                    profile_image: req.file == undefined ? "default_user.jpg" : req.file.filename,
                    user_state: 1,
                    id_rol: 2
                }
                db.User.create(user)
               
            }
            res.redirect("/user/login")      
    
        })
        .catch(error => res.send(error))
        

        /* const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let findUser = function(field, text){
            let usuarioBuscado = user.find(oneUser => oneUser[field] === text)
            return usuarioBuscado};
        let userToLogin = findUser("email", req.body.email)
        if(userToLogin){
            return res.render('users/register.ejs', {
                errors: {
                    email: {
                        msg: "El correo registrado ya esta en uso."
                    }
                }
            })
        }
        if(req.body.password != req.body.repeatPassword){
            return res.render('users/register.ejs', {
                errors: {
                    password: {
                        msg: "Las contraseñas no coinciden."
                    }
                }
            })
        }
        else{
            let newUser = {
                id: users[users.length - 1].id + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                category: "user",
                image: req.file == undefined ? "/img/images/users/default_user.jpg" : "/img/images/users/" + req.file.filename
            }
            
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        res.redirect("/user/login")
    
        } */
    },

    logout: (req, res)=>{
        req.session.destroy();
        return res.redirect("/");
    }, 

    edit: (req,res)=>{
        res.render('users/edit.ejs', {user: req.session.userLogged})
    }, 

    update: (req,res)=>{
        let user = req.session.userLogged
        console.log(user.id)
        
        db.User.update({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         profile_image: req.file == undefined ? user.profile_image : req.file.filename,
         user_state: 1,
         id_rol: 2
        },{
            where: {id: user.id}
        })
        .then(() => {

            req.session.destroy();
            res.redirect("/user/login")

        })
        .catch(error => res.send(error))
    },
    list: (req, res) => {
        db.User.findAll()
            .then(function (users) {
                res.render('users/users.ejs', { users: users })
            })
    }
}

module.exports = controladorUser;
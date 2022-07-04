const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const usersFilePath = path.join(__dirname, '../data/Users.json');
const user = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controladorUser = {
    login: (req,res) => {
        res.render('users/login.ejs')
    },
    loginProcess: (req, res)=>{
        let findUser = function(field, text){
            let usuarioBuscado = user.find(oneUser => oneUser[field] === text)
            return usuarioBuscado};
        let userToLogin = findUser("email", req.body.email);
        if(userToLogin){
            let contraseñaCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(contraseñaCorrecta){
                /* delete userToLogin.password; */
                req.session.userLogged = userToLogin;
                return res.redirect("/user/profile")
            }
        };
               
        return res.render('users/login.ejs', {
            errors: {
                email: {
                    msg: "Datos de usuario incorrectos"
                }
            }
        })
    },

    profile: (req, res)=>{
        res.render('users/profile.ejs', {user: req.session.userLogged})
    },

    register:(req,res) => {
        res.render('users/register.ejs')
    },
    store:(req,res) =>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
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
        }else{
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
    
        }
    },

    logout: (req, res)=>{
        req.session.destroy();
        return res.redirect("/");
    }
}

module.exports = controladorUser;
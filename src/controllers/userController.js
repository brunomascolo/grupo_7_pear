const path = require('path');
const fs = require('fs');
const { equal } = require('assert');

const usersFilePath = path.join(__dirname, '../data/Users.json');
const user = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controladorUser = {
    login: (req,res) => {
        res.render('users/login.ejs')
    },
    register:(req,res) => {
        res.render('users/register.ejs')
    },
    store:(req,res) =>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            let newUser = {
                id: users[users.length - 1].id + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                category: "user",
                image: req.file == undefined ? "/img/images/default.jpg" : "/img/images/" + req.file.filename
            }
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
            res.redirect("/user/login")
    }
}

module.exports = controladorUser;
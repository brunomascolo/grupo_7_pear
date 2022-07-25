let db = require("../database/models");
let categoriesController = {
    list: function(req, res) {
        db.Category.findAll()
            .then(function(categories){
                res.send(categories)
            })
    },
    listar: function(req, res) {
        db.User.findAll()
            .then(function(categories){
                res.send(categories)
            })
    },
    listarProd: function(req, res) {
        db.Product.findAll()
            .then(function(categories){
                res.send(categories)
            })
    },
    listarRol: function(req, res) {
        db.Role.findAll()
            .then(function(categories){
                res.send(categories)
            })
    }
}
module.exports = categoriesController;
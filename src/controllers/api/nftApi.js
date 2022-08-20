const db = require("../../database/models");

const nftAPIController = {
    'list': (req, res) => {
        db.Product.findAll({
            limit: 3,
            include: ['category'],
            attributes: ['id','name','image','price','description'], //Oculto datos como creador, estado, y quien creo el producto
            order: [['id','DESC']]
        })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: 'api/nft'
                    },
                    data: product
                }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include : ['category'],
                attributes: ['id','name','image','price','description'] //Oculto datos como creador, estado, y quien creo el producto

            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/nft/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            });
    }
}

module.exports = nftAPIController;
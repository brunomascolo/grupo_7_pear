function authAdminMiddleware(req, res, next){
    if (!req.session.userLogged){
        return res.redirect("/admin/login");
    }
    next();
}

module.exports = authAdminMiddleware;
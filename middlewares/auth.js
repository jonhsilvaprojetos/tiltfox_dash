function userAuth(req, res, next){
    if(req.session.user != undefined){
        next();
    }else{
        req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Faça login para acessar esta página</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
        res.redirect("/");
    }
}

module.exports = userAuth;
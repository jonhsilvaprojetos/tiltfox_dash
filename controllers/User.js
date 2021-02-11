const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {

    renderLogin(req, res){
        if(req.session.msg){
            let msg = req.session.msg;
            delete req.session.msg;
            return res.render("index", {msg: msg});
        }else{
            return res.render("index");
        }
    },

    authenticate(req, res){
        let email = req.body.email;
        let password = req.body.password;
    
        User.findOne({email: email}).then(user => {
            if(user){
                let correct = bcrypt.compareSync(password, user.password);
                
                if(user.status != 0){
                    if(correct){
                        req.session.user = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            access_level: user.access_level
                        }
                        res.redirect("/panel");
                    }else{
                        req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Senha inválida, verifique seus dados</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                        res.redirect("/");
                    }
                }else{
                    req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Aguarde, Conta aguardando liberação</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                    res.redirect("/");
                }
                
    
            }else{
                req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Nenhum cadastro com este e-mail</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                res.redirect("/");
            }
    
        }).catch(error => {
            req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Houve um erro ao logar, tente novamente</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
            res.redirect("/");
        })
    },

    renderRegister(req, res){
        if(req.session.msg){
            let msg = req.session.msg;
            delete req.session.msg;
            return res.render("user/register", {msg: msg});
        }else{
            return res.render("user/register");
        }
    },

    saveRegister(req, res){
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
    
        User.findOne({email: email}).then(user => {
            if(!user){
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
    
                User.create({
                    name: name,
                    email: email,
                    password: hash
                }).then((user) => {
                    req.session.msg = '<div class="alert alert-success mt-2" role="alert"><i class="feather icon-check-circle mr-1 align-middle"></i><span>Cadastro realizado com sucesso</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                    return res.redirect("/");
    
                }).catch(error => {
                    req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Houve um erro ao cadastrar</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                    return res.redirect("/register");
                });
    
            }else{
                req.session.msg = '<div class="alert alert-warning mt-2" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Este e-mail já está sendo utilizado</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                return res.redirect("/register");
            }
        });
    },

    logout(req, res){
        req.session.destroy((erro) => {
            req.session = null;
            return res.redirect("/");    
        })
    }
}
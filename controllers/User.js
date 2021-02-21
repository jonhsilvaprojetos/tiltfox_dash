const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const Department = require("../models/Department");

module.exports = {

    renderLogin(req, res){
        if(req.session.msg){
            let msg = req.session.msg;
            delete req.session.msg;
            return res.render("user/login", {
                msg: msg,
                config: {
                    page_class: "login-page", 
                    title: "Tilt Fox E-sports - Login", 
                    css_file: null, 
                    script_file:"login.js"
                }
            });
        }else{
            return res.render("user/login", {
                config: {
                    page_class: "login-page", 
                    title: "Tilt Fox E-sports - Login", 
                    css_file: null, 
                    script_file:"login.js"
                }
            });
        }
    },

    renderRegister(req, res){
        if(req.session.msg){
            let msg = req.session.msg;
            delete req.session.msg;
            return res.render("user/register", {
                msg: msg,
                config: {
                    page_class: "registe-page", 
                    title: "Tilt Fox E-sports - Cadastro", 
                    css_file: null, 
                    script_file:"register.js"
                }
            });
        }else{
            return res.render("user/register", {
                config: {
                    page_class: "registe-page", 
                    title: "Tilt Fox E-sports - Cadastro", 
                    css_file: null, 
                    script_file:"register.js"
                }
            });
        }
    },
    // FINAL RENDER SCREENS


    // BUSINES RULES
    async authenticate(req, res){
        let {email, password} = req.body;

        let findUser = await User.findOne({email}).populate(["team", "department", "score"]);
        
        if(findUser){
            let correct = bcrypt.compareSync(password, findUser.password);
            if(findUser.status != 0){
                if(correct){
                    req.session.user = {
                        _id: findUser._id,
                        name: findUser.nickname,
                        email: findUser.email,
                        route: findUser.route,
                        elo: findUser.elo,
                        team: findUser.team,
                        department: findUser.department,
                        score: findUser.score
                    }
                    res.redirect("/panel");

                } else{
                    req.session.msg = '<div class="alert alert-warning mt-5" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Senha inválida, verifique seus dados</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                    res.redirect("/login");
                }

            } else{
                req.session.msg = '<div class="alert alert-warning mt-5" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Aguardando liberação, solicite a administração</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                res.redirect("/login");
            }
            
        } else{
            req.session.msg = '<div class="alert alert-warning mt-5" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Nenhum registro foi encontrado</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
            res.redirect("/login");
        }
    },

    async saveRegister(req, res){
        let { nickname, email, password, route, elo } = req.body;
        let teamName = req.body.team;
        let findTeam = await Team.findOne({name: teamName});
        let department = await Department.findOne({name: "Jogador"});
        
        let findUser = await User.findOne({email});

        if(!findUser){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            try {

                await User.create({
                    nickname,
                    email,
                    password: hash,
                    route,
                    elo,
                    team: findTeam._id,
                    department: department._id,
                    
                });

                req.session.msg = '<div class="alert alert-success mt-5" role="alert"><i class="feather icon-check-circle mr-1 align-middle"></i><span>Cadastro realizado, aguarde a liberação</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                return res.redirect("/login");

            } catch (error) {
                req.session.msg = '<div class="alert alert-warning mt-5" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Houve um erro ao cadastrar</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
                return res.redirect("/register");
            }
        }

        req.session.msg = '<div class="alert alert-warning mt-5" role="alert"><i class="feather icon-alert-triangle mr-1 align-middle"></i><span>Este e-mail já está sendo utilizado</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="feather icon-x-circle"></i></span></button></div>';
        return res.redirect("/register");

    },

    async logout(req, res){
        req.session.destroy((erro) => {
            req.session = null;
            return res.redirect("/");    
        })
    }
}
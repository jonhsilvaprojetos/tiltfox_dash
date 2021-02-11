const express = require("express");
const router = express.Router();
const userAuth = require('../middlewares/auth');
const UserController = require('../controllers/User');


// Users Routes
// -> [GET]
router.get("/register", UserController.renderRegister);
router.get("/login", UserController.renderLogin);
router.get("/logout", UserController.logout);
// -> [POST]
router.post("/register/save", UserController.saveRegister);
router.post("/authenticate", UserController.authenticate);



// Main Router
router.get("/", (req, res) => {
    res.render("index", {
        config: {
            page_class: "inital-page", 
            title: "TiltFox Team", 
            css_file: "main.css", 
            script_file:"main.js"
        }
    });
});

module.exports = router;
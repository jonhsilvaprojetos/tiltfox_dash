const express = require("express");
const router = express.Router();
const userAuth = require('../middlewares/auth');
const UserController = require('../controllers/User');
const DepartmentController = require('../controllers/Department');
const GameController = require('../controllers/Game');
const PlayerController = require('../controllers/Player');
const TeamController = require('../controllers/Team');
const EventController = require('../controllers/Event');
const ScoreController = require('../controllers/Score');


// Authenticate and Register Routes
router.get("/register", UserController.renderRegister);
router.get("/login", UserController.renderLogin);
router.get("/logout", UserController.logout);
router.post("/register/save", UserController.saveRegister);
router.post("/authenticate", UserController.authenticate);

// Players
router.get("/panel/player", PlayerController.list);
router.get("/panel/player/details/:id", PlayerController.details);
router.post("/panel/player/update/:id", PlayerController.update);
router.post("/panel/player/delete/:id", PlayerController.delete);

// Department
router.get("/panel/department", DepartmentController.list);
router.post("/panel/department", DepartmentController.create);
router.post("/panel/department/update:id", DepartmentController.update);
router.post("/panel/department/delete/:id", DepartmentController.delete);

// Game
router.get("/panel/game", GameController.list);
router.post("/panel/game", GameController.create);
router.post("/panel/game/update:id", GameController.update);
router.post("/panel/game/delete/:id", GameController.delete);

// Team
router.get("/panel/team", TeamController.list);
router.post("/panel/team", TeamController.create);
router.post("/panel/team/update/:id", TeamController.update);
router.post("/panel/team/delete/:id", TeamController.delete);

// Event
//router.get("/panel/event", userAuth, EventController.list);
//router.post("/panel/event", userAuth, EventController.create);
//router.post("/panel/event/update/:id", userAuth, EventController.update);
//router.post("/panel/event/delete/:id", userAuth, EventController.delete);



// Main Router
router.get("/", (req, res) => {
    res.render("index", {
        config: {
            page_class: "inital-page", 
            title: "Tilt Fox E-sports", 
            css_file: "main.css", 
            script_file:"main.js"
        }
    });
});


module.exports = router;
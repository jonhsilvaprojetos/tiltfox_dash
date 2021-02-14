const express = require("express");
const router = express.Router();
const userAuth = require('../middlewares/auth');
const UserController = require('../controllers/User');
const PlayerController = require('../controllers/Player');
const GameController = require('../controllers/Game');
const TeamController = require('../controllers/Team');
const DepartmentController = require('../controllers/Department');
const EventController = require('../controllers/Event');


// Authenticate and Register Routes
router.get("/register", UserController.renderRegister);
router.get("/login", UserController.renderLogin);
router.get("/logout", UserController.logout);
router.post("/register/save", UserController.saveRegister);
router.post("/authenticate", UserController.authenticate);

// Players
router.get("/panel/player", userAuth, PlayerController.list);
router.get("/panel/player/details/:id", userAuth, PlayerController.details);
router.post("/panel/player", userAuth, UserController.create);
router.post("/panel/player/update/:id", userAuth, UserController.update);
router.post("/panel/player/delete/:id", userAuth, UserController.delete);

// Game
router.get("/panel/game", userAuth, GameController.list);
router.post("/panel/game", userAuth, GameController.create);
router.post("/panel/game/update/:id", userAuth, GameController.update);
router.post("/panel/game/delete/:id", userAuth, GameController.delete);


// Team
router.get("/panel/team", userAuth, TeamController.list);
router.post("/panel/team", userAuth, TeamController.create);
router.post("/panel/team/update/:id", userAuth, TeamController.update);
router.post("/panel/team/delete/:id", userAuth, TeamController.delete);

// Department
router.get("/panel/department", userAuth, DepartmentController.list);
router.post("/panel/department", userAuth, DepartmentController.create);
router.post("/panel/department/update:id", userAuth, DepartmentController.update);
router.post("/panel/department/delete/:id", userAuth, DepartmentController.delete);

// Event
router.get("/panel/event", userAuth, EventController.list);
router.post("/panel/event", userAuth, EventController.create);
router.post("/panel/event/update/:id", userAuth, EventController.update);
router.post("/panel/event/delete/:id", userAuth, EventController.delete);



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


// 404 Not Found Page
app.use(function(req, res, next) {
    res.status(404).render("404", {
        config: {
            page_class: "not-found", 
            title: "Tilt Fox E-sports - Página não encontrada", 
            css_file: null, 
            script_file: null
        }
    });
});

module.exports = router;
const express = require('express');
const app = express();
const session = require("express-session");
const router = require("./routes/router");
const PORT = 3000 || process.env.PORT;

// Connection database
require("./database/connection");

// View Engine
app.set('view engine', 'ejs');

// Create Session
app.use(session({
    secret: "tiltfoxdash",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 172800000
    }
}));

// Static Files
app.use(express.static("public"));

// Response JSON
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Import Routes
app.use(router);


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

app.listen(PORT, () => {
    console.log(`Servidor online em: http://localhost:${PORT}`);
});
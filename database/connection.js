const mongoose = require("mongoose");
const DEV_DB = "mongodb://localhost:27017/tiltfox";
const PRODUCTION_DB = null;

mongoose.connect(DEV_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Conectado ao banco!");
}).catch((err) => {
    console.log(err);
});
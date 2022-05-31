require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes")

require("./db").connect();

//getting env values
const PORT = process.env.PORT;

// middle
app.use(express.json());

//routing
app.use("/", route);



app.listen(PORT, () => {
    console.log("Server Started...!");
})
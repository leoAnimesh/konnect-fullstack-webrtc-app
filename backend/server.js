require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));

//connect database
require("./config/dbConnect")();

//global middlewares
app.use(express.json());
app.use("/api", require("./routes/routes"));

//listening
app.listen(PORT, console.log(`[+] Server running at http://localhost:${PORT}`));

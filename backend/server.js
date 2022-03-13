require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(require("cookie-parser")());
const corsOption = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

//connect database
require("./config/dbConnect")();

//global middlewares
app.use(express.json({ limit: "8mb" }));
app.use("/api", require("./routes/routes"));

//listening
app.listen(PORT, console.log(`[+] Server running at http://localhost:${PORT}`));

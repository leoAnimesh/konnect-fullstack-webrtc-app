require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

//connect database
require("./config/dbConnect")();

app.use(require("cookie-parser")());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "8mb" }));
app.use("/api", require("./routes/routes"));
app.use("/storage", express.static("storage"));

//listening
app.listen(PORT, console.log(`[+] Server running at http://localhost:${PORT}`));

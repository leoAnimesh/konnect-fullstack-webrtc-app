const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("[+] Database connected sucessfully");
  });
};

module.exports = connectDb;

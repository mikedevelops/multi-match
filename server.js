const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(PORT, () => {
  console.log("server listening on ", PORT);
});

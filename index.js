"use strict";

import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(3000, () => {
  console.log("Main program running on port 3000...");
});

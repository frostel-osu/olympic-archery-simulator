"use strict";

import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(3000, () => {
  console.log("\"All is for the best in the best of all possible worlds.\" --Pangloss");
});

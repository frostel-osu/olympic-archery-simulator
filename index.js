"use strict";

import express from "express";
import * as zmq from "zeromq";

const app = express();
const socket = new zmq.Request();

socket.connect("tcp://localhost:5335");

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  await socket.send(`${req.query.coordinates}`);

  const [message] = await socket.receive();

  const data = JSON.parse(message.toString("utf-8"));

  res.json(data);
});

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(3000, () => {
  console.log("Main program running on port 3000...");
});

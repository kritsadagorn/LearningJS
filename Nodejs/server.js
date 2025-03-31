//TY kub aj kob ctrlc
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Node.js API");
});

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.get("/hello/:name/:age", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  res.send(`Hello ${name} ${age}`);
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  res.send(`Hello ${name}`);
});

app.post("/post2", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  res.send(`Hello ${name} ${age}`);
});

app.put("/user/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  res.send(`${id} ${name} ${age}`);
});

app.delete("/user/remove/:id", (req, res) => {
  const id = req.params.id;
  res.send(`${id}`);
});

app.post("/api/user/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "1234") {
    const payload = { id: 1 };
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, expiresIn);
    res.json({ token: token });
  } else {
    res.status((401).json({ error: "unauthorized" }));
  }
});1

app.get("/api/user/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];// [0]Bearer [1]3821394819rjaspijfskafjakj <= we need only this token
  console.log(token);
  const secretKey = process.env.SECRET_KEY;
  const decoded = jwt.verify(token, secretKey);
  res.json({ decoded: decoded }); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

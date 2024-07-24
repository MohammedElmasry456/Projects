const express = require("express");
const app = express();

const port = 3000;

////////////////////////////////////////
const path = require("path");
const x = path.join(__dirname, "../public");
app.use(express.static(x));
////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello Home Page");
});
app.get("/page1", (req, res) => {
  res.send("Hello Page 1");
});
app.get("/page2", (req, res) => {
  res.send("Hello Page 2");
});
app.get("/page3", (req, res) => {
  res.send("Hello Page 3");
});
////////////////////////////////////////
app.set("view engine", "hbs");
const y = path.join(__dirname, "../template/views");
app.set("views", y);
////////////////////////////////////////
const hbs = require("hbs");
const z = path.join(__dirname, "../template/partials");
hbs.registerPartials(z);
////////////////////////////////////////

//////////
app.get("/person1", (req, res) => {
  res.render("person1", {
    id: 1,
    name: "ali",
    age: 25,
    img: "images/person_2.jpg",
  });
});
app.get("/person2", (req, res) => {
  res.render("person2", {
    id: 2,
    name: "adel",
    age: 20,
    img: "images/person.jpg",
  });
});
app.get("/person3", (req, res) => {
  res.render("person3", {
    id: 3,
    name: "alaa",
    age: 15,
    img: "images/skill_1.jpg",
  });
});
//////////

app.listen(port, () => {
  console.log("Port 3000 Is On");
});

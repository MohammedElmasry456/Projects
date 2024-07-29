const express = require("express");
const file = require("./data");
const app = express();
const port = 3000;

const path = require("path");
const y = path.join(__dirname, "../public");
app.use(express.static(y));

app.set("view engine", "hbs");
let x = path.join(__dirname, "../temp/views");
app.set("views", x);

app.get("/home", (req, res) => {
  res.render("home", {
    message:
      "Welcome To Our Website.To Know Your Country's Weather,Longitude and Latitude, Please Enter The Name Of The Country.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please Type Your Country" });
  }
  file.geoCodeFun(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    file.weatherFun(data.longitude, data.latitude, (error, response) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        longitude: data.longitude,
        latitude: data.latitude,
        weather: response.forecast,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("Error 404");
});
app.listen(port, () => {
  console.log("Port 3000 ON");
});

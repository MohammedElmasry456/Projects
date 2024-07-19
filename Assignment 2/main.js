let x = process.argv[2];
const file = require("./file");
file.geoCodeFun(x, (error, data) => {
  console.log("Error :", error);
  console.log("Data :", data);
  file.getWeather(data.longitude, data.latitude, (error, data) => {
    console.log("Error : ", error);
    console.log("Data : ", data);
  });
});

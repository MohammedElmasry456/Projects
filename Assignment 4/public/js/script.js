let form = document.querySelector("form");
let content = document.querySelector(".content");
let country = document.getElementById("country");
let message = document.getElementById("message");
let lat = document.getElementById("lat");
let long = document.getElementById("long");
let name_ = document.getElementById("name");
let weather = document.getElementById("weather");
let error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherFun();
});

async function weatherFun() {
  let response = await fetch(
    "http://localhost:3000/weather?address=" + country.value
  );
  let data = await response.json();
  if (data.error) {
    error.style.display = "block";
    message.style.display = "none";
    content.style.display = "none";
    error.innerHTML = data.error;
  } else {
    error.style.display = "none";
    message.style.display = "none";
    content.style.display = "block";
    name_.innerHTML = country.value;
    lat.innerHTML = data.latitude;
    long.innerHTML = data.longitude;
    weather.innerHTML = data.weather;
  }
}

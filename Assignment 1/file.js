const fs = require("fs");
//--------------------------------------------addUser-------------------------------
const addUser = (id, fname, lname, age, city) => {
  let data = loadData();
  let repeated = data.filter((obj) => {
    return obj.id == id;
  });
  if (repeated.length == 0) {
    data.push({
      id: id,
      fname: fname,
      lname: lname,
      age: age,
      city: city,
    });

    updataData(data);
  } else {
    console.log("Error");
  }
};
//--------------------------------------------loadData-------------------------------
function loadData() {
  try {
    let allData = fs.readFileSync("data10.json").toString();
    return JSON.parse(allData);
  } catch {
    return [];
  }
}
//--------------------------------------------updataData-------------------------------
function updataData(data) {
  fs.writeFileSync("data10.json", JSON.stringify(data));
}

//--------------------------------------------deleteUser-------------------------------
function deleteUser(id) {
  let allData = loadData();
  let filtered = allData.filter((obj) => {
    return obj.id != id;
  });
  updataData(filtered);
}
//--------------------------------------------readUser-------------------------------
function readUser(id) {
  let allData = loadData();
  let filtered = allData.find((obj) => {
    return obj.id == id;
  });
  if (filtered) {
    console.log(filtered);
  } else {
    console.log("Not Found");
  }
}
//--------------------------------------------listUsers-------------------------------
function listUsers() {
  let allData = loadData();
  allData.forEach((obj) => {
    console.log(obj.fname, obj.city);
  });
}

//--------------------------------------------exports-------------------------------

module.exports = {
  addUser,
  deleteUser,
  readUser,
  listUsers,
};

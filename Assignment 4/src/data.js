const request = require("request");
const geoCodeFun = (address, callback) => {
  let geoCode = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&proximity=ip&access_token=pk.eyJ1IjoiZWxtYXNyeS00NTYiLCJhIjoiY2x5cThkYjBnMHg4YTJqcXkydGlyOHV4bSJ9.d7SWuuIj6gzT0EygquIy6A`;
  request({ url: geoCode, json: true }, (error, data) => {
    if (error) {
      callback(error, undefined);
    } else if (data.body.features.length == 0) {
      callback("UNABLE TO FIND LOCATION", undefined);
    } else if (data.body.message) {
      console.log(data.body.message);
    } else {
      callback(undefined, {
        longitude: data.body.features[0].geometry.coordinates[0],
        latitude: data.body.features[0].geometry.coordinates[1],
      });
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
const weatherFun = (longitude, latitude, callback) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=8d910769ee364e4a829215807241507&q=${latitude},${longitude}&aqi=no`;
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(error, undefined);
    } else if (data.body.error) {
      callback(data.body.error.message, undefined);
    } else {
      callback(undefined, {
        forecast: `${data.body.location.name} is ${data.body.current.condition.text} And Temp: ${data.body.current.temp_c}C`,
      });
    }
  });
};

module.exports = {
  weatherFun,
  geoCodeFun,
};

const request = require("request");
// -----------------------------------------Get longitude And latitude---------------------------------------
const geoCodeFun = (address, callback) => {
  let geoCode = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&proximity=ip&access_token=pk.eyJ1IjoiZWxtYXNyeS00NTYiLCJhIjoiY2x5cThkYjBnMHg4YTJqcXkydGlyOHV4bSJ9.d7SWuuIj6gzT0EygquIy6A`;
  request({ url: geoCode, json: true }, (error, response) => {
    if (error) {
      callback("Error", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length == 0) {
      callback("The Country Not Found", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].geometry.coordinates[0],
        latitude: response.body.features[0].geometry.coordinates[1],
      });
    }
  });
};
// -----------------------------------------Get Weather---------------------------------------
const getWeather = (longitude, latitude, callback) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=8d910769ee364e4a829215807241507&q=${latitude},${longitude}&aqi=no`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message);
    } else {
      callback(
        undefined,
        response.body.location.name +
          " And It's " +
          response.body.current.condition.text
      );
    }
  });
};
// ------------------------------------------Exports------------------------------------------
module.exports = {
  geoCodeFun,
  getWeather,
};

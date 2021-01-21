const makeRequest = require('./request');

const getWeather = async (lat, lon) => {
  return makeRequest(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`
  );
};

module.exports = getWeather;

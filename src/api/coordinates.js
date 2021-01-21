const makeRequest = require('./request');

const getCoordinates = async (query) => {
  const MAPBOX_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${process.env.MAPBOX_KEY}`;
  const res = await makeRequest(MAPBOX_API_URL);
  console.log(res);
  if (res.features.length === 0) {
    console.error('Unable to find location. Try another search');
    return null;
  }
  return res;
};

module.exports = getCoordinates;

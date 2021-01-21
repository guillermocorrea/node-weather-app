require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./api/weather');
const getCoordinates = require('./api/coordinates');

const PORT = process.env.PORT || 3000;

const app = express();

const viewsPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/_partials');

// View engine
app.set('view engine', 'hbs');
app.use(express.static(viewsPath));
hbs.registerPartials(partialsPath);

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
  });
});

app.get('/weather', async (req, res) => {
  const address = req.query.address;
  console.log(address);
  if (!address) {
    return res.status(400).json({ error: 'missing ?query param' });
  }

  try {
    const resMapBox = await getCoordinates(address);
    if (!resMapBox) {
      return res
        .status(404)
        .send({ error: 'Address not found! Try with a different one.' });
    }
    const [lon, lat] = resMapBox.features[0].center;
    console.log('MAPBOX', lat, lon);
    const resWeather = await getWeather(lat, lon);
    console.log(resWeather);
    return res.send({
      forecast: `${resWeather.weather[0].description} ${resWeather.main.temp} celcius degrees`,
      location: resMapBox.features[0].place_name,
      address,
      feelsLike: resWeather.main.feels_like,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'something went wrong!' });
  }

  res.json({ forecast: 'It is snowing', location: 'Philadelphia', address });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Article not found!',
    content: 'Article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', content: 'Page not found' });
});

app.listen(PORT, () => console.log(`listening at ${PORT}`));

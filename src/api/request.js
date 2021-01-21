const http = require('https');

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const body = JSON.parse(data || '');
        if (res.statusCode !== 200) {
          reject(body);
        }
        resolve(body);
      });
    });
  });
};

module.exports = makeRequest;

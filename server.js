const express = require('express');
const app = express();
const port = 5000;
const rp = require('request-promise');

/**
 * Define request optins along with API key for CMC API
 * This requests the top 10 cryptocurrencies by CMC rank
 */
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '10',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '7c607d33-2cbd-455e-b2cb-3e2b7672fe20'
  },
  json: true,
  gzip: true
};

/**
 * Route that returns the response containing the JSON data of the cmc request
 */
app.get('/api/crypto', (req, res) => {

    rp(requestOptions).then(response => {
        res.send(response);
        }).catch((err) => {
        console.log('API call error:', err.message);
        });
})

/**
 * Dummy route for dummy data
 */
app.get('/api/customers', (req, res) => {

    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Mike', lastName: 'Johnson'},
        {id: 3, firstName: 'Vivek', lastName: 'Puri'}
    ];

    res.json(customers);
    console.log(req.baseUrl);
})

app.listen(port, () => console.log(`Server has started on port ${port}`));
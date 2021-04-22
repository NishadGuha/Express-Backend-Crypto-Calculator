const express = require('express');
const app = express();
const port = 5000;
const rp = require('request-promise');

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

app.get('/api/crypto', (req, res) => {

    rp(requestOptions).then(response => {
        res.json(response);
        }).catch((err) => {
        console.log('API call error:', err.message);
        });
})

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
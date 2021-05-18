const express = require('express');
const app = express();
const port = 5000;
const rp = require('request-promise');
app.use(express.json());

/**
 * Define request optins along with API key for CMC API
 * This requests the top 10 cryptocurrencies by CMC rank
 */
const requestOptions_latest = {
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

    rp(requestOptions_latest).then(response => {
        res.send(response);
        }).catch((err) => {
        console.log('API call error:', err.message);
        });
})

app.post('/result', (req, res) => {
  console.log("I got a request!");
  console.log(req.body);
  //@TODO: Fetch appropriate data from CMC API and calculate result and send it in the response.

  const requestOptions_historical = {
    method: 'GET',
    uri: `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1MIN&time_start=${req.body.date}T00:00:00&time_end=${req.body.date}T00:01:00`,
    headers: {
      'X-CoinAPI-Key': 'D6D1F221-44F9-4C37-9DC6-5241251431D8'
    },
    json: true,
  };

  rp(requestOptions_historical).then(response => {
    res.json({
      status: "success",
      amount: req.body.amount,
      date: req.body.date,
      price_at_date: response
    })
    }).catch((err) => {
    console.log('API call error:', err.message);
    });
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
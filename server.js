const express = require('express');
const app = express();
const port = 5000;
const rp = require('request-promise');
const https = require('https');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
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
  // console.log("I got a request!");
  // console.log(req.body);

  let historicPricePromise = new Promise((resolve, reject) => {
    let data = CoinGeckoClient.coins.fetchHistory('bitcoin', {
      date: req.body.newDate
    });
    if(data != null) {
      resolve(data)
    } else {
      reject("API did not return any data")
    }
  });

  let currentPricePromise = new Promise((resolve, reject) => {
    let data =  CoinGeckoClient.coins.fetch('bitcoin', {
    });
    if(data != null) {
      resolve(data)
    } else {
      reject("API did not return any data")
    }
  })

  currentPricePromise.then((currentPriceMessage) => {
    var currentPrice =  currentPriceMessage.data.market_data.current_price.usd;
    calculateResult(currentPrice);
  }).catch((err) => {
    console.log("Error fetching current day price" + err);
  });

  function calculateResult(currentPrice) {
    historicPricePromise.then((message) => {
      var historicPrice = message.data.market_data.current_price.usd;
      var historicCryptoValue = req.body.amount/message.data.market_data.current_price.usd;  
      var currentFiatValue = historicCryptoValue * currentPrice;
  
      console.log(`You had bought ${historicCryptoValue} BTC at ${historicPrice} and you would now have ${currentFiatValue} dollars!`);
    }).catch((err) => {
      console.log(err)
    })
  }
  
});
app.listen(port, () => console.log(`Server has started on port ${port}`));
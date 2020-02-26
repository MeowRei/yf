const express = require('express');
const yahooFinance = require('yahoo-finance');
const router = express.Router();
const util = require('util');
const _ = require('lodash');

/* GET users listing. */
router.post('/', async function(req, res) {
  const {symbol, from, to, period} = req.body;
  const trueSymbol = Object.values(symbol).filter(elem => elem !== '');
  
    const data = {};
    
    yahooFinance.historical({
      symbols: trueSymbol,
      from: from,
      to: to,
      period: period
    }, function (err, result) {
      if (err) { throw err; }
      _.each(result, function (quotes, symbol) {
        if (quotes[0]) {
          data[symbol] = quotes
        } else {
          console.log('N/A');
        }
      });
      res.json(data)
    });
  
});

module.exports = router;

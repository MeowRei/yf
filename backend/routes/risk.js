const express = require('express');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
  const link = 'https://www.treasury.gov/resource-center/data-chart-center/interest-rates/Datasets/yield.xml';
  
  const result = new XMLHttpRequest();
  result.open('GET', link);
  const check = /30YEARDISPLAY>\d.\d{2}/gmi;

  const emptyBlank = /\s/gmi;
  result.onload = function() {
    if (result.status == 200) {

      const temp = result.responseText.replace(emptyBlank,'').match(check);
      res.json({risk:Number(temp[temp.length-1].slice(14))})
    } else {
      console.log(result.statusText);
    }
  };
  
  result.onerror = function() {
    console.log('Network Error');
  };
  result.send();
});
module.exports = router;

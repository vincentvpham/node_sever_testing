var Promise = require('bluebird');
var request = require('request');
var express = require('express');

var app = express();

// promisified readFile
var readfileP = function() {
  return new Promise(function (fulfill, reject) {
    request({uri: url}, function(err, data) {
      if (err) {
        reject(err);
      } else {
        fulfill(data);
      }
    });
  });
}

app.listen(3000, function() {
  console.log('listening on 3000!');
});

var url = 'http://sandiego.eventful.com/json/events?q=*&ga_search=*&ga_type=events';

app.get('/api/events/callback/',
  function(req, res) {
    request({uri: url}, function(err, data) {
      if (err) {
        res.json(400, err);
      } else {
        res.json(200, data);
      }
    });
  }
);
  
app.get('/api/events/promise/',
  function(req, res) {
    readfileP()
    .then(function(data) {
      res.json(200, data);
    })
    .catch(function(err) {
      res.json(400, err);
    });
  }
);

app.get('/api/events/setTimeout/',  
  function(req, res) {
    setTimeout(function() {
      request({uri: url}, function(err, data) {
        if (err) {
          res.json(400, err);
        } else {
          res.json(200, data);
        }
      });
    }, 0);
  }
);
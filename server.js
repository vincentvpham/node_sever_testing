var Promise = require('bluebird');
var fs = require('fs');
var express = require('express');
var sleep = require('sleep');

var app = express();

// promisified readFile
var readfileP = function() {
  return new Promise(function (fulfill, reject) {
    fs.readFile(filePath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(data);
        fulfill(data);
      }
    });
  });
}

app.listen(3000, function() {
  console.log('listening on 3000!');
});

var filePath = __dirname + '/events.txt';

app.get('/api/events/callback/',
  function(req, res) {
    fs.readFile(filePath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        res.json(400, err);
      } else {
        console.log(data);
        res.json(200, data);
      }
    });
  }
);
  

app.get('/api/events/promise/',
  function(req, res) {
    readfileP()
    .then(function(data) {
      console.log(data);
      res.json(200, data);
    })
    .catch(function(err) {
      console.log(err);
      res.json(400, err);
    });
  }
);

app.get('/api/events/setTimeout/',  
  function(req, res) {
    setTimeout(function() {
      fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
          console.log(err);
          res.json(400, err);
        } else {
          console.log(data);
          res.json(200, data);
        }
      });
    }, 0);
  }
);

app.get('/api/events/callback/sleep/',
  function(req, res) {
    sleep.sleep(1);
    fs.readFile(filePath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        res.json(400, err);
      } else {
        console.log(data);
        res.json(200, data);
      }
    });
  }
);

app.get('/api/events/promise/sleep/',
  function(req, res) {
    sleep.sleep(1);
    readfileP()
    .then(function(data) {
      console.log(data);
      res.json(200, data);
    })
    .catch(function(err) {
      console.log(err);
      res.json(400, err);
    });
  }
);

app.get('/api/events/setTimeout/sleep/',  
  function(req, res) {
    sleep.sleep(1);
    setTimeout(function() {
      fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
          console.log(err);
          res.json(400, err);
        } else {
          console.log(data);
          res.json(200, data);
        }
      });
    }, 0);
  }
);

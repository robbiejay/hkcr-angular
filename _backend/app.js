const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const updateRoutes = require('./update');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
  res.setHeader('Access-Control-Allow-Methods',
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
  next();
});

app.use('/api/update', updateRoutes);

module.exports = app;

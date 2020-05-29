const cron = require('node-cron');
const express = require('express');
const fs = require('fs');
const http = require('http');

app = express();


      // * * * * * *
      // | | | | | |
      // | | | | | day of week
      // | | | | month
      // | | | day of month
      // | | hour
      // | minute
      // second ( optional )
cron.schedule('* * * * *', function() {
http.get('http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=14', (res) => {
  let data = '';
  res.on('data', (item) => {
    data += item;
  });

  res.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
  // Update JSON file
  console.log('running a task every minute');
});

app.listen(8888);

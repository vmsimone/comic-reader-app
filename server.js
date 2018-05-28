const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

if (require.main === module) {
  app.listen(port, function() {
    console.log(`Your app is listening on port ${port}`);
  });
}

module.exports = app;

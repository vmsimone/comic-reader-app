const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

if (require.main === module) {
  app.listen(port, function() {
    console.log(`Your app is listening on port ${port}`);
  });
}

const { PORT } = require('./config');
const { Comic } = require('./models');

app.get('/mylist', (req, res) => {
  Comic
    .find()
    .then(comis => {
      res.json(
        comics
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = app;

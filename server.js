'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Comic } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req,res) => { 
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/comics', (req, res) => {
  Comic
    .find()
    .then(comics => {
      res.json({
        comics: comics.map(
          (comic) => comic.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error thrown during GET' });
    });
});

app.post('/api/comics', (req, res) => {
  const requiredKeys = ['title', 'author', 'published', 'pages'];
  for (let i = 0; i < requiredKeys.length; i++) {
    const key = requiredKeys[i];
    if (!(key in req.body)) {
      const message = `Missing \`${key}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Comic.create({
    title: req.body.title,
    author: req.body.author,
    published: req.body.published,
    pages: req.body.pages,
    pagesRead: "0",
    rating: "None",
    isFavorite: false
  })
  .then(Comic => res.status(201).json(Comic.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'POST not functioning correctly' });
  });
});

app.put('/api/comics/:id', (req, res) => {
  if(!(req.body.id)) {
    res.status(400).json({
      error: 'Request body does not contain id'
    });
  }

  if (!(req.params.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableKeys = ['pagesRead', 'rating', 'isFavorite'];

  updateableKeys.forEach(key => {
    if (key in req.body) {
      console.log(key);
      updated[key] = req.body[key];
    }
  });

  Comic
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedComic => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'PUT not functioning correctly' });
    });
});

app.delete('/api/comics/:id', (req, res) => {
  Comic
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: `${req.params.id} removed` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'DELETE misfiring '});
    });
});

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const comicSchema = mongoose.Schema({
  "title": {type: String, required: true},
  "author": {type: String, required: true},
  "published": String,
  "pages": {type: String, required: true}
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = { Comic };

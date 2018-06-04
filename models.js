const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const comicSchema = mongoose.Schema({
  "title": {
    "English": {type: String, required: true},
    "Japanese": String,
    "Published": String
  },
  "author": {type: String, required: true},
  "published": String,
  "pages": {type: String, required: true}
});

comicSchema.virtual('engTitle').get(function() {
  return this.title.English;
});

comicSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: engTitle,
    author: this.author,
    published: this.published,
    pages: this.pages
  };
};

const Comic = mongoose.model('Comic', comicSchema, 'comics');

module.exports = {Comic};

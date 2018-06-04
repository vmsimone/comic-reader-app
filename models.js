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
  "pages": {type: String, required: true},
  "pagesRead": String,
  "rating": String,
  "isFavorite": Boolean
});

comicSchema.virtual('engTitle').get(function() {
  return this.title.English;
});

comicSchema.methods.serialize = function() {
  if (this.pagesRead === 0 && this.rating === "None") {
    return {
      id: this._id,
      title: this.engTitle,
      author: this.author,
      published: this.published,
      pages: this.pages
    };
  } else {
    return {
      id: this._id,
      title: this.engTitle,
      author: this.author,
      published: this.published,
      pages: this.pages,
      pagesRead: this.pagesRead,
      rating: this.rating,
      isFavorite: this.isFavorite
    };
  }
};

const Comic = mongoose.model('Comic', comicSchema, 'comics');

module.exports = {Comic};

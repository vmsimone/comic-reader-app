const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const comicSchema = mongoose.Schema({
  "title": {
    "English": {type: String, required: true},
    //these aren't currently necessary, but may be useful if manga is included in a later feature
    "Japanese": String,
    "Romaji": String
  },
  "author": {type: String, required: true},
  "published": String,
  "pages": {type: String, required: true},
  "pagesRead": String,
  "rating": String,
  "owner": {type: String, required: true},
  //placeholder for possible future feature
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
      pages: this.pages,
      owner: this.owner
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
      owner: this.owner,
      isFavorite: this.isFavorite
    };
  }
};

const Comic = mongoose.model('Comic', comicSchema, 'comics');

module.exports = {Comic};

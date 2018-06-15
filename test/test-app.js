const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = require('chai').expect;

const {Comic} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedData() {
  console.info('now building test database');
  const sandbox = [];

  for (let i=0; i<=10; i++) {
    sandbox.push(generateTestData());
  }
  return Comic.insertMany(sandbox);
}

function randomize(variable) {
  return variable[Math.floor(Math.random() * variable.length)];
}

function generateTitle() {
  const possibleTitles = [
    {"English": "Batman: The Killing Joke"}, 
    {"English": "Future Diary"}, 
    {"English": "Scott Pilgrim"}, 
    {"English": "Lost at Sea"}
  ];
  const ranTitle = randomize(possibleTitles);
  return ranTitle;
}

function generateAuthor() {
  const possibleAuthors = ["Alan Moore", "Sakae Esuno", "Masashi Kishimoto", "Bryan Lee O'Malley"];
  const ranAuthor = randomize(possibleAuthors);
  return ranAuthor;
}

function generatePublishedDate() {
  const possiblePublishedDate = ["September 21, 1999", "December 1st, 1995", "January 26, 2006", "September 21, 1999"];
  const ranPublishedDate = randomize(possiblePublishedDate);
  return ranPublishedDate;
}

function generatePageNum() {
  const possiblePageNum = [1000, 16072, 2500, 50, 168];
  const ranPageNum = randomize(possiblePageNum);
  return ranPageNum;
}

function generateTestData() {
  return {
    title: generateTitle(),
    author: generateAuthor(),
    published: generatePublishedDate(),
    pages: generatePageNum(),
    owner: "Tester"
  }
}

function tearDownThisWall() {
  console.warn('Deleting Database, Mr. Gorbachev');
  return mongoose.connection.dropDatabase();
}

describe('Comics resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedData();
  });

  afterEach(function() {
    return tearDownThisWall();
  });

  after(function() {
    return closeServer();
  });

  describe('test server', function() {
    it('should have a 200 status', function(){
      return chai.request(app)
        .get('/')
        .then(function (res) {
          expect(res).to.have.status(200);
      });
    });
  });

  describe('GET endpoint', function() {
    it('should return all objects in the test function', function(){
      let res;
      return chai.request(app)
        .get('/api/comics')
        .then(function(_res){
          res = _res;
          expect(res.body.comics).to.have.lengthOf.at.least(1);
          return Comic.count();
        })
        .then(function(count){
          expect(res.body.comics).to.have.lengthOf(count);
      });
    });

    it('should make sure they all have the correct keys', function() {
      return chai.request(app)
        .get('/api/comics')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.comics).to.be.a('array');

          res.body.comics.forEach(function(comic) {
            expect(comic).to.be.a('object');
            expect(comic).to.include.keys(
              'id', 'title', 'author', 'published', 'pages'
            );
        });
      });
    });
  });

  describe('POST endpoint', function(){
    it('should add a new comic', function() {
      const newComic = generateTestData();

      return chai.request(app)
        .post('/api/comics')
        .send(newComic)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'title', 'author', 'published', 'pages', 'owner'
          );
          expect(res.body.id).to.not.be.null;
          expect(res.body.title).to.equal(newComic.title.English);
          expect(res.body.content).to.equal(newComic.content);
      });
    });
  });

  describe('PUT endpoint', function() {
    it('should update a comic based on an object you send', function() {
      const updaterObject = {
        pagesRead: '10',
        rating: '3'
      };

      return Comic
        .findOne()
        .then(function(sampleComic) {
          console.log(sampleComic);
          updaterObject.id = sampleComic.id;

          return chai.request(app)
            .put(`/api/comics/${sampleComic.id}`)
            .send(updaterObject);
        })
        .then(function(res) {
          expect(res).to.have.status(204);

          return Comic.findById(updaterObject.id);
        })
        .then(function(updatedComic) {
          expect(updatedComic.pagesRead).to.equal(updaterObject.pagesRead);
          expect(updatedComic.rating).to.equal(updaterObject.rating);
      });
    });
  });

  describe('DELETE endpoint', function() {
    it('should delete a comic by its id', function() {
      let doomedComicID;
      return Comic
        .findOne()
        .then(function(doomedComic) {
          doomedComicID = doomedComic.id;
          return chai.request(app).delete(`/api/comics/${doomedComicID}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Comic.findById(doomedComicID);
        })
        .then(function(nullComic) {
          expect(nullComic).to.be.null;
        });
    });
  });

});
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = require('chai').expect;

const app = require('../server');
const Comic = require('../models');

chai.use(chaiHttp);

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
      .get('/mylist')
      .then(function(_res){
        console.log(Comic);
        res = _res;
        expect(res.body.comics).to.have.lengthOf.at.least(1);
        return Comic.count();
      })
      .then(function(count){
        expect(res.body).to.have.lengthOf(count);
      });
  });
});

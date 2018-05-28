const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = require('chai').expect;

const app = require('../server');

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

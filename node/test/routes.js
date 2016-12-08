var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var server = require('../app');

describe('Routes', function() {
  describe('GET /health', function() {
    it('should be accessible.', function(done) {
      chai.request(server)
        .get('/health')
        .end((err,res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('GET /', function() {
    it('should be accessible.', function(done) {
      chai.request(server)
        .get('/')
        .end((err,res) => {
          res.should.have.status(200);
           done();
        });
    });
  });
  describe('GET /environments', function() {
    it('should be accessible.', function(done) {
      chai.request(server)
        .get('/environments')
        .end((err,res) => {
          res.should.have.status(200);
          res.should.not.be.empty;
           done();
        });
    });
  });
  describe('GET /environments/ipay', function() {
    it('should be accessible.', function(done) {
      chai.request(server)
        .get('/environments/ipay')
        .end((err,res) => {
          res.should.be.a('object');
          res.body.should.have.property('host');
          done();
        });
    });
  });
  describe('GET /environments/ipay/version', function() {
    it('should be accessible.', function(done) {
      chai.request(server)
        .get('/environments/ipay/version')
        .end((err,res) => {
          res.should.be.a('object');
          res.body.should.have.property('version');
          done();
        });
    });
  });
  describe('GET /invalidendpoint', function() {
    it('should return a 404.', function(done) {
      chai.request(server)
        .get('/invalidendpoint')
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

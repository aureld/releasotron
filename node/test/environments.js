var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Environments = require('../models/Environments');


describe('Environments', function() {
  describe('#findVersion()', function() {
    it('should return a version.', sinon.test(function() {
        
        var optionsFixture = {
            host: 'repose-i.test.pci.irdeto.com', 
            port: 443,
            path: '/verifier/version',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var getJSON = sinon.stub(Environments, 'getJSON');
        getJSON.returns('1.0.0')
        
        Environments.findVersion('ipay', function(version){
            expect(Environments.getJSON).to.have.been.calledOnce;
            expect(Environments.getJSON).to.have.been.calledWith(optionsFixture);
            expect(version).to.be.equal('1.0.0');
        });
        getJSON.restore();

    }));
  });
});
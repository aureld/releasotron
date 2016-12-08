const router = require('express').Router();
var Environments = require('../models/Environments');

/* GET home page. */
router.get('/', function(reqs, res, next) {
  
  //fetch ipay
  var env = 'ipay';
  var version = Environments.findVersion(env, function(version) {
    console.log("version(" + env + "):" + version);
  });
});

module.exports = router;

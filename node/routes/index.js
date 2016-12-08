const router = require('express').Router();
var envs = require('../models/Environments');

/* GET home page. */
router.get('/', function(reqs, res, next) {
  envs.findVersions();
  console.log("version:" + envs.endpoints['ipay'].version);
  return res.json(envs.endpoints);
});

module.exports = router;

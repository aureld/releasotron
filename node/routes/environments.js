const router = require('express').Router();
var Environments = require('../models/Environments');

//list all envs
router.get('/', function(reqs, res, next) {
  res.status(200).json(Environments.endpoints);
});

//GET by environment id ('ipay', 'tpay' ...)
router.get('/:id', function(reqs, res, next) {
  res.status(200).json(Environments.endpoints[reqs.params.id]);
});

//GET the version of a specified env.
router.get('/:id/version', function(reqs, res, next) {
    var env = reqs.params.id;
    Environments.findVersion(env, function(version) {
      res.status(200).json(version);
  });
});


module.exports = router;

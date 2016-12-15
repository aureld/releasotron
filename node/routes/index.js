const router = require('express').Router();
var Environments = require('../models/Environments');

/* GET home page. */
router.get('/', function(reqs, res, next) {
  
  var envs = Environments.envs;
  var total = envs.length;
  var count = 0;
  var versions = new Array(envs.length);

  for(var i = 0; i < total; i++){
      (function(item){
          Environments.findVersion(envs[item].name, function(response) {
              versions.push(JSON.stringify(response));
              count++;
              if (count > total - 1) done();
          });
      }(i));
  }

  function done() {
    res.render('index', {title: 'Release-o-tron!'});
  };  
});




module.exports = router;

const router = require('express').Router();
var Environments = require('../models/Environments');

/* GET home page. */
router.get('/', function(reqs, res, next) {
  
  //var versions = [];

  //traverse the list of envs and display the version
  var endpoints = Environments.endpoints;
  console.log(endpoints);
  var versions = endpoints.map(Environments.findVersion(key, function(v) {
                                                versions.push({
                                                  environment: key,
                                                  version: v.version
                                                });
                                            }));
console.log(versions);

 /* Object.keys(endpoints).forEach(function(key) {
    Environments.findVersion(key, function(v) {
      versions.push({
        environment: key,
        version: v.version
      });
     
    });
    console.log(versions);
  });
//console.log(versions);
res.send(versions);
*/
});

module.exports = router;

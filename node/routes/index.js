const util = require('util')

const router = require('express').Router();
var Environments = require('../models/Environments'); 

/* GET home page. */
router.get('/', function(reqs, res, next) {
    Environments.updateVersions(function(envs) {
        //console.log(util.inspect(envs, false, null));
        res.render('index', {environments: envs});
    });
});




module.exports = router;

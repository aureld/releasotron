var http = require('http');
var https = require('https');

var Environments = {};
Environments.envs = require("../config/environments.json");


/**
 * findVersion:  returns the version deployed in the specidied environment
 * @param name: environment name (ipay,tpay,spay...)
 */
Environments.findVersion = function(name, callback) {

            var val = find(this.envs, function(x) {return x.name == name;});
            var options = {
                host: val.host,
                port: val.port,
                path: val.path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };   

           this.getJSON(options,function(options, result) {
                     callback(result);
                    });
}

/**
 * findEnvironment:  returns the environment parameters used to query the version
 * @param name: environment name (ipay,tpay,spay...)
 */
Environments.findEnvironment = function(name, callback) {

            val = find(this.envs, function(x) {return x.name == name;});
            callback(val);
}



/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
Environments.getJSON = function(options, callback) {
    
    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res) {
        var output = '';
        
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            callback(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};

// find an item in a list
var find = function(items, f) {
  for (var i=0; i < items.length; i++) {
    var item = items[i];
    if (f(item)) return item;
  };
}

module.exports = Environments;
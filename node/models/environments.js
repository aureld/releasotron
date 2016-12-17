var http = require('http');
var https = require('https');

var Environments = {};
Environments.envs = require("../config/environments.json");

Environments.updateVersions = function (callback) {

    var envs = Environments.envs;
    var total = envs.length;
    var count = 0;

    for(var i = 0; i < total; i++){ // for each environment
        (function(item){
            var components = envs[item].components;
            for(var j = 0; j < components.length; j++){ // for each component
                    Environments.getVersion(components[j], function(response) {});
            };
            count++;
            if (count > total - 1) done(); //to make sure we wait until the end to continue
        }(i));
    }

    function done() {
        callback(envs);
    };
}


/**
 * getVersion:  returns the version deployed for the specified component/env
 * @param component: component object
 */
Environments.getVersion = function(component, callback) {

            var options = {
                host: component.host,
                port: component.port,
                path: component.path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };   

           this.getJSON(options,function(options, result) {
                     component.version = result.version;
                     callback(component);
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
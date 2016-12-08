var http = require('http');
var https = require('https');

var Environments = {};

Environments.endpoints = {
        ipay: {
            host: 'repose-i.test.pci.irdeto.com',
            port: 443,
            path: '/verifier/version'
        },
        tpay: {
            host: 'repose.test.pci.irdeto.com',
            port: 443,
            path: '/verifier/version'
        }
    };

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
Environments.getJSON = function(options, callback) {
    
    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
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

/**
 * findVersion:  returns the version deployed in the specidied environment
 * @param env: environment name (ipay,tpay,spay...)
 */
Environments.findVersion = function(env, callback) {
            var val = this.endpoints[env];
            var options = {
                host: val.host,
                port: val.port,
                path: val.path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };   

           this.getJSON(options,function(statusCode, result) {
                    console.log("Environments: (" + options.host + ")"
                     + JSON.stringify(result));
                     callback(result);
                    });
}


module.exports = Environments;
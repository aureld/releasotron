var http = require('http');
var https = require('https');

var Environments = {};

Environments.endpoints = {
        ipay: {
            host: 'repose-i.test.pci.irdeto.com',
            port: 443,
            path: '/verifier/version',
            version: ''
        },
        tpay: {
            host: 'repose.test.pci.irdeto.com',
            port: 443,
            path: '/verifier/version',
            version: ''
        }
    };

Environments.findVersions = function() {
    var endpoints = Environments.endpoints;
    Object.keys(endpoints).forEach(function(key) {
            var val = endpoints[key];
            var options = {
                host: val.host,
                port: val.port,
                path: val.path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }   
            };
            getJSON(options,function(statusCode, result) {
                    console.log("Environments: (" + options.host + ")" + JSON.stringify(result));
                    Environments.endpoints[key].version = result
            });
        });
};


/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
getJSON = function(options, onResult)
{
    console.log("Environments::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};

module.exports = Environments;
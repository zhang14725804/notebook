var http = require('http');
var querystring = require('querystring');
var url = require('url');
http.createServer(function (request, response) {
    var _url = url.parse(request.url);
    var pathname = _url.pathname;
    var query = _url.query;
    console.log(_url);
    console.log(request.url);
    var _host = 'localhost';
    var _port = '3000';
    if (_url.pathname.startsWith("/mapi")) {
        _host = 'mapi.ueater.com';
        _port = '80';
    }

    console.log(request.headers);

    var content = '';
    var opt = {
        // host: 'app-dev-01.pek1.ueater.local',
        host: _host,
        port: _port,
        method: request.method,
        path: request.url,
    };
    var req = http.request(opt, function (res) {
        res.on('data', function (body) {
            console.log('return');
            content += body;
        }).on("end", function () {
            response.writeHead(200, {'Content-Type': 'text/html'});
            console.log(content)
            response.write(content);
            response.end();
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
    if (request.method == 'POST') {
        req.write(querystring.stringify(request.body));
    }
    req.end();
}).listen(3000);
console.log("Server runing at port: " + 3000 + ".");
const http = require('http');
const Hello = require('./hello.js');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.write('Hello');
    setTimeout(function() {
        const hello = new Hello('Olivier');
        hello.say();
        res.end(' world\n');
    }, 2000 );
});

server.listen(8000);
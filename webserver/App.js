const http = require('http');
const url = require('url');
const EventEmitter = require('events');
const fs = require('fs');

class App extends EventEmitter {

    constructor(port) {
        // get parent constructor
        super();
        // initializes routes
        this.routes = [];

        // starts server
        this.server = http.createServer((req, res) => {
            // req.url returns active url, parsed in an URL object
            // then the pathname property is assigned to pathname variable
            const { pathname } = url.parse(req.url);
            console.log(pathname);

            // controls that route exists
            if (pathname in this.routes) {
                const cb = this.routes[pathname];
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.render = (filename, variables) => this.render(req, res, filename, variables);
                cb(req, res);
            } else {
                this.notFound(req, res);
            }
        });

        this.server.listen(port);
    }

    addRoute(url, cb) {
        this.routes[url] = cb;
    }

    notFound(req, res) {
        res.writeHead(404);
        // emit event '404'
        this.emit('404', req, res);
        res.end();
    }

    render(req, res, filename, variables) {
        fs.readFile(`views/${filename}`, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.write(`Failed to open ${filename}`);
                res.end();
            } else {
                for (let variable in variables) {
                    data = data.replace(`{{ ${variable} }}`, variables[variable]);
                }
                res.end(data);
            }
        });
    }

}

module.exports = App;

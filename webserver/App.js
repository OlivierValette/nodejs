const http = require('http');
const url = require('url');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const mime = require( 'mime-types');

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
            // and the same for query property (url parameters)
            const { pathname, query } = url.parse(req.url, true);
            // storing parameters in req object to be used by routes in index.js
            req.query = query;

            // no routing for static files rendering
            if (this.staticDir && pathname.startsWith(this.staticDir)) {
                path.join(__dirname, pathname);
                fs.readFile(path.join(__dirname, pathname), function(err, data) {
                    res.writeHead(200, {'Content-type': mime.contentType(path.extname(pathname))});
                    res.end(data, 'utf-8');
                });
            }
            // routing management
            else {
                // controls route exists
                if (pathname in this.routes) {
                    const cb = this.routes[pathname];
                    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                    res.render = (filename, variables) => this.render(req, res, filename, variables);
                    cb(req, res);
                } else {
                    this.notFound(req, res);
                }
            }
        });

        this.server.listen(port);
    }

    addRoute(url, cb) {
        this.routes[url] = cb;
    }

    setStaticDir(dir) {
        this.staticDir = dir;
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

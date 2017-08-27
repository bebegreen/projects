const url = require('url');
var fs = require('fs');

var myPaths = {};

///////////////////////////////////////////////////////////////////

var router = {
    register: function (path, func) {
        myPaths[path] = func;
    },

    route: function (req, res) {
        var urlParts = url.parse(req.url);
        var pathName = urlParts.pathname;

        if (myPaths[pathName]) {
            myPaths[pathName](req, res);
        }

        else {
            searchPublic(pathName, req, res);
        }
    }
}

///////////////////////////////////////////////////////////////////

function searchPublic(pathName, req, res) {

    fs.access('../public' + pathName, function (err) {
        if (err && err.code === 'ENOENT') {
            searchHtml(pathName, req, res); 
        }

        else {
            fs.createReadStream('../public' + pathName).pipe(res);
        }
    });
}

function searchHtml(pathName, req, res) {

    fs.access('../public' + pathName + '.html', function (err) {
        if (err && err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'Text/html' });
            res.end('<h1>page not found</h1>');
        }
        else {
            fs.createReadStream('../public' + pathName + '.html').pipe(res);
        }
    })
}


module.exports = router; 
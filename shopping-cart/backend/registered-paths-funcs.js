
var fs = require('fs');

function loadMainPage(req, res) {

    res.writeHead(200, { 'Content-Type': 'Text/html' });
    var stream = fs.createReadStream('../public/index.html');
    stream.pipe(res);
    
}

function loadProductsPage(req, res) {
    fs.readFile('../public/html/prods-page.html', 'utf8', (err, data) => {
        var file = data.replace('##catID##', req.url);
        res.end(file);
    })
}

function loadFavicon(req, res) { 
    fs.createReadStream('../public/css/photos/favicon.ico').pipe(res); 
}

module.exports = {
    loadMainPage: loadMainPage,
    loadProductsPage: loadProductsPage,
    loadFavicon: loadFavicon
}
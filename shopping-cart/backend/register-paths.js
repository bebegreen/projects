var router = require('./router.js');
var pathsFuncs = require('./registered-paths-funcs.js'); 

module.exports = function () {
    router.register('/', pathsFuncs.loadMainPage);
    router.register('/Mazda', pathsFuncs.loadProductsPage);
    router.register('/Suzuki', pathsFuncs.loadProductsPage);
    router.register('/Ford', pathsFuncs.loadProductsPage);
    router.register('/Kia', pathsFuncs.loadProductsPage);
    router.register('/Audi', pathsFuncs.loadProductsPage);
    router.register('favicon.ico', pathsFuncs.loadFavicon); 

}
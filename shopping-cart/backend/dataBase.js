var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gggg',
    database: 'store'
});

var ctgrsKey = {
    '/Mazda': 1,
    '/Suzuki': 2,
    '/Ford': 3,
    '/Kia': 4,
    '/Audi': 5
}

function getCtgrs() {

    return new Promise((resolve, reject) => {

        con.connect(() => {
            con.query('SELECT categorie FROM categories', (err, result, fields) => {

                resolve(result);

            });
        })

    })
}

function getProds(catID) {
    return new Promise((resolve, reject) => {
        con.connect(() => {
            var query = 'select * from products where caregory_id=' + ctgrsKey[catID];
            con.query(query, (err, result, fields) => {
                resolve(result);
            });
        })
    })
}

function loadCart() {
    return new Promise((resolve, reject) => {
        con.connect(() => {
            con.query('select * from cart', (err, result, fields) => {
                if (result.length) {
                    var query = 'SELECT * FROM products JOIN cart ON cart.prod_id=products.id';
                    con.query(query, (err, result, fields) => {
                        if (err) console.log(err);
                        resolve(result);
                    })
                }
            })
        })
    })
}



function addToCart(prod_id) {

    con.connect(() => {
        var query = `insert into cart (id, prod_id, cart_id) values (null, ${prod_id}, 1)`;
        con.query(query, (err, result, fields) => {
            if (err) console.log(err);
        })
    })

}

function removeItem(id) {

    con.connect(() => {
        var query = `delete from cart where prod_id=${id}`;
        con.query(query, (err, result, fields) => {
            if (err) console.log(err);
        })

    })
}

function updateCart(id, qty) {

    var query = `UPDATE cart SET qty=${qty} WHERE prod_id=${id}`;
    con.query(query, (err, result, fields) => {
        if (err) console.log(err);
    })
}

module.exports = {
    getCtgrs: getCtgrs,
    getProds: getProds,
    loadCart: loadCart,
    addToCart: addToCart,
    removeItem: removeItem,
    updateCart: updateCart
}
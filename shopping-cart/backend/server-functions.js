
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'gggg',
//     database: 'store'
// });


// function getCtgrs() {

//     return new Promise((resolve, reject) => {

//         con.connect(() => {
//             con.query('SELECT categorie FROM categories', (err, result, fields) => {

//                 resolve(result);

//             });
//         })

//     })
// }

// function loadLocal(path, type, req, res) {

//     fs.createReadStream(path).pipe(res);
    // stream.pipe(res);

    // fs.readFile(path, function (err, data) {
    // res.writeHead(200, { 'Content-Type': type });
    //     if (err) return ' ERROR'
    //     res.write(data);
    //     res.end();
    // })
// }

// var ctgrsKey = {
//     '/Mazda': 1,
//     '/Suzuki': 2,
//     '/Ford': 3,
//     '/Kia': 4,
//     '/Audi': 5
// }

// var ctgrsKeyArr = Object.keys(ctgrsKey);


// module.exports = {

//     // getCtgrs: getCtgrs,
//     // loadLocal: loadLocal,
//     ctgrsKey: ctgrsKey,
//     ctgrs: ctgrsKeyArr,
//     con: con
// }
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/airbnb"; 
// exports.url = "mongodb://localhost:27017/airbnb"; 
exports.connection = MongoClient.connect(url)
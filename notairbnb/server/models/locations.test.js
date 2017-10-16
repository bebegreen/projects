const test = require('ava'); 
const http = require('ava-http'); 
const server = require('../bin/www')
const locationsApi = 'http://localhost:3001/api/locations'; 

test("it should get xxxxxx", async t => { 
    const res = await http.get(locationsApi); 
    t.true(typeof res === "object"); 
    t.true(typeof res.body === "array"); 
})
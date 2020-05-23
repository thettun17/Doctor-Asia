const express = require('express');
const route = express.Router();
const catController = require('../controller/cat');

route.post('/cat', catController.createCat); // Create cat (accessed at POST http://localhost:300/cat)

route.get('/getcat/:name', catController.getCat) // get the cat with that name (accessed at GET localhost:3000/getcat/:name)

module.exports = route;
const express = require('express');
const { route } = require('./users');
const router = express.Router();
const makeup = require('../model/products.json')

router.get('/', (req, res) => { 
    res.send(makeup)
});



module.exports = router
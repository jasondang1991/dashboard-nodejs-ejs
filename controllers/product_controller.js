const express = require('express');
const router = express.Router();

// Call app_class() from Controller
const app_class = require('./app_class');
const kq = new app_class();

router.get('/index', (req, res) => {
    var main = 'products/main_products';
    var sidebar = kq.getSideBar(req.originalUrl);
    res.render('index', {main, sidebar});
});

router.get('/add', (req, res) => {
    var main = 'products/add_products';
    var sidebar = kq.getSideBar(req.originalUrl);
    res.render('index', {main, sidebar});
});

router.get('/edit/:id', (req, res) => {
    var main = 'products/edit_products';
    var sidebar = kq.getSideBar(req.originalUrl);
    res.render('index', {main, sidebar});
});

module.exports = router;
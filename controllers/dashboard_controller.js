const express = require('express');
const router = express.Router();

// Call app_class() from Controller
const app_class = require('./app_class');
const kq = new app_class();

router.get('/index', (req, res) => {

    var main = 'partials/dashboard';
    var sidebar = kq.getSideBar(req.originalUrl);
    res.render('index', {main, sidebar, name_module:''});

});

module.exports = router;
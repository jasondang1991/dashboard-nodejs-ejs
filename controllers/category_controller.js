const express = require('express');
const router = express.Router();

// Call app_class() from Controller
const app_class = require('./app_class');
const kq = new app_class();

router.get('/index', (req, res) => {

    var url = req.originalUrl;
    //var func_add = kq.get_str_FucntionAdd(url[2]);
    var buttonAddData = kq.button_add_data(url);

    var main = 'categories/main_categories';
    var sidebar = kq.getSideBar(req.originalUrl);

    res.render('index', {main, sidebar, buttonAddData, name_module:''});
});

router.get('/add', (req, res) => {
   
    var form = kq.get_str_form_categories();
    var main = 'categories/add_categories';
    var sidebar = kq.getSideBar(req.originalUrl);

    res.render('index', {main, sidebar, form});
});

router.get('/edit/:id', (req, res) => {

    var main = 'categories/edit_categories';
    var sidebar = kq.getSideBar(req.originalUrl);

    res.render('index', {main, sidebar});
});

module.exports = router;
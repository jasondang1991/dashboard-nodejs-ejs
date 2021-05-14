const express = require('express');
const router = express.Router();

// BCRYPT
const bcrypt =  require('bcryptjs');
const saltRound = 10;

// Call app_class() from Controller
// ::::::::::::::::::::::::::::::::::::
const app_class = require('./app_class');
const kq = new app_class();

// Call Model
// ::::::::::::::::::::::::::::::::::::
const user_model = require('../models/user_model');


// INDEX PAGE
// ::::::::::::::::::::::::::::::::::::
router.get('/index', (req, res) => {

        var url = req.originalUrl;
        //var func_add = kq.get_str_FucntionAdd(url[2]);
        var buttonAddData = kq.button_add_data(url);
        var sidebar = kq.getSideBar(req.originalUrl);
        
        user_model
        .find()
        .sort({_id: -1})
        .exec((err, data) => {
            if(err) res.send({kq: 0, err: err});
            //res.send({kq: 1, data: data});
        
        var str_table = kq.show_table_data(data);

        var main = 'users/main_users';
        res.render('index', {main, sidebar, buttonAddData, str_table, name_module:''});
    });
});

// ADD NEW USER PAGE
// ::::::::::::::::::::::::::::::::::::
router.get('/add', (req, res) => {
   
    var sidebar = kq.getSideBar(req.originalUrl);

    // Input Form List 
    var arr_form = [
        {name: 'username', element: 'input', type: 'text', required: 'required'},
        {name: 'password', element: 'input', type: 'password', required: 'required'},
        {name: 'email', element: 'input', type: 'email', required: 'required'},
        {name: 'phone', element: 'input', type: 'text', required: 'required'},
    ];

    var list_form = kq.show_form(arr_form);
    var main = 'users/add_users';
    res.render('index', {main, sidebar, list_form, name_module:kq.get_url_module(req.originalUrl)});
});


// EDIT USER PAGE
// ::::::::::::::::::::::::::::::::::::
router.get('/edit/:id', (req, res) => {

    var main = 'users/edit_users';
    var sidebar = kq.getSideBar(req.originalUrl);

    res.render('index', {main, sidebar});
});


router.post('/processForm', (req, res) => {

    let username, password, email, phone;

    username = req.body.username;
    password = req.body.password;
    email = req.body.email;
    phone = req.body.phone;

    // Encode Bcrypt Password
    bcrypt.genSalt(saltRound, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash) {
               
            let obj = {username, password:hash, email, phone};

            // Store Data to Database
            user_model.create(obj, (err, data) => {
                if(err) res.send({kq: 0, err});
                //res.send(data);
                res.send({kq: 1, message: 'Ok'});
            });
        });
    });
});

module.exports = router;
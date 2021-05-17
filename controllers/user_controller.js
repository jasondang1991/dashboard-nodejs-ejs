const express = require('express');
const router = express.Router();

// BCRYPT
const bcrypt = require('bcryptjs');
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
    var sidebar = kq.getSideBar(url);
    const name_module = kq.get_url_module(req.originalUrl);

    user_model
        .find()
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) res.send({ kq: 0, err: err });
            //res.send({kq: 1, data: data});

            var str_table = kq.show_table_data(data, name_module);

            var main = 'users/main_users';
            res.render('index', { main, sidebar, buttonAddData, str_table, name_module});
        });
});

// ADD NEW USER PAGE
// ::::::::::::::::::::::::::::::::::::
router.get('/add', (req, res) => {

    var sidebar = kq.getSideBar(req.originalUrl);

    // Input Form List 
    var arr_form = [
        { name: 'username', element: 'input', type: 'text', required: 'required', value: '', disabled:'' },
        { name: 'password', element: 'input', type: 'password', required: 'required', value: '', disabled:'' },
        { name: 'email', element: 'input', type: 'email', required: 'required', value: '', disabled:'' },
        { name: 'phone', element: 'input', type: 'text', required: 'required', value: '', disabled:'' },
    ];

    const name_module = kq.get_url_module(req.originalUrl);
    var list_form = kq.show_form(arr_form, name_module);

    var main = 'users/add_users';
    res.render('index', { main, sidebar, list_form, name_module });
});


// EDIT USER PAGE
// ::::::::::::::::::::::::::::::::::::
router.get('/edit/:id', (req, res) => {

    var sidebar = kq.getSideBar(req.originalUrl);
    const id = kq.get_user_id(req.originalUrl);

    user_model
        .find({ _id: id })
        .exec((err, data) => {

            if (err) res.send({ kq: 0, err: err });

            // Input Form List 
            var arr_form = [
                { name: 'username', element: 'input', type: 'text', required: 'required', value: data[0].username, disabled:'' },
                { name: 'password', element: 'input', type: 'password', required: 'required', value: '********', disabled:'disabled'},
                { name: 'email', element: 'input', type: 'email', required: 'required', value: data[0].email, disabled:'' },
                { name: 'phone', element: 'input', type: 'text', required: 'required', value: data[0].phone, disabled:'' },
            ];

            const name_module = kq.get_url_module(req.originalUrl);
            var list_form = kq.show_form(arr_form, name_module, id);

            var main = 'users/edit_users';
            res.render('index', { main, sidebar, list_form, name_module });
        });
});


router.post('/processForm', (req, res) => {

    let username, password, email, phone, id_hidden;

    username = req.body.username;
    password = req.body.password;
    email = req.body.email;
    phone = req.body.phone;

    id_hidden = req.body.id_hidden;

    if (id_hidden == '') {
        // check unique username
        user_model
            .find({ username })
            .exec((err, data) => {
                if (err) res.send({ kq: 0, err });

                if (data == '') {
                    // check unique email
                    user_model
                        .find({ email })
                        .exec((err, data) => {
                            if (err) res.send({ kq: 0, err });

                            if (data == '') {
                                // check unique phone
                                user_model
                                    .find({ phone })
                                    .exec((err, data) => {
                                        if (err) res.send({ kq: 0, err });

                                        if (data == '') {
                                            // Insert Record
                                            bcrypt.genSalt(saltRounds, function (err, salt) {
                                                bcrypt.hash(password, salt, function (err, hash) {

                                                    let obj = {username, password:hash, email, phone };

                                                    user_model
                                                        .create(obj, (err, data) => {
                                                            if (err) res.send({ kq: 0, err });
                                                            res.send({ kq: 1, message: 'ok', id_hidden });
                                                        });
                                                });
                                            });
                                        }
                                        else {
                                            res.send({ kq: 0, err: 'Phone Number is existed !' });
                                        }
                                    });
                            }
                            else {
                                res.send({ kq: 0, err: 'Email is existed !' });
                            }
                        });
                }
                else {
                    res.send({ kq: 0, err: 'Username is existed !' });
                }
            });
    }
    else {
        // Update Record User
        let obj = {username, email, phone };

        // check username

        // check email

        // check phone

        user_model
            .updateMany({ _id: id_hidden }, obj, (err, data) => {
                if (err) res.send({ kq: 0, err });

                res.send({ kq: 1, message: 'Ok', id_hidden });
            });
    }
});


router.post('/popup', (req, res)=>{
    const id = req.body.id;

    user_model
    .find({_id: id}, (err, data)=>{
        if(err) res.send({kq:0, err});

        res.send({kq:1, data:data[0]});
    })

});

module.exports = router;
const express = require('express');
const app = express();

// Set Up Body Parser
const ps = require('body-parser');
app.use(ps.urlencoded({ extended: false }))

app.use(ps.json());

// Set Up Statis Path
app.use('/', express.static('public'));

// Call Database
require('./database')

// Call To EJS
app.set('view engine', 'ejs');

// Call General Controller From Controller
// :::::::::::::::::::::::::::::::::::::::
const general_controller = require('./controllers/general_controller');
app.use('/', general_controller);

app.listen(3000, ()=> {
    console.log('Server Actived !');
});
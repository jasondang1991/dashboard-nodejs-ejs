const express = require('express');
const app = express();

// Set Up Statis Path
app.use(express.static('public'));

// Call To EJS
app.set('view engine', 'ejs');

// Call General Controller From Controller
const general_controller = require('./controllers/general_controller');
app.use('/', general_controller);

app.listen(3000, ()=> {
    console.log('Server Actived !');
});
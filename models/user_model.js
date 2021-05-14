const mongoose = require('mongoose');

// Create Schema:
const SchemaUser = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true
    },
    status: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
});

module.exports = mongoose.model('user', SchemaUser);
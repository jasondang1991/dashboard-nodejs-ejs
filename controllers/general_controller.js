const express = require('express');
const router = express.Router();

// Call Dashboard Controller Form Controller
const dashboard_controller = require('./dashboard_controller');
router.use('/admin/dashboard', dashboard_controller);

// Call Category Controller From Controller
const category_controller = require('./category_controller');
router.use('/admin/category', category_controller);

module.exports = router;
/**
 * Handles all the routes that lead to the dashboard
 */
const express = require('express');
const router = express.Router();

//Dashboard
router.get('/', (req, res, next) => {
    res.send('./public/dashboard/dashboard.html');
});
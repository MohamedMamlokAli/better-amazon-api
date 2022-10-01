const express = require('express');
const { dashboard, login, register } = require('../controllers/user');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/dashboard').get(dashboard);

module.exports = router;

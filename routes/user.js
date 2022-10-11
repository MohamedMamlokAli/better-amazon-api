const express = require('express');
const auth = require('../middlewares/auth');
const { dashboard, login, register } = require('../controllers/user');
const router = express.Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/dashboard').get(auth, dashboard);

module.exports = router;

const asyncwrapper = require('../middlewares/async');

const register = asyncwrapper(async (req, res) => {
  res.status(201).json({ msg: 'Account created.' });
});
const login = asyncwrapper(async (req, res) => {
  res.status(201).json({ msg: 'Account Logged in.' });
});
const dashboard = asyncwrapper(async (req, res) => {
  res.status(201).json({ msg: 'Dashboard data.' });
});

module.exports = {
  register,
  login,
  dashboard,
};

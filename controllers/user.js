const asyncwrapper = require('../middlewares/async');
const User = require('../models/user');
const register = asyncwrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.genJWT();
  res.status(201).json({ msg: 'Account created.', user, token });
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

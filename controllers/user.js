const asyncwrapper = require('../middlewares/async');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const register = asyncwrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign(
    { id: user._id, name: user.name, image: user.image },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
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

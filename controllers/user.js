const asyncwrapper = require('../middlewares/async');
const User = require('../models/user');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const register = asyncwrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.genJWT();
  res.status(201).json({ msg: 'Account created.', user, token });
});
const login = asyncwrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('User does not exist');
  }
  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    throw new UnauthenticatedError('Wrong password.');
  }
  const token = user.genJWT();

  res.status(200).json({
    msg: 'Account Logged in.',
    name: user.name,
    image: user.image,
    token,
  });
});
const dashboard = asyncwrapper(async (req, res) => {
  res.status(201).json({ msg: 'Dashboard data.' });
});

module.exports = {
  register,
  login,
  dashboard,
};

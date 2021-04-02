const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;
const Role = db.role;

const signIn = (req, res) => {};

const signUp = async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  // hashing Pass
  const hashedPass = bcrypt.hashSync(password, 10);

  const user = await User.create({
    username: username,
    password: hashedPass,
    email: email,
    firstname: firstname,
    lastname: lastname,
  });

  // Get instance role
  const role = await Role.findAll({ where: { role: "Customer" } });

  // Special Method/Mixin
  await user.setRoles(role);

  return res.status(200).json({ Message: "Register Successful" });
};

module.exports = {
  signUp: signUp,
  signIn: signIn,
};

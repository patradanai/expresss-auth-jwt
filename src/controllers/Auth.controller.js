const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const redisFunc = require("../libs/Redis");
const { v4: uuidv4 } = require("uuid");
const User = db.user;
const Role = db.role;
const expired = 60 * 60;

const signIn = async (req, res) => {
  const { username, password } = req.body;
  let storeProfile = {};

  // Check user,pass valid
  if (!username || !password) {
    return res.status(400).json({ message: "Invalid User or Password" });
  }

  // Find User in Db
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    return res.status(400).json({ message: "User not existing" });
  }

  // Compare Password
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return res.status(404).json({ message: "Password or User wrong" });
  }

  // Gen Token
  const token = jwt.sign(
    { id: user.id, name: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: 86400,
    }
  );

  // Get Role
  let roles = [];
  const resRoles = await user.getRoles();

  for (let i = 0; i < resRoles.length; i++) {
    roles.push("ROLE_" + resRoles[i].role);
  }

  const _id = uuidv4();

  // Store in Redis
  redisFunc.setCacheEx(
    user.id,
    JSON.stringify({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: storeProfile.username,
      token: token,
      roles: roles,
    }),
    expired
  );

  return res.status(200).json({ token: token, _id: _id });
};

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

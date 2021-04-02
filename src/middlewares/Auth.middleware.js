const db = require("../models");
const User = db.user;

const IsExistUser = async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ where: { username: username } });

  // Check Existing
  if (user) {
    res.status(400).json({ message: "User already existing..." });
  }
  next();
};

module.exports = {
  IsExistUser: IsExistUser,
};

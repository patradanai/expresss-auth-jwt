const db = require("../models");
const User = db.user;

const IsExistUser = async (req, res, next) => {
  const { username } = req.body;

  // Check Validation User
  if (!username) {
    return res.status(400).json("message : User Invalid JSON");
  }

  const user = await User.findOne({ where: { username: username } });

  // Check Existing
  if (user) {
    return res.status(400).json({ message: "User already existing..." });
  }

  next();
};

module.exports = {
  IsExistUser: IsExistUser,
};

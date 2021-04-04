const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const isAuthorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "No Token Proiving" });
  }

  // Split Header Bearer xxx
  const splitToken = authorization.split(" ");

  // Verify Token
  jwt.verify(splitToken[1], process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Unathorized!!!!" });
    }

    req.user = user.id;
    next();
  });
};

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
  isAuthorize: isAuthorize,
};

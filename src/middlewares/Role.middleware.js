const redisFunc = require("../libs/Redis");

const isAdmin = async (req, res, next) => {
  const user = req.user;

  const resCache = await redisFunc.getCache(user);

  // Check role
  if (!resCache?.roles.includes("ROLE_Admin")) {
    return res.status(400).json({ message: "Unthorization" });
  }
  next();
};

const isCustomer = (req, res, next) => {
  const user = req.user;

  const resCache = await redisFunc.getCache(user);

  // Check role
  if (!resCache?.roles.includes("ROLE_Customer")) {
    return res.status(400).json({ message: "Unthorization" });
  }
  next();
};

const isSupport = (req, res, next) => {
  const user = req.user;

  const resCache = await redisFunc.getCache(user);

  // Check role
  if (!resCache?.roles.includes("ROLE_Support")) {
    return res.status(400).json({ message: "Unthorization" });
  }
  next();
};

module.exports = {
  isAdmin: isAdmin,
  isCustomer: isCustomer,
  isSupport: isSupport,
};

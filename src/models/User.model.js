module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  return User;
};

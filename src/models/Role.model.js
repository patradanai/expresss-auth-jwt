module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("Role", {
    role: Sequelize.STRING,
  });
  return Role;
};

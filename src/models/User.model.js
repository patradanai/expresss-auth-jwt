module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {
      classMethods: {
        associate: (models) => {
          User.belongsToMany(models.Role, { through: "user_roles" });
        },
      },
    }
  );
  return User;
};

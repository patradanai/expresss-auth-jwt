const Sequelize = require("sequelize");
const configs = require("../configs/db.config");
let db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

db.user = require("./User.model")(sequelize, Sequelize);
db.role = require("./Role.model")(sequelize, Sequelize);

db.user.belongsToMany(db.role, { through: "user_roles" });
db.role.belongsToMany(db.user, { through: "user_roles" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

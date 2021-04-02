const Sequelize = require("sequelize");
let db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "path/to/database.sqlite",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

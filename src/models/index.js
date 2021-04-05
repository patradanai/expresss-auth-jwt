const Sequelize = require("sequelize");
const configs = require("../configs/db.config");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
let db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

try {
  fs.readdirSync(__dirname)
    .filter((file) => file != "index.js")
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize);
      db[model.name] = model;
    });
} catch (err) {
  console.log(err);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.user = require("./User.model")(sequelize,Sequelize)
// db.role = require("./Role.model")(sequelize,Sequelize)

// db.user.belongsToMany(db.role, { through: "user_roles" });
// db.role.belongsToMany(db.user, { through: "user_roles" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// Guide  Sequelize : https://web.archive.org/web/20141205221135/http://sequelizejs.com/articles/express
// Sequelize-cli : https://levelup.gitconnected.com/creating-sequelize-associations-with-the-sequelize-cli-tool-d83caa902233

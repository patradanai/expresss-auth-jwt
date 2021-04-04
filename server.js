require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./src/models");
// Init Sequelize
(async () => {
  await db.sequelize.sync();

  // Init Roles
  db.role.create({ role: "Admin" });
  db.role.create({ role: "Support" });
  db.role.create({ role: "Customer" });
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const Auth = require("./src/routers/Auth.routes");
const Dashboards = require("./src/routers/Dashboard.routes");
app.use("/auth", Auth);
app.use("/dashboard", Dashboards);

app.listen(port, (req, res) => {
  console.log(`Server Run on ${port}`);
});

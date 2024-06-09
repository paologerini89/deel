const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const {
  getContractById,
  checkProfileInContract,
} = require("./services/contract");
const { resNotFound, resUnathorized } = require("./utils");
const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/**
 * @returns contract by id
 */
app.get("/contracts/:id", getProfile, async (req, res) => {
  const { id } = req.params;
  const { id: profile_id } = req.profile;
  const contract = await getContractById(id);
  if (!contract) {
    return resNotFound(res);
  }
  if (!checkProfileInContract(contract, profile_id)) {
    return resUnathorized(res);
  }
  res.json(contract);
});
module.exports = app;

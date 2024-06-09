const express = require("express");
const router = express.Router();
const { getProfile } = require("../middleware/getProfile");
const { getContractById } = require("../services/contract");
const { resInternalServerError, resForbidden } = require("../utils");

router.get("/:id", getProfile, async (req, res) => {
  const { id } = req.params;
  const { profile } = req;
  try {
    const contract = await getContractById(id);
    if (!contract) {
      return resNotFound(res);
    }
    if (!checkProfileInContract(contract, profile.id)) {
      return resForbidden(res);
    }
    res.json(contract);
  } catch (error) {
    return resInternalServerError(res, error.message);
  }
});

module.exports = router;

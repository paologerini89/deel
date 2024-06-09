// src/services/contractService.js
const { Contract } = require("../model");
const { Op } = require("sequelize");

const getContractById = async (id) => {
  return await Contract.findOne({ where: { id } });
};

const getContractsByProfile = async (profileId) => {
  return await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: {
        [Op.ne]: "terminated",
      },
    },
  });
};

const checkProfileInContract = (contract, profileId) => {
  return contract.ClientId === profileId || contract.ContractorId === profileId;
};

module.exports = {
  getContractById,
  getContractsByProfile,
  checkProfileInContract,
};

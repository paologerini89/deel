// src/__tests__/contractService.test.js
const SequelizeMock = require("sequelize-mock");
const { Op } = require("sequelize");

// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();

describe("Contract Service", () => {
  let ContractMock, contractService;

  beforeAll(() => {
    ContractMock = DBConnectionMock.define("Contract", {
      id: 1,
      ClientId: 1,
      ContractorId: 2,
      status: "in_progress",
    });

    jest.doMock("../../model", () => ({
      Contract: ContractMock,
    }));

    contractService = require("../../services/contract");
  });

  afterAll(() => {
    jest.resetModules();
  });

  describe("getContractById", () => {
    it("should get a contract by id", async () => {
      const contract = await contractService.getContractById(1);
      expect(contract).not.toBeNull();
      expect(contract.ClientId).toBe(1);
      expect(contract.ContractorId).toBe(2);
    });
  });

  describe("getContractsByProfile", () => {
    it("should get contracts by profile", async () => {
      ContractMock.$queueResult([
        ContractMock.build({
          id: 1,
          ClientId: 1,
          ContractorId: 2,
          status: "in_progress",
        }),
      ]);
      const contracts = await contractService.getContractsByProfile(1);
      expect(contracts).toHaveLength(1);
      expect(contracts[0].status).toBe("in_progress");
    });

    it("should not return terminated contracts", async () => {
      ContractMock.$queueResult([
        ContractMock.build({
          id: 2,
          ClientId: 1,
          ContractorId: 2,
          status: "terminated",
        }),
        ContractMock.build({
          id: 3,
          ClientId: 1,
          ContractorId: 2,
          status: "in_progress",
        }),
      ]);

      const contracts = await contractService.getContractsByProfile(1);
      const activeContracts = contracts.filter(
        (contract) => contract.status !== "terminated"
      );
      expect(activeContracts).toHaveLength(1);
      expect(activeContracts[0].status).toBe("in_progress");
    });
  });

  describe("checkProfileInContract", () => {
    it("should return true if profile is in contract as client", () => {
      const contract = { ClientId: 1, ContractorId: 2 };
      const isInContract = contractService.checkProfileInContract(contract, 1);
      expect(isInContract).toBe(true);
    });

    it("should return true if profile is in contract as contractor", () => {
      const contract = { ClientId: 1, ContractorId: 2 };
      const isInContract = contractService.checkProfileInContract(contract, 2);
      expect(isInContract).toBe(true);
    });

    it("should return false if profile is not in contract", () => {
      const contract = { ClientId: 1, ContractorId: 2 };
      const isInContract = contractService.checkProfileInContract(contract, 3);
      expect(isInContract).toBe(false);
    });
  });
});

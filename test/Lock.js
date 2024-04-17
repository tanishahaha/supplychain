const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    

    const Tracking = await ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy();

    return { tracking };
  }

  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
  //     0x5FbDB2315678afecb367f032d93F642f64180aa3
  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });
  // });
 
});

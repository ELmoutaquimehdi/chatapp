const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("ChatAppModule", (m) => {
  

  const lock = m.contract("ChatApp", []);

  return { lock };
});

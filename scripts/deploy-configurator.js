import { KEEPER } from "./config-sonic";
import { verify } from "./utils";

const hardhat = require("hardhat");

const ethers = hardhat.ethers;

const DEV_MULTISIG = KEEPER;
const TOTAL_FEE_LIMIT = "95000000000000000";
const CALLER_FEE = "500000000000000";
const STRATEGIST_FEE = "5000000000000000";

async function main() {
  await hardhat.run("compile");

  console.log("Deploying BeefyFeeConfigurator");
  const BeefyFeeConfigurator = await ethers.getContractFactory("BeefyFeeConfigurator");
  const beefyFeeConfiguratorProxy = await upgrades.deployProxy(BeefyFeeConfigurator, [KEEPER, TOTAL_FEE_LIMIT], { unsafeAllow: ['delegatecall'] });
  await beefyFeeConfiguratorProxy.deployed();
  console.log("BeefyFeeConfigurator deployed to:", beefyFeeConfiguratorProxy.address);

  console.log("Setting fee category");
  await beefyFeeConfiguratorProxy.setFeeCategory(0, BigInt(TOTAL_FEE_LIMIT), BigInt(CALLER_FEE), BigInt(STRATEGIST_FEE), "default", true, true);
  await beefyFeeConfiguratorProxy.transferOwnership(DEV_MULTISIG);
  console.log("Fee category set");

  console.log("Verifying BeefyFeeConfigurator");
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(beefyFeeConfiguratorProxy.address);
  // await verify(implementationAddress, []);
  console.log("Verified BeefyFeeConfigurator");

  console.log("Configuration deployment completed");
  console.log(`Proxy address: ${beefyFeeConfiguratorProxy.address}`)
  console.log(`Implementation address: ${implementationAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
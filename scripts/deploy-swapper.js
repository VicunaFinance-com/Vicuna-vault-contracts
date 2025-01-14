import { KEEPER } from "./config-sonic";
import { verify } from "./utils";

const hardhat = require("hardhat");

const ethers = hardhat.ethers;

// Minimum acceptable percentage slippage output in 18 decimals
const SWAPPER_SLIPPAGE = "95000000000000000"; 

async function main() {
    await hardhat.run("compile");
    const deployer = await ethers.getSigner();
   
    console.log('Deploying BeefyOracleBalancer');
    const BeefyOracleBalancer = await ethers.getContractFactory("BeefyOracleBalancer");
    const beefyOracleBalancer = await BeefyOracleBalancer.deploy();
    await beefyOracleBalancer.deployed();
    console.log(`BeefyOracleBalancer deployed to ${beefyOracleBalancer.address}`);

    console.log("Verifying BeefyOracleBalancer");
    await verify(beefyOracleBalancer.address, []);
    console.log("Verified BeefyOracleBalancer");
    
    console.log('Deploying BeefyOracleChainlink');
    const BeefyOracleChainlink = await ethers.getContractFactory("BeefyOracleChainlink");
    const beefyOracleChainlink = await BeefyOracleChainlink.deploy();
    await beefyOracleChainlink.deployed();
    console.log(`BeefyOracleChainlink deployed to ${beefyOracleChainlink.address}`);

    console.log("Verifying BeefyOracleChainlink");
    await verify(beefyOracleChainlink.address, []);
    console.log("Verified BeefyOracleChainlink");

    console.log('Deploying BeefyOracleOverride');
    const BeefyOracleOverride = await ethers.getContractFactory("BeefyOracleOverride");
    const beefyOracleOverride = await BeefyOracleOverride.deploy();
    await beefyOracleOverride.deployed();
    console.log(`BeefyOracleOverride deployed to ${beefyOracleOverride.address}`);

    console.log("Verifying BeefyOracleOverride");
    await verify(beefyOracleOverride.address, []);
    console.log("Verified BeefyOracleOverride");

    console.log('Deploying BeefyOraclePyth');
    const BeefyOraclePyth = await ethers.getContractFactory("BeefyOraclePyth");
    const beefyOraclePyth = await BeefyOraclePyth.deploy();
    await beefyOraclePyth.deployed();
    console.log(`BeefyOraclePyth deployed to ${beefyOraclePyth.address}`);

    console.log("Verifying BeefyOraclePyth");
    await verify(beefyOraclePyth.address, []);
    console.log("Verified BeefyOraclePyth");

    console.log('Deploying BeefyOracleSolidly');
    const BeefyOracleSolidly = await ethers.getContractFactory("BeefyOracleSolidly");
    const beefyOracleSolidly = await BeefyOracleSolidly.deploy();
    await beefyOracleSolidly.deployed();
    console.log(`BeefyOracleSolidly deployed to ${beefyOracleSolidly.address}`);

    console.log("Verifying BeefyOracleSolidly");
    await verify(beefyOracleSolidly.address, []);
    console.log("Verified BeefyOracleSolidly");

    console.log('Deploying BeefyOracleUniswapV2');
    const BeefyOracleUniswapV2 = await ethers.getContractFactory("BeefyOracleUniswapV2");
    const beefyOracleUniswapV2 = await BeefyOracleUniswapV2.deploy();
    await beefyOracleUniswapV2.deployed();
    console.log(`BeefyOracleUniswapV2 deployed to ${beefyOracleUniswapV2.address}`);

    console.log("Verifying BeefyOracleUniswapV2");
    await verify(beefyOracleUniswapV2.address, []);
    console.log("Verified BeefyOracleUniswapV2");

    console.log('Deploying BeefyOracleUniswapV3');
    const BeefyOracleUniswapV3 = await ethers.getContractFactory("BeefyOracleUniswapV3");
    const beefyOracleUniswapV3 = await BeefyOracleUniswapV3.deploy();
    await beefyOracleUniswapV3.deployed();
    console.log(`BeefyOracleUniswapV3 deployed to ${beefyOracleUniswapV3.address}`);

    console.log("Verifying BeefyOracleUniswapV3");
    await verify(beefyOracleUniswapV3.address, []);
    console.log("Verified BeefyOracleUniswapV3");

    console.log('Deploying BeefyOracle');
    const BeefyOracle = await ethers.getContractFactory("BeefyOracle");
    const beefyOracle = await BeefyOracle.deploy();
    await beefyOracle.deployed();
    console.log(`BeefyOracle deployed to ${beefyOracle.address}`);

    console.log("Initializing BeefyOracle");
    await beefyOracle.initialize();
    console.log("BeefyOracle initialized");

    console.log("Waiting for chain propagation");
    for (let i = 0; i < 10; i++) {
        if (await beefyOracle.owner() === deployer.address) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Transferring ownership of BeefyOracle to ${KEEPER}`);
    await beefyOracle.transferOwnership(KEEPER);
    console.log("Ownership transferred");

    console.log("Verifying BeefyOracle");
    await verify(beefyOracle.address, []);
    console.log("Verified BeefyOracle");

    // Swapper
    console.log("Deploying BeefySwapper");
    const BeefySwapper = await ethers.getContractFactory("BeefySwapper");
    const beefySwapper = await BeefySwapper.deploy();
    await beefySwapper.deployed();
    console.log(`BeefySwapper deployed to ${beefySwapper.address}`);

    console.log("Initializing BeefySwapper");
    await beefySwapper.initialize(beefyOracle.address, SWAPPER_SLIPPAGE);
    console.log("BeefySwapper initialized");

    console.log("Waiting for chain propagation");
    for (let i = 0; i < 10; i++) {
        if (await beefySwapper.owner() === deployer.address) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`Transferring ownership of BeefySwapper to ${KEEPER}`);
    await beefySwapper.transferOwnership(KEEPER);
    console.log("Ownership transferred");

    console.log("Verifying BeefySwapper");
    await verify(beefySwapper.address, []);
    console.log("Verified BeefySwapper");

    console.log("Swapper deployment completed");
    console.log(`BeefyOracleBalancer: ${beefyOracleBalancer.address}`);
    console.log(`BeefyOracleChainlink: ${beefyOracleChainlink.address}`);
    console.log(`BeefyOracleOverride: ${beefyOracleOverride.address}`);
    console.log(`BeefyOraclePyth: ${beefyOraclePyth.address}`);
    console.log(`BeefyOracleSolidly: ${beefyOracleSolidly.address}`);
    console.log(`BeefyOracleUniswapV2: ${beefyOracleUniswapV2.address}`);
    console.log(`BeefyOracleUniswapV3: ${beefyOracleUniswapV3.address}`);
    console.log(`BeefyOracle: ${beefyOracle.address}`);
    console.log(`BeefySwapper: ${beefySwapper.address}`);
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
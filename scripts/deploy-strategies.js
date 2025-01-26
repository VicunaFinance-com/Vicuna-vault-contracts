const hardhat = require("hardhat");
const { verify } = require("./utils");
const ethers = hardhat.ethers;

async function main() {
    await hardhat.run("compile");

    // console.log('Deploying StrategyEqualizerFactory');
    // const StrategyEqualizerFactory = await ethers.getContractFactory("StrategyEqualizerFactory");
    // const strategyEqualizerFactory = await StrategyEqualizerFactory.deploy();
    // await strategyEqualizerFactory.deployed();
    // console.log(`StrategyEqualizerFactory deployed to ${strategyEqualizerFactory.address}`);

    // console.log("Verifying StrategyEqualizerFactory");
    // await verify(strategyEqualizerFactory.address, []);
    // console.log("Verified StrategyEqualizerFactory");

    console.log('Deploying StrategyIchi');
    const StrategyIchi = await ethers.getContractFactory("StrategyIchi");
    const strategyIchi = await StrategyIchi.deploy();
    await strategyIchi.deployed();
    console.log(`StrategyIchi deployed to ${strategyIchi.address}`);

    console.log("Verifying StrategyIchi");
    await verify(strategyIchi.address, []);
    console.log("Verified StrategyIchi");

    // console.log("Deploying StrategyBalancer");
    // const StrategyBalancer = await ethers.getContractFactory("StrategyBalancer");
    // const strategyBalancer = await StrategyBalancer.deploy();
    // await strategyBalancer.deployed();
    // console.log(`StrategyBalancer deployed to ${strategyBalancer.address}`);

    // console.log("Verifying StrategyBalancer");
    // await verify(strategyBalancer.address, []);
    // console.log("Verified StrategyBalancer");

    console.log("Deploying StrategyPassiveManagerShadow");
    const StrategyPassiveManagerShadow = await ethers.getContractFactory("StrategyPassiveManagerShadow");
    const strategyPassiveManagerShadow = await StrategyPassiveManagerShadow.deploy();
    await strategyPassiveManagerShadow.deployed();
    console.log(`StrategyPassiveManagerShadow deployed to ${strategyPassiveManagerShadow.address}`);

    // console.log("Verifying StrategyPassiveManagerShadow");
    // await verify(strategyPassiveManagerShadow.address, []);
    // console.log("Verified StrategyPassiveManagerShadow");

    console.log("Strategy deployment complete");
    // console.log(`StrategyEqualizerFactory: ${strategyEqualizerFactory.address}`);
    console.log(`StrategyIchi: ${strategyIchi.address}`);
    // console.log(`StrategyBalancer: ${strategyBalancer.address}`);
    console.log(`StrategyPassiveManagerShadow: ${strategyPassiveManagerShadow.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
import { WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT } from "./config-sonic";
import { verify } from "./utils";

const hardhat = require("hardhat");

const ethers = hardhat.ethers;

const FEE_CONFIGURATOR = "0xB2983BC2FCBC44cC2dE16e7fE9b6c4242a820A82"

async function main() {
    await hardhat.run("compile");

    // console.log("Deploying BeefyVaultV7");
    // const BeefyVaultV7 = await ethers.getContractFactory("BeefyVaultV7");
    // const beefyVaultV7 = await BeefyVaultV7.deploy();
    // await beefyVaultV7.deployed();
    // console.log(`BeefyVaultV7 deployed to ${beefyVaultV7.address}`);

    // console.log("Verifying BeefyVaultV7");
    // await verify(beefyVaultV7.address, []);
    // console.log("Verified BeefyVaultV7");

    // console.log("Deploying BeefyVaultV7Factory");
    // const BeefyVaultV7Factory = await ethers.getContractFactory("BeefyVaultV7Factory");
    // const beefyVaultV7Factory = await BeefyVaultV7Factory.deploy(beefyVaultV7.address, { gasLimit: 350000 });
    // await beefyVaultV7Factory.deployed();
    // console.log(`BeefyVaultV7Factory deployed to ${beefyVaultV7Factory.address}`);

    // console.log("Verifying BeefyVaultV7Factory");
    // await verify(beefyVaultV7Factory.address, [beefyVaultV7.address]);
    // console.log("Verified BeefyVaultV7Factory");

    // console.log("Deploying BeefyVaultConcLiq");
    // const BeefyVaultConcLiq = await ethers.getContractFactory("BeefyVaultConcLiq");
    // const beefyVaultConcLiq = await BeefyVaultConcLiq.deploy();
    // await beefyVaultConcLiq.deployed();
    // console.log(`BeefyVaultConcLiq deployed to ${beefyVaultConcLiq.address}`);

    // console.log("Verifying BeefyVaultConcLiq");
    // await verify(beefyVaultConcLiq.address, []);
    // console.log("Verified BeefyVaultConcLiq");

    console.log("Deploying BeefyVaultConcLiqFactory");
    const BeefyVaultConcLiqFactory = await ethers.getContractFactory("BeefyVaultConcLiqFactory");
    const beefyVaultConcLiqFactory = await BeefyVaultConcLiqFactory.deploy("0x603b554D3980e459A72C4729dECCDcac6ced6553", { gasLimit: 400000 });
    await beefyVaultConcLiqFactory.deployed();
    console.log(`BeefyVaultConcLiqFactory deployed to ${beefyVaultConcLiqFactory.address}`);

    console.log("Verifying BeefyVaultConcLiqFactory");
    await verify(beefyVaultConcLiqFactory.address, ["0x603b554D3980e459A72C4729dECCDcac6ced6553"]);
    console.log("Verified BeefyVaultConcLiqFactory");

    // console.log("Deploying StrategyFactory");
    // const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    // const strategyFactory = await StrategyFactory.deploy(WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, FEE_CONFIGURATOR);
    // await strategyFactory.deployed();
    // console.log(`StrategyFactory deployed to ${strategyFactory.address}`);

    // console.log("Verifying StrategyFactory");
    // await verify(strategyFactory.address, [WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, FEE_CONFIGURATOR]);
    // console.log("Verified StrategyFactory");

    // console.log("Deploying StrategyFactoryCLM");
    // const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    // const strategyFactoryCLM = await StrategyFactoryCLM.deploy(WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, FEE_CONFIGURATOR);
    // await strategyFactoryCLM.deployed();
    // console.log(`StrategyFactoryCLM deployed to ${strategyFactoryCLM.address}`);

    // console.log("Verifying StrategyFactoryCLM");
    // await verify(strategyFactoryCLM.address, [WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, FEE_CONFIGURATOR]);
    // console.log("Verified StrategyFactoryCLM");

    // console.log("Deploying BeefyRewardPool");
    // const BeefyRewardPool= await ethers.getContractFactory("BeefyRewardPool");
    // const beefyRewardPool = await BeefyRewardPool.deploy();
    // await beefyRewardPool.deployed();
    // console.log(`BeefyRewardPool deployed to ${beefyRewardPool.address}`);

    // console.log("Verifying BeefyRewardPool");
    // await verify(beefyRewardPool.address, []);
    // console.log("Verified BeefyRewardPool");
    
    // console.log("Deploying BeefyRewardPoolFactory");
    // const BeefyRewardPoolFactory = await ethers.getContractFactory("BeefyRewardPoolFactory");
    // const beefyRewardPoolFactory = await BeefyRewardPoolFactory.deploy(KEEPER);
    // await beefyRewardPoolFactory.deployed();
    // console.log(`BeefyRewardPoolFactory deployed to ${beefyRewardPoolFactory.address}`);

    // console.log("Verifying BeefyRewardPoolFactory");
    // await verify(beefyRewardPoolFactory.address, [KEEPER]);
    // console.log("Verified BeefyRewardPoolFactory");

    // console.log("Wating for block confirmations");
    // await new Promise(resolve => setTimeout(resolve, 30000));

    // console.log("Verifying BeefyVaultV7");
    // await hardhat.run("verify:verify", {
    //     address: beefyVaultV7.address,
    //     constructorArguments: [],
    // })
    // console.log("Verified BeefyVaultV7");

    // console.log("Verifying BeefyVaultV7Factory");
    // await hardhat.run("verify:verify", {
    //     address: beefyVaultV7Factory.address,
    //     constructorArguments: [beefyVaultV7.address],
    // });
    // console.log("Verified BeefyVaultV7Factory");

    // console.log("Verifying BeefyVaultConcLiq");
    // await hardhat.run("verify:verify", {
    //     address: beefyVaultConcLiq.address,
    //     constructorArguments: [],
    // });
    // console.log("Verified BeefyVaultConcLiq");

    // console.log("Verifying BeefyVaultConcLiqFactory");
    // await hardhat.run("verify:verify", {
    //     address: beefyVaultConcLiqFactory.address,
    //     constructorArguments: [beefyVaultConcLiq.address],
    // });
    // console.log("Verified BeefyVaultConcLiqFactory");

    // console.log("Verifying StrategyFactory");
    // await hardhat.run("verify:verify", {
    //     address: strategyFactory.address,
    //     constructorArguments: [WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, KEEPER],
    // });
    // console.log("Verified StrategyFactory");

    // console.log("Verifying StrategyFactoryCLM");
    // await hardhat.run("verify:verify", {
    //     address: strategyFactoryCLM.address,
    //     constructorArguments: [WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, KEEPER],
    // });
    // console.log("Verified StrategyFactoryCLM");

    // console.log("Verifying BeefyRewardPoolFactory");
    // await hardhat.run("verify:verify", {
    //     address: beefyRewardPoolFactory.address,
    //     constructorArguments: [KEEPER],
    // });
    // console.log("Verified BeefyRewardPoolFactory");

    console.log("Factories deployment completed");
    // console.log(`BeefyVaultV7Factory: ${beefyVaultV7Factory.address}`);
    console.log(`BeefyVaultConcLiqFactory: ${beefyVaultConcLiqFactory.address}`);
    // console.log(`BeefyVaultConcLiq: ${beefyVaultConcLiq.address}`);
    // console.log(`StrategyFactory: ${strategyFactory.address}`);
    // console.log(`StrategyFactoryCLM: ${strategyFactoryCLM.address}`);
    // console.log(`BeefyRewardPool: ${beefyRewardPool.address}`);
    // console.log(`BeefyRewardPoolFactory: ${beefyRewardPoolFactory.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// import VelodromeRouterAbi from "../data/abi/VelodromeRouter.json";
import { VIFI_BALANCER_STRATEGY, VIFI_EQUALIZER_STRATEGY, VIFI_SHADOW_CLM_STRATEGY, VIFI_REWARD_POOL } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// Factories
const BEEFY_REWARD_POOL_FACTORY = "0xd89f66c542c47B3d93b08f41f7a2E60DEBD898FC";
const STRATEGY_FACTORY = "0xBC07DA280dB1D53AAd638AEa08ca76604A86c174";
const STRATEGY_FACTORY_CLM = "0x233d105E53B2008C675Ca7dB6fd5f77CC7A14870";

// Reward Pools
const BEEFY_REWARD_POOL = "0x4E0d9BE3Bcf9696B3903688009307532b22b69BF";

// Strategies V7
const STRATEGY_EQUALIZER_FACTORY = "0x759f73E5b791B329327FD9966638f5B8AE4d01d6";
const STRATEGY_BALANCER = "0xB824A1800e97AcbE09eC40750d424A9996723b2e"

// Strategies CLM
const STRATEGY_SHADOW_CLM = "0x5771D22Ea4326A70D447010C73f470efc5B78f6e"


async function main() {
    await hardhat.run("compile");

    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = StrategyFactory.attach(STRATEGY_FACTORY);

    const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    const strategyFactoryCLM = StrategyFactoryCLM.attach(STRATEGY_FACTORY_CLM);

    const BeefyRewardPoolFactory = await ethers.getContractFactory("BeefyRewardPoolFactory");
    const beefyRewardPoolFactory = BeefyRewardPoolFactory.attach(BEEFY_REWARD_POOL_FACTORY);

    console.log(`Adding strategy ${VIFI_EQUALIZER_STRATEGY} to StrategyFactory`);
    await strategyFactory.addStrategy(VIFI_EQUALIZER_STRATEGY, STRATEGY_EQUALIZER_FACTORY);
    console.log(`Added strategy ${VIFI_EQUALIZER_STRATEGY} to StrategyFactory`);

    console.log(`Adding strategy ${VIFI_BALANCER_STRATEGY} to StrategyFactory`);
    await strategyFactory.addStrategy(VIFI_BALANCER_STRATEGY, STRATEGY_BALANCER);
    console.log(`Added strategy ${VIFI_BALANCER_STRATEGY} to StrategyFactory`);

    console.log(`Adding strategy ${VIFI_SHADOW_CLM_STRATEGY} to StrategyFactoryCLM`);
    await strategyFactoryCLM.addStrategy(VIFI_SHADOW_CLM_STRATEGY, STRATEGY_SHADOW_CLM);
    console.log(`Added strategy ${VIFI_SHADOW_CLM_STRATEGY} to StrategyFactoryCLM`);

    console.log(`Adding reward pool ${VIFI_REWARD_POOL} to BeefyRewardPoolFactory`);
    await beefyRewardPoolFactory.addRewardPool(VIFI_REWARD_POOL, BEEFY_REWARD_POOL);
    console.log(`Added reward pool ${VIFI_REWARD_POOL} to BeefyRewardPoolFactory`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
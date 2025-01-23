// import VelodromeRouterAbi from "../data/abi/VelodromeRouter.json";
import {
    VIFI_BALANCER_STRATEGY,
    VIFI_EQUALIZER_STRATEGY,
    VIFI_SHADOW_CLM_STRATEGY,
    VIFI_REWARD_POOL,
    VIFI_ICHI_EQUALIZER_STRATEGY
} from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// Factories
const BEEFY_REWARD_POOL_FACTORY = "0x725850631793FBDa9B1795142F858aa9d0C7aB28";
const STRATEGY_FACTORY = "0x41b886582f1b2d99437B24324574135534e1Db7E";
const STRATEGY_FACTORY_CLM = "0xB5840280Af4b505DCEa2cdB3894B63bBfA2AD4Be";

// Reward Pools
const BEEFY_REWARD_POOL = "0x3f0d69b71Ff066aFf0b2ca50080150a81e31Bf85";

// Strategies V7
const STRATEGY_EQUALIZER_FACTORY = "0x30e6C812D1d96f77C34456351Dd0d60a11fa1FCf";
const STRATEGY_BALANCER = "0x79e310D97E7c299d5EB5f5C37674dD5e4663b05b"
const STRATEGY_EQUALIZER_ICHI = "";

// Strategies CLM
const STRATEGY_SHADOW_CLM = "0xa816Aaab1Cf40CaF2c630885B9644608cBF8aE3f"


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

    console.log(`Adding strategy ${VIFI_ICHI_EQUALIZER_STRATEGY} to StrategyFactory`);
    await strategyFactory.addStrategy(VIFI_ICHI_EQUALIZER_STRATEGY, STRATEGY_EQUALIZER_ICHI);
    console.log(`Added strategy ${VIFI_ICHI_EQUALIZER_STRATEGY} to StrategyFactory`);

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
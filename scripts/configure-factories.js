// import VelodromeRouterAbi from "../data/abi/VelodromeRouter.json";
import { VIFI_BALANCER_STRATEGY, VIFI_EQUALIZER_STRATEGY, VIFI_SHADOW_CLM_STRATEGY, VIFI_ICHI_SWAPX_STRATEGY, VIFI_REWARD_POOL } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// Factories
const BEEFY_REWARD_POOL_FACTORY = "0x0EF66Aad2682c9DfBbCf73ea97752E8d0f4cBCF1";
const STRATEGY_FACTORY = "0x9Df377a9c4FadFb1f7Bde79B92E31033D06a05A4";
const STRATEGY_FACTORY_CLM = "0xdC8D3e8C4dA3FA5eE3882b319280cd53f33eE600";

// Reward Pools
const BEEFY_REWARD_POOL = "0xDDBfd7D6A6eA35a3e2835dc63067F9e3c250e3C4";

// Strategies V7
const STRATEGY_EQUALIZER_FACTORY = "0x88bC83d9Ed84754357cbadB2D0B6CF86304550D0";
const STRATEGY_BALANCER = "0x054C64b7922b848307315ECF6CA848dcd157713d"
const STRATEGY_ICHI = "0xc3a4fdcba79DB04b4C3e352b1C467B3Ba909D84A";

// Strategies CLM
const STRATEGY_SHADOW_CLM = "0xF1813BB9acA31AF4A935206d255a74A1731a4Bb9"


async function main() {
    await hardhat.run("compile");

    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = StrategyFactory.attach(STRATEGY_FACTORY);

    const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    const strategyFactoryCLM = StrategyFactoryCLM.attach(STRATEGY_FACTORY_CLM);

    const BeefyRewardPoolFactory = await ethers.getContractFactory("BeefyRewardPoolFactory");
    const beefyRewardPoolFactory = BeefyRewardPoolFactory.attach(BEEFY_REWARD_POOL_FACTORY);

    // console.log(`Adding strategy ${VIFI_EQUALIZER_STRATEGY} to StrategyFactory`);
    // await strategyFactory.addStrategy(VIFI_EQUALIZER_STRATEGY, STRATEGY_EQUALIZER_FACTORY);
    // console.log(`Added strategy ${VIFI_EQUALIZER_STRATEGY} to StrategyFactory`);

    // console.log(`Adding strategy ${VIFI_BALANCER_STRATEGY} to StrategyFactory`);
    // await strategyFactory.addStrategy(VIFI_BALANCER_STRATEGY, STRATEGY_BALANCER);
    // console.log(`Added strategy ${VIFI_BALANCER_STRATEGY} to StrategyFactory`);

    console.log(`Adding strategy ${VIFI_ICHI_SWAPX_STRATEGY} to StrategyFactory`);
    await strategyFactory.addStrategy(VIFI_ICHI_SWAPX_STRATEGY, STRATEGY_ICHI);
    console.log(`Added strategy ${VIFI_ICHI_SWAPX_STRATEGY} to StrategyFactory`);

    console.log(`Adding strategy ${VIFI_SHADOW_CLM_STRATEGY} to StrategyFactoryCLM`);
    await strategyFactoryCLM.addStrategy(VIFI_SHADOW_CLM_STRATEGY, STRATEGY_SHADOW_CLM);
    console.log(`Added strategy ${VIFI_SHADOW_CLM_STRATEGY} to StrategyFactoryCLM`);

    // console.log(`Adding reward pool ${VIFI_REWARD_POOL} to BeefyRewardPoolFactory`);
    // await beefyRewardPoolFactory.addRewardPool(VIFI_REWARD_POOL, BEEFY_REWARD_POOL);
    // console.log(`Added reward pool ${VIFI_REWARD_POOL} to BeefyRewardPoolFactory`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
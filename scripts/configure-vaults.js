// import VelodromeRouterAbi from "../data/abi/VelodromeRouter.json";
// import { , UINT256_MAX,  } from "./config-sonic";
import {
    VIFI_REWARD_POOL,
    EQUALIZER_ROUTER_O2, 
    STRATEGIST, 
    ZERO_ADDRESS, 
    VIFI_EQUALIZER_STRATEGY, 
    EQUAL, 
    VIFI_BALANCER_STRATEGY, 
    BEETS, 
    BALANCER_VAULT, 
    VIFI_SHADOW_CLM_STRATEGY
} from "./config-sonic";

const hardhat = require("hardhat");

const ethers = hardhat.ethers;

// Config
const VAULT_X = 0;
const BALANCER_PID = 1234567;

// Infrastucture
const BEEFY_SWAPPER = "0xEb67b9Afd591C1E35E69715C7Ccde65ABC8a8d23"

// Factories
const VAULT_V7_FACTORY = "0x2852649d37ED06a09faf95B6e885A7668AFCA0FD";
const VAULT_CLM_FACTORY = "0xe39F98205dc078c1f8d5561fe989E2A68dD5D392";
const STRATEGY_FACTORY = "0x41b886582f1b2d99437B24324574135534e1Db7E";
const STRATEGY_FACTORY_CLM = "0xB5840280Af4b505DCEa2cdB3894B63bBfA2AD4Be";
const REWARD_POOL_FACTORY = "0x725850631793FBDa9B1795142F858aa9d0C7aB28";

async function main() {
    await hardhat.run("compile");

    // const VaultCLMFactory = await ethers.getContractFactory("BeefyVaultConcLiqFactory");
    // const vaultCLMFactory = VaultCLMFactory.attach(VAULT_CLM_FACTORY);
    // const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    // const strategyFactoryCLM = StrategyFactoryCLM.attach(STRATEGY_FACTORY_CLM);

    const EQUALZIER_WS_USDC_GAUGE = "0x9b55Fbd8Cd27B81aCc6adfd42D441858FeDe4326"
    const EQUALIZER_WS_USDC_WANT = "0xdc85f86d5e3189e0d4a776e6ae3b3911ec7b0133"

    const EQUALZIER_WS_EQUAL_GAUGE = "0xe73267246Aa678A28D8e7B957135faEc1Db48aEF"
    const EQUALIZER_WS_EQUAL_WANT = "0x139f8eCC5fC8Ef11226a83911FEBecC08476cfB1"

    const EQUALIZER_WS_STS_GAUGE = "0x0DA2e6e170990dCDd046880fADC17ADF759B869e"
    const EQUALIZER_WS_STS_WANT = "0xB75C9073ea00AbDa9ff420b5Ae46fEe248993380"

    const EQUALIZER_USDC_WETH_GAUGE = "0xf8F2462A8Fa08Df933C0d6bbaf34108Fd7af526E"
    const EQUALIZER_USDC_WETH_WANT = "0xbCbC5777537c0D0462fb82BA48Eeb6cb361E853f"

    const BALANCER_WS_STS_GAUGE = "0x8476F3A8DA52092e7835167AFe27835dC171C133"
    const BALANCER_WS_STS_WANT = "0x374641076B68371e69D03C417DAc3E5F236c32FA"

    const BALANCER_USDC_SCUSD_GAUGE = "0x33b29bcf17e866a35941e07cbad54f1807b337f5"
    const BALANCER_USDC_SCUSD_WANT = "0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c"

    const BALANCER_SCUSD_STS_GAUGE = "0xa472438718Fe7785107fCbE584d39183a6420D36"
    const BALANCER_SCUSD_STS_WANT = "0x25ca5451CD5a50AB1d324B5E64F32C0799661891"
    
    const SHADOW_WS_USDC_POOL = "0x324963c267c354c7660ce8ca3f5f167e05649970"
    const SHADOW_WS_STS_POOL = "0xde861c8fc9ab78fe00490c5a38813d26e2d09c95"
    const SHADOW_WS_WETH_POOL = "0xb6d9b069f6b96a507243d501d1a23b3fccfc85d3"


    // await deployEqualizerVault("VIFI EQUALIZER wS-USDC", "Vifi wS-USDC", EQUALIZER_WS_USDC_WANT, EQUALZIER_WS_USDC_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-EQUAL", "Vifi wS-EQUAL", EQUALIZER_WS_EQUAL_WANT, EQUALZIER_WS_EQUAL_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-stS", "Vifi wS-stS", EQUALIZER_WS_STS_WANT, EQUALIZER_WS_STS_GAUGE);
    await deployEqualizerVault("VIFI EQUALIZER USDC-wETH", "Vifi USDC-wETH", EQUALIZER_USDC_WETH_WANT, EQUALIZER_USDC_WETH_GAUGE);

    // await deployBalancerVault("VIFI BALANCER wS-stS", "Vifi wS-stS", BALANCER_WS_STS_WANT, BALANCER_WS_STS_GAUGE, ZERO_ADDRESS, BALANCER_VAULT);
    // await deployBalancerVault("VIFI BALANCER USDC-SCUSD", "Vifi USDC-scUSD", BALANCER_USDC_SCUSD_WANT, BALANCER_USDC_SCUSD_GAUGE, ZERO_ADDRESS, BALANCER_VAULT);
    // await deployBalancerVault("VIFI BALANCER scUSD-stS", "Vifi scUSD-stS", BALANCER_SCUSD_STS_WANT, BALANCER_SCUSD_STS_GAUGE, ZERO_ADDRESS, BALANCER_VAULT);

    // await deployShadowClmVault("VIFI SHADOW CLM WS-USDC", "Vifi wS-USDC SCLM", SHADOW_WS_USDC_POOL, ZERO_ADDRESS, 17);
    // await deployShadowClmVault("VIFI SHADOW CLM WS-STS", "Vifi wS-stS SCLM", SHADOW_WS_STS_POOL, ZERO_ADDRESS, 17);
    // await deployShadowClmVault("VIFI SHADOW CLM WS-WETH", "Vifi wS-wETH SCLM", SHADOW_WS_WETH_POOL, ZERO_ADDRESS, 17);

}

async function deployEqualizerVault(name, symbol, want, gauge) {
    const VaultV7Factory = await ethers.getContractFactory("BeefyVaultV7Factory");
    const vaultV7Factory = VaultV7Factory.attach(VAULT_V7_FACTORY);
    const BeefyVaultV7 = await ethers.getContractFactory("BeefyVaultV7");
    const vault = BeefyVaultV7.attach(await clone(() => vaultV7Factory.cloneVault()));
    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = StrategyFactory.attach(STRATEGY_FACTORY);
    const StrategyEqualizerFactory = await ethers.getContractFactory("StrategyEqualizerFactory");
    const strategy = StrategyEqualizerFactory.attach(await clone(() => strategyFactory.createStrategy(VIFI_EQUALIZER_STRATEGY)));

    const addresses = {
        strategist: STRATEGIST,
        factory: STRATEGY_FACTORY,
        swapper: BEEFY_SWAPPER,
        depositToken: ZERO_ADDRESS,
        vault: vault.address,
        want: want
    }

    console.log("Initializing Equalizer strategy");
    await strategy.initialize(gauge, EQUALIZER_ROUTER_O2, [EQUAL], addresses);
    console.log("Initialized Equalizer strategy");

    console.log("Initializing Equalizer vault");
    await vault.initialize(strategy.address, name, symbol, VAULT_X);
    console.log("Initialized Equalizer vault");

    console.log(`Equalizer vault for ${name} symbol: ${symbol} deployed`);
    console.log(`Equalizer vault: ${vault.address}`);
    console.log(`Equalizer strategy: ${strategy.address}`);
}

async function deployBalancerVault(name, symbol, want, gauge, booster, balancerVault) {
    const VaultV7Factory = await ethers.getContractFactory("BeefyVaultV7Factory");
    const vaultV7Factory = VaultV7Factory.attach(VAULT_V7_FACTORY);
    const BeefyVaultV7 = await ethers.getContractFactory("BeefyVaultV7");
    const vault = BeefyVaultV7.attach(await clone(() => vaultV7Factory.cloneVault()));
    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = StrategyFactory.attach(STRATEGY_FACTORY);
    const StrategyBalancer = await ethers.getContractFactory("StrategyBalancer");
    const strategy = StrategyBalancer.attach(await clone(() => strategyFactory.createStrategy(VIFI_BALANCER_STRATEGY)));

    const addresses = {
        strategist: STRATEGIST,
        factory: STRATEGY_FACTORY,
        swapper: BEEFY_SWAPPER,
        depositToken: want,
        vault: vault.address,
        want: want
    }

    console.log("Initializing Balancer strategy");
    await strategy.initialize(gauge, booster, balancerVault, BALANCER_PID, [BEETS], addresses);
    console.log("Initialized Balancer strategy");

    console.log("Initializing Balancer vault");
    await vault.initialize(strategy.address, name, symbol, VAULT_X);
    console.log("Initialized Balancer vault");

    console.log(`Balancer vault for ${name} symbol: ${symbol} deployed`);
    console.log(`Balancer vault: ${vault.address}`);
    console.log(`Balancer strategy: ${strategy.address}`);
}

async function deployShadowClmVault(name, symbol, pool, gauge, positionWidth) {
    const VaultCLMFactory = await ethers.getContractFactory("BeefyVaultConcLiqFactory");
    const vaultCLMFactory = VaultCLMFactory.attach(VAULT_CLM_FACTORY);
    const BeefyVaultConcLiq = await ethers.getContractFactory("BeefyVaultConcLiq");
    const vault = BeefyVaultConcLiq.attach(await clone(() => vaultCLMFactory.cloneVault()));
    const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    const strategyFactoryCLM = StrategyFactoryCLM.attach(STRATEGY_FACTORY_CLM);
    const StrategyPassiveManagerShadow = await ethers.getContractFactory("StrategyPassiveManagerShadow");
    const strategy = StrategyPassiveManagerShadow.attach(await clone(() => strategyFactoryCLM.createStrategy(VIFI_SHADOW_CLM_STRATEGY)));
    const BeefyRewardPoolFactory = await ethers.getContractFactory("BeefyRewardPoolFactory");
    const beefyRewardPoolFactory = BeefyRewardPoolFactory.attach(REWARD_POOL_FACTORY);
    const BeefyRewardPool = await ethers.getContractFactory("BeefyRewardPool");
    const rewardPool = BeefyRewardPool.attach(await clone(() => beefyRewardPoolFactory.createRewardPool(VIFI_REWARD_POOL)));

    const addresses = {
        strategist: STRATEGIST,
        factory: STRATEGY_FACTORY_CLM,
        unirouter: BEEFY_SWAPPER,
        vault: vault.address,
    }

    console.log("Initializing Shadow CLM strategy");
    await strategy.initialize(pool, gauge, rewardPool.address, positionWidth, addresses);
    console.log("Initialized Shadow CLM strategy");

    console.log("Initializing Shadow CLM vault");
    await vault.initialize(strategy.address, name, symbol);
    console.log("Initialized Shadow CLM vault");

    console.log("Initializing Shadow CLM reward pool");
    await rewardPool.initialize(vault.address, `Reward ${name}`, `r${symbol}`);
    console.log("Initialized Shadow CLM reward pool");

    console.log(`Shadow CLM vault for ${name} symbol: ${symbol} deployed`);
    console.log(`Shadow CLM vault: ${vault.address}`);
    console.log(`Shadow CLM strategy: ${strategy.address}`);
    console.log(`Shadow CLM reward pool: ${rewardPool.address}`);
}

async function clone(handler) {
    console.log("Cloning contract");
    const tx = await handler();
    const receipt = await tx.wait();
    const address = receipt.events.filter((e) => e.event === "ProxyCreated")[0].args.proxy;
    if (!address) {
        throw new Error("Failed to clone contract");
    }
    return address;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
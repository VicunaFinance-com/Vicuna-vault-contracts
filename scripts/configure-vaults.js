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
const BEEFY_SWAPPER = "0x46112C2618B57a4e03492E727957123E5097dF25"

// Factories
const VAULT_V7_FACTORY = "0xffC494f0ED0C4d1ba5B830bcc8CbdC969b36A3Fc";
const VAULT_CLM_FACTORY = "0x2917597659acfB48CB762cc0d1817c28AB614f3b";
const STRATEGY_FACTORY = "0x9Df377a9c4FadFb1f7Bde79B92E31033D06a05A4";
const STRATEGY_FACTORY_CLM = "0xdC8D3e8C4dA3FA5eE3882b319280cd53f33eE600";
const REWARD_POOL_FACTORY = "0x0EF66Aad2682c9DfBbCf73ea97752E8d0f4cBCF1";

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

    const EQUALIZER_WS_BRUSH_GAUGE = "0xA4Df0a210a5E242BE68E8a2b780ecc854ADD3583"
    const EQUALIZER_WS_BRUSH_WANT = "0x38cFA6cB37d074B6E954C52d10a4cf0e4268607b"

    const EQUALIZER_WS_FSONIC_GAUGE = "0xad2131601f22D15cBbc6267ACc16e4035FfC8bF6"
    const EQUALIZER_WS_FSONIC_WANT = "0x822B6E8D0A3EAf306A6A604f6AF370F6d893292d"

    const EQUALIZER_WS_GOGLZ_GAUGE = "0x9E06a65E545b4Bd762158f6Bc34656DEe9693a4D"
    const EQUALIZER_WS_GOGLZ_WANT = "0x832e2bb9579f6fF038d3E704Fa1BB5B6B18a6521"

    const EQUALIZER_WS_FIERY_GAUGE = "0x4829595A02356f585db457961b7C950d4890b65E"
    const EQUALIZER_WS_FIERY_WANT = "0xeFEeD7deAEa6dceb1A777AD5Cc8C6b1329B71afd"

    const EQUALIZER_WS_ECO_GAUGE = "0xE9DB22DC69129FD131CB744e8E638A8FA084e66e"
    const EQUALIZER_WS_ECO_WANT = "0x93B3Db87d07e4925274174CbD650EFdcd8885Cc6"

    const EQUALIZER_WS_ANON_GAUGE = "0xD8aD0586412eD09bDe9211d2542348404ee7ADa8"
    const EQUALIZER_WS_ANON_WANT = "0xA16664163f13540CD45d0A67654bCB99BF511c3f"

    const EQUALIZER_WS_HEDGY_GAUGE = "0x6EcE627A8143f8c32d100F0D8AA54385272d2103"
    const EQUALIZER_WS_HEDGY_WANT = "0x04F1b3Ce71Cde381097A0601213DEF55CF336589"

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
    // await deployEqualizerVault("VIFI EQUALIZER ws-BRUSH", "Vifi wS-BRUSH", EQUALIZER_WS_BRUSH_WANT, EQUALIZER_WS_BRUSH_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-fSONIC", "Vifi wS-fSONIC", EQUALIZER_WS_FSONIC_WANT, EQUALIZER_WS_FSONIC_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-GOGLZ", "Vifi wS-GOGLZ", EQUALIZER_WS_GOGLZ_WANT, EQUALIZER_WS_GOGLZ_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-FIERY", "Vifi wS-FIERY", EQUALIZER_WS_FIERY_WANT, EQUALIZER_WS_FIERY_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-ECO", "Vifi wS-ECO", EQUALIZER_WS_ECO_WANT, EQUALIZER_WS_ECO_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-Anon", "Vifi wS-Anon", EQUALIZER_WS_ANON_WANT, EQUALIZER_WS_ANON_GAUGE);
    // await deployEqualizerVault("VIFI EQUALIZER ws-HEDGY", "Vifi wS-HEDGY", EQUALIZER_WS_HEDGY_WANT, EQUALIZER_WS_HEDGY_GAUGE);
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
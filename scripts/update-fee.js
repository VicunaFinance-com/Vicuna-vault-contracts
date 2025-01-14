const hardhat = require("hardhat");

const ethers = hardhat.ethers;

const VICUNA_MAIN_TREASURY = "0xad1bB693975C16eC2cEEF65edD540BC735F8608B"

const BEEFY_FEE_CONFIGURATOR = "0xB2983BC2FCBC44cC2dE16e7fE9b6c4242a820A82"
const STRATEGY_FACTORY = "0x9Df377a9c4FadFb1f7Bde79B92E31033D06a05A4";
const STRATEGY_FACTORY_CLM = "0xdC8D3e8C4dA3FA5eE3882b319280cd53f33eE600";


async function main() {
    await hardhat.run("compile");

    const BeefyFeeConfigurator = await ethers.getContractFactory("BeefyFeeConfigurator");
    const beefyFeeConfigurator = BeefyFeeConfigurator.attach(BEEFY_FEE_CONFIGURATOR);

    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = StrategyFactory.attach(STRATEGY_FACTORY);

    const StrategyFactoryCLM = await ethers.getContractFactory("StrategyFactoryCLM");
    const strategyFactoryCLM = StrategyFactoryCLM.attach(STRATEGY_FACTORY_CLM);

    console.log(`Setting Beefy fee recipient to ${VICUNA_MAIN_TREASURY}`);
    await strategyFactory.setBeefyFeeRecipient(VICUNA_MAIN_TREASURY);
    await strategyFactoryCLM.setBeefyFeeRecipient(VICUNA_MAIN_TREASURY);
    console.log(`Set Beefy fee recipient to ${VICUNA_MAIN_TREASURY}`);

    const TOTAL_FEE_LIMIT = "70000000000000000";
    const STRATEGIST_FEE = "0";
    const CALLER_FEE = "500000000000000";

    console.log(`Setting fee category, total fee limit: ${TOTAL_FEE_LIMIT}, strategist fee: ${STRATEGIST_FEE}, caller fee: ${CALLER_FEE}`);
    await beefyFeeConfigurator.setFeeCategory(0 , TOTAL_FEE_LIMIT, CALLER_FEE, STRATEGIST_FEE, "default", true, true);
    console.log(`Set fee category, total fee limit: ${TOTAL_FEE_LIMIT}, strategist fee: ${STRATEGIST_FEE}, caller fee: ${CALLER_FEE}`);    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
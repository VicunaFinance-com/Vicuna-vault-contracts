import { BEETS, EQUAL, BEETS_STAKED_SONIC, EQUALIZER_USDC_EQUAL_PAIR, PYTH_CENTRAL_ORACLE, PYTH_USDC_USD_PRICE_FEED, PYTH_WETH_USD_PRICE_FEED, USDC, WAGMI_UNISWAP_V3_USDC_WS_PAIR, WRAPPED_NATIVE, WRAPPER_ETH, EQUALIZER_WS_STS_PAIR, STACKED_SONIC_SYMPHONY, RINGING_STABLE_BEETS, PUT_A_RING_ON_IT } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// Infrastucture
const BEEFY_ORACLE = "0xE7E4c12772432d4c744314bFb83682684D1ec4ad";
const BEEFY_ORACLE_BALANCER = "0x354A69Ef542842f864BAffcf9bA7a21Fd31Aeb16";
const BEEFY_PYTH_ORACLE = "0x06De26E3191d97624F47D51dfAD80e9Eb6DD9dE6";
const BEEFY_UNISWAP_V3_ORACLE = "0x99eEd78D51709b670d4247236bA14C48B17Fc913";
const BEEFY_SOLIDLY_ORACLE = "0x3b706368Bd073CFD81AD6f5972aC45EFAEfDAf4e"
const BEEFY_ORACLE_OVERRIDE = "0x2bDf7bE3e24E20a973F68BAf886b25600e4Ec47b"

const BEEFY_ORACLE_OVERRIDE_2 = "0xdDC640215E14fC5E9589648b8901ec7f8B678adD"

// Others
const UNISWAP_TWAP = 300;
const SOLIDLY_TWAP = 4;

async function main() {
    await hardhat.run("compile");

    const BeefyOracle = await ethers.getContractFactory("BeefyOracle");
    const beefyOracle = BeefyOracle.attach(BEEFY_ORACLE);

    // console.log("Setting Oracle for wETH using Pyth");
    // await beefyOracle.setOracle(WRAPPER_ETH, BEEFY_PYTH_ORACLE, pythCallData(PYTH_WETH_USD_PRICE_FEED));
    // console.log("Oracle set for wETH");

    // console.log("Setting Oracle for USDC using Pyth");
    // await beefyOracle.setOracle(USDC, BEEFY_PYTH_ORACLE, pythCallData(PYTH_USDC_USD_PRICE_FEED));
    // console.log("Oracle set for USDC");

    // console.log("Waiting for chain propagation");
    // await new Promise(resolve => setTimeout(resolve, 5000))

    // console.log("Setting Oracle for wS using Wagmi Uniswap V3");
    // await beefyOracle.setOracle(WRAPPED_NATIVE, BEEFY_UNISWAP_V3_ORACLE, uniswapV3CallData([USDC, WRAPPED_NATIVE], [WAGMI_UNISWAP_V3_USDC_WS_PAIR], [UNISWAP_TWAP]));
    // console.log("Oracle set for wS");

    // console.log("Waiting for chain propagation");
    // await new Promise(resolve => setTimeout(resolve, 5000))

    // console.log("Setting Oracle for EQUAL using Equalizer");
    // await beefyOracle.setOracle(EQUAL, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, EQUAL], [EQUALIZER_USDC_EQUAL_PAIR], [SOLIDLY_TWAP]));
    // console.log("Oracle set for EQUAL");

    // console.log("Setting Oracle for stS using Equalizer");
    // await beefyOracle.setOracle(STS, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, STS], [EQUALIZER_WS_STS_PAIR], [SOLIDLY_TWAP]));
    // console.log("Oracle set for stS");

    // console.log("Setting Oracle for BEETS using Oracle Override");
    // await beefyOracle.setOracle(BEETS, BEEFY_ORACLE_OVERRIDE_2, []);
    // console.log("Oracle set for BEETS");

    // console.log("Setting Oracle for Stacked Sonic Symphony using Oracle Override");
    // await beefyOracle.setOracle(STACKED_SONIC_SYMPHONY, BEEFY_ORACLE_OVERRIDE, []);
    // console.log("Oracle set for Stacked Sonic Symphony");

    // console.log("Setting Oracle for Ringing Stable Beets using Oracle Override");
    // await beefyOracle.setOracle(RINGING_STABLE_BEETS, BEEFY_ORACLE_OVERRIDE, []);
    // console.log("Oracle set for Ringing Stable Beets");

    console.log("Setting Oracle for Put A Ring On It using Oracle Override");
    await beefyOracle.setOracle(PUT_A_RING_ON_IT, BEEFY_ORACLE_OVERRIDE, []);
    console.log("Oracle set for Put A Ring On It");
}

function uniswapV3CallData(tokens, pairs, twaps) {
    return ethers.utils.defaultAbiCoder.encode(
        ["address[]","address[]","uint256[]"],
        [tokens, pairs, twaps]
    );
}

function pythCallData(pricefeed) {
    return ethers.utils.defaultAbiCoder.encode(["address", "bytes32"], [PYTH_CENTRAL_ORACLE, pricefeed]);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
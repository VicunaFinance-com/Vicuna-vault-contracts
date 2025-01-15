import { BEETS, EQUAL, BEETS_STAKED_SONIC, EQUALIZER_USDC_EQUAL_PAIR, PYTH_CENTRAL_ORACLE, PYTH_USDC_USD_PRICE_FEED, PYTH_WETH_USD_PRICE_FEED, USDC, WAGMI_UNISWAP_V3_USDC_WS_PAIR, WRAPPED_NATIVE, WRAPPER_ETH, EQUALIZER_WS_STS_PAIR, STACKED_SONIC_SYMPHONY, RINGING_STABLE_BEETS, PUT_A_RING_ON_IT } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// BeefyFeeConfigurator: 0x4280521636014aad719540766eb4b24BAe589163
// BeefyVaultV7Factory: 0x4FCBC170A0A58B77c1384E35fdd5529A5721099f
// BeefyVaultConcLiqFactory: 0x48d38484cf74903F6727C039424cCD2b0185Ee7f
// BeefyOracleChainlink: 0x4555e305C4B1455ec3B1F7208d4272B6C8aF0eDa
// BeefyOracleUniswapV2: 0x8D787EE687F385D73204484342E57E6F1e5Eb7BA
// BeefySwapper: 0xF993b888c7833A2e72D88503ADaA96F0f4a59711

// Infrastucture
const BEEFY_ORACLE = "0x8964Cf7cd27A3F4135330931e49dbF2b999282f7";
const BEEFY_ORACLE_BALANCER = "0x9d803D0fd17a26DF280F254Fb4B93Eab7898C42A";
const BEEFY_PYTH_ORACLE = "0x6144D4E065B6107Cb8A92c9780631570e40DcE4F";
const BEEFY_UNISWAP_V3_ORACLE = "0x3D27906c6b304925710f72264Da3fd1825aED9E9";
const BEEFY_SOLIDLY_ORACLE = "0x8655aF7eD14B0A415eEe35d26De2f4Cdc9B471F9"
const BEEFY_ORACLE_OVERRIDE = "0x1Cf181BbE3038B4452B0C7CA924D5491f603156B"
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

    console.log("Setting Oracle for stS using Equalizer");
    await beefyOracle.setOracle(BEETS_STAKED_SONIC, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, BEETS_STAKED_SONIC], [EQUALIZER_WS_STS_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for stS");

    console.log("Setting Oracle for BEETS using Oracle Override");
    await beefyOracle.setOracle(BEETS, BEEFY_ORACLE_OVERRIDE_2, []);
    console.log("Oracle set for BEETS");

    console.log("Setting Oracle for Stacked Sonic Symphony using Oracle Override");
    await beefyOracle.setOracle(STACKED_SONIC_SYMPHONY, BEEFY_ORACLE_OVERRIDE, []);
    console.log("Oracle set for Stacked Sonic Symphony");

    console.log("Setting Oracle for Ringing Stable Beets using Oracle Override");
    await beefyOracle.setOracle(RINGING_STABLE_BEETS, BEEFY_ORACLE_OVERRIDE, []);
    console.log("Oracle set for Ringing Stable Beets");

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
import { BEETS, EQUAL, BEETS_STAKED_SONIC, EQUALIZER_USDC_EQUAL_PAIR, PYTH_CENTRAL_ORACLE, PYTH_USDC_USD_PRICE_FEED, PYTH_WETH_USD_PRICE_FEED, USDC, WAGMI_UNISWAP_V3_USDC_WS_PAIR, WRAPPED_NATIVE, WRAPPER_ETH, EQUALIZER_WS_STS_PAIR, STACKED_SONIC_SYMPHONY, RINGING_STABLE_BEETS, PUT_A_RING_ON_IT, EQUALIZER_WS_BRUSH_PAIR, EQUALIZER_WS_FSONIC_PAIR, EQUALIZER_WS_GOGLZ_PAIR, EQUALIZER_WS_FIERY_PAIR, EQUALIZER_WS_ECO_PAIR, EQUALIZER_WS_ANON_PAIR, EQUALIZER_WS_HEDGY_PAIR, BRUSH, FSONIC, FIERY, ECO, GOGLZ, ANON, HEDGY } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

// Infrastucture
const BEEFY_ORACLE = "0x679d46F481e57BDaF081c1f8dB745ccF05F151F7";
const BEEFY_ORACLE_BALANCER = "0x78fbf5EA24AC588823f6c25C533ef89a800728ae";
const BEEFY_PYTH_ORACLE = "0xe4826DA911A142Db7C5142e7C0ce56685695bfD7";
const BEEFY_UNISWAP_V3_ORACLE = "0x24f1d58ab77b5adf5C6506Bb1F5EDA481C3755F6";
const BEEFY_SOLIDLY_ORACLE = "0xcCe4332fB40dCb40B5AE213eA36E35386C22Af9b"
const BEEFY_ORACLE_OVERRIDE = "0x59C256fBDcabc6a6bEAeBD8d10e02AAEf9cfCB11"
const BEEFY_ORACLE_OVERRIDE_2 = "0xdDC640215E14fC5E9589648b8901ec7f8B678adD"

// Others
const UNISWAP_TWAP = 300;
const SOLIDLY_TWAP = 4;

async function main() {
    await hardhat.run("compile");

    const BeefyOracle = await ethers.getContractFactory("BeefyOracle");
    const beefyOracle = BeefyOracle.attach(BEEFY_ORACLE);

    console.log("Setting Oracle for wETH using Pyth");
    await beefyOracle.setOracle(WRAPPER_ETH, BEEFY_PYTH_ORACLE, pythCallData(PYTH_WETH_USD_PRICE_FEED));
    console.log("Oracle set for wETH");

    console.log("Setting Oracle for USDC using Pyth");
    await beefyOracle.setOracle(USDC, BEEFY_PYTH_ORACLE, pythCallData(PYTH_USDC_USD_PRICE_FEED));
    console.log("Oracle set for USDC");

    console.log("Waiting for chain propagation");
    await new Promise(resolve => setTimeout(resolve, 5000))

    console.log("Setting Oracle for wS using Wagmi Uniswap V3");
    await beefyOracle.setOracle(WRAPPED_NATIVE, BEEFY_UNISWAP_V3_ORACLE, uniswapV3CallData([USDC, WRAPPED_NATIVE], [WAGMI_UNISWAP_V3_USDC_WS_PAIR], [UNISWAP_TWAP]));
    console.log("Oracle set for wS");

    console.log("Waiting for chain propagation");
    await new Promise(resolve => setTimeout(resolve, 5000))

    console.log("Setting Oracle for EQUAL using Equalizer");
    await beefyOracle.setOracle(EQUAL, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, EQUAL], [EQUALIZER_USDC_EQUAL_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for EQUAL");

    console.log("Setting Oracle for stS using Equalizer");
    await beefyOracle.setOracle(BEETS_STAKED_SONIC, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, BEETS_STAKED_SONIC], [EQUALIZER_WS_STS_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for stS");

    console.log("Setting Oracle for BRUSH using Equalizer");
    await beefyOracle.setOracle(BRUSH, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, BRUSH], [EQUALIZER_WS_BRUSH_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for BRUSH");

    console.log("Setting Oracle for fSONIC using Equalizer");
    await beefyOracle.setOracle(FSONIC, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, FSONIC], [EQUALIZER_WS_FSONIC_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for fSONIC");

    console.log("Setting Oracle for GOGLZ using Equalizer");
    await beefyOracle.setOracle(GOGLZ, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, GOGLZ], [EQUALIZER_WS_GOGLZ_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for GOGLZ");

    console.log("Setting Oracle for FIERY using Equalizer");
    await beefyOracle.setOracle(FIERY, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, FIERY], [EQUALIZER_WS_FIERY_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for FIERY");

    console.log("Setting Oracle for ECO using Equalizer");
    await beefyOracle.setOracle(ECO, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, ECO], [EQUALIZER_WS_ECO_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for ECO");

    console.log("Setting Oracle for Anon using Equalizer");
    await beefyOracle.setOracle(ANON, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, ANON], [EQUALIZER_WS_ANON_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for Anon");

    console.log("Setting Oracle for HEDGY using Equalizer");
    await beefyOracle.setOracle(HEDGY, BEEFY_SOLIDLY_ORACLE, uniswapV3CallData([WRAPPED_NATIVE, HEDGY], [EQUALIZER_WS_HEDGY_PAIR], [SOLIDLY_TWAP]));
    console.log("Oracle set for HEDGY");

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
import VelodromeRouterAbi from "../data/abi/VelodromeRouter.json";
import BalancerVaultAbi from "../data/abi/BalancerVault.json";
import { BEETS, EQUAL, EQUALIZER_ROUTER_O2, UINT256_MAX, USDC, WRAPPED_NATIVE, WRAPPER_ETH, BALANCER_VAULT, BEETS_STAKED_SONIC, INT256_MAX, RINGING_STABLE_BEETS, PUT_A_RING_ON_IT, STACKED_SONIC_SYMPHONY, BRUSH, FSONIC, FIERY, ECO, GOGLZ, ANON, HEDGY, WHALE, THC } from "./config-sonic";

const hardhat = require("hardhat");
const ethers = hardhat.ethers;

const BEEFY_SWAPPER = "0x46112C2618B57a4e03492E727957123E5097dF25";

const EQUALIZER_AMOUNT_INDEX = 4;
const EQUALIZER_MIN_AMOUNT_INDEX = 36;
const EQUALIZER_AMOUNT_SIGN_INDEX = 0;

async function main() {
  await hardhat.run("compile");

  const EqualizerRouter = await ethers.getContractAt(VelodromeRouterAbi, EQUALIZER_ROUTER_O2);

  const BeefySwapper = await ethers.getContractFactory("BeefySwapper");
  const beefySwapper = BeefySwapper.attach(BEEFY_SWAPPER);

  // console.log("Setting swap info for wETH to wS using Equalizer");
  // const EQUALIZER_WETH_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPER_ETH, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX)
  // const EQUALIZER_WETH_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WETH_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPER_ETH, WRAPPED_NATIVE, EQUALIZER_WETH_WS_SWAP_INFO);
  // console.log("Swap info set for wETH to wS");

  // console.log("Setting swap info for wS to wETH using Equalizer");
  // const EQUALIZER_WS_WETH = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, WRAPPER_ETH, false]], BEEFY_SWAPPER, UINT256_MAX)
  // const EQUALIZER_WS_WETH_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_WETH.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, WRAPPER_ETH, EQUALIZER_WS_WETH_SWAP_INFO);
  // console.log("Swap info set for wS to wETH");

  // console.log("Setting swap info for wS to USDC using Equalizer");
  // const EQUALIZER_WS_USDC = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, USDC, false]], BEEFY_SWAPPER, UINT256_MAX)
  // const EQUALIZER_WS_USDC_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_USDC.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, USDC, EQUALIZER_WS_USDC_SWAP_INFO);
  // console.log("Swap info set for wS to USDC");

  // console.log("Setting swap info for USDC to wS using Equalizer");
  // const EQUALIZER_USDC_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[USDC, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_USDC_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_USDC_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(USDC, WRAPPED_NATIVE, EQUALIZER_USDC_WS_SWAP_INFO);
  // console.log("Swap info set for USDC to wS");

  // console.log("Setting swap info for EQUAL to wS using Equalizer");
  // const EQUALIZER_EQUAL_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[EQUAL, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_EQUAL_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_EQUAL_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(EQUAL, WRAPPED_NATIVE, EQUALIZER_EQUAL_WS_SWAP_INFO);
  // console.log("Swap info set for EQUAL to wS");

  // console.log("Setting swap info for wS to EQUAL using Equalizer");
  // const EQUALIZER_WS_EQUAL = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, EQUAL, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_EQUAL_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_EQUAL.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, EQUAL, EQUALIZER_WS_EQUAL_SWAP_INFO);
  // console.log("Swap info set for wS to EQUAL");

  // console.log("Setting swap info for wS to BRUSH using Equalizer");
  // const EQUALIZER_WS_BRUSH = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, BRUSH, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_BRUSH_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_BRUSH.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, BRUSH, EQUALIZER_WS_BRUSH_SWAP_INFO);
  // console.log("Swap info set for wS to BRUSH");

  // console.log("Setting swap info for BRUSH to wS using Equalizer");
  // const EQUALIZER_BRUSH_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[BRUSH, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_BRUSH_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_BRUSH_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(BRUSH, WRAPPED_NATIVE, EQUALIZER_BRUSH_WS_SWAP_INFO);
  // console.log("Swap info set for BRUSH to ws");

  // console.log("Setting swap info for wS to fSONIC using Equalizer");
  // const EQUALIZER_WS_FSONIC = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, FSONIC, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_FSONIC_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_FSONIC.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, FSONIC, EQUALIZER_WS_FSONIC_SWAP_INFO);
  // console.log("Swap info set for wS to fSONIC");

  // console.log("Setting swap info for fSONIC to wS using Equalizer");
  // const EQUALIZER_FSONIC_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[FSONIC, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_FSONIC_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_FSONIC_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(FSONIC, WRAPPED_NATIVE, EQUALIZER_FSONIC_WS_SWAP_INFO);
  // console.log("Swap info set for fSONIC to wS");

  // console.log("Setting swap info for wS to GOGLZ using Equalizer");
  // const EQUALIZER_WS_GOGLZ = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, GOGLZ, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_GOGLZ_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_GOGLZ.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, GOGLZ, EQUALIZER_WS_GOGLZ_SWAP_INFO);
  // console.log("Swap info set for wS to GOGLZ");

  // console.log("Setting swap info for GOGLZ to wS using Equalizer");
  // const EQUALIZER_GOGLZ_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[GOGLZ, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_GOGLZ_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_GOGLZ_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(GOGLZ, WRAPPED_NATIVE, EQUALIZER_GOGLZ_WS_SWAP_INFO);
  // console.log("Swap info set for GOGLZ to wS");

  // console.log("Setting swap info for wS to FIERY using Equalizer");
  // const EQUALIZER_WS_FIERY = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, FIERY, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_FIERY_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_FIERY.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, FIERY, EQUALIZER_WS_FIERY_SWAP_INFO);
  // console.log("Swap info set for wS to FIERY");

  // console.log("Setting swap info for FIERY to wS using Equalizer");
  // const EQUALIZER_FIERY_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[FIERY, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_FIERY_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_FIERY_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(FIERY, WRAPPED_NATIVE, EQUALIZER_FIERY_WS_SWAP_INFO);
  // console.log("Swap info set for FIERY to wS");

  // console.log("Setting swap info for wS to ECO using Equalizer");
  // const EQUALIZER_WS_ECO = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, ECO, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_ECO_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_ECO.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, ECO, EQUALIZER_WS_ECO_SWAP_INFO);
  // console.log("Swap info set for wS to ECO");

  // console.log("Setting swap info for ECO to wS using Equalizer");
  // const EQUALIZER_ECO_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[ECO, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_ECO_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_ECO_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(ECO, WRAPPED_NATIVE, EQUALIZER_ECO_WS_SWAP_INFO);
  // console.log("Swap info set for ECO to wS");

  // console.log("Setting swap info for wS to Anon using Equalizer");
  // const EQUALIZER_WS_ANON = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, ANON, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_ANON_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_ANON.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, ANON, EQUALIZER_WS_ANON_SWAP_INFO);
  // console.log("Swap info set for wS to Anon");

  // console.log("Setting swap info for Anon to wS using Equalizer");
  // const EQUALIZER_ANON_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[ANON, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_ANON_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_ANON_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(ANON, WRAPPED_NATIVE, EQUALIZER_ANON_WS_SWAP_INFO);
  // console.log("Swap info set for Anon to wS");

  // console.log("Setting swap info for wS to HEDGY using Equalizer");
  // const EQUALIZER_WS_HEDGY = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, HEDGY, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_HEDGY_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_HEDGY.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, HEDGY, EQUALIZER_WS_HEDGY_SWAP_INFO);
  // console.log("Swap info set for wS to HEDGY");

  // console.log("Setting swap info for HEDGY to wS using Equalizer");
  // const EQUALIZER_HEDGY_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[HEDGY, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_HEDGY_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_HEDGY_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(HEDGY, WRAPPED_NATIVE, EQUALIZER_HEDGY_WS_SWAP_INFO);
  // console.log("Swap info set for HEDGY to wS");

  // console.log("Setting swap info for wS to WHALE using Equalizer");
  // const EQUALIZER_WS_WHALE = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, WHALE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_WHALE_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_WHALE.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, WHALE, EQUALIZER_WS_WHALE_SWAP_INFO);
  // console.log("Swap info set for wS to WHALE");

  // console.log("Setting swap info for WHALE to wS using Equalizer");
  // const EQUALIZER_WHALE_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WHALE, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WHALE_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WHALE_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WHALE, WRAPPED_NATIVE, EQUALIZER_WHALE_WS_SWAP_INFO);
  // console.log("Swap info set for WHALE to wS");

  // console.log("Setting swap info for wS to THC using Equalizer");
  // const EQUALIZER_WS_THC = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, THC, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_WS_THC_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_THC.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, THC, EQUALIZER_WS_THC_SWAP_INFO);
  // console.log("Swap info set for wS to THC");

  // console.log("Setting swap info for THC to wS using Equalizer");
  // const EQUALIZER_THC_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[THC, WRAPPED_NATIVE, false]], BEEFY_SWAPPER, UINT256_MAX);
  // const EQUALIZER_THC_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_THC_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(THC, WRAPPED_NATIVE, EQUALIZER_THC_WS_SWAP_INFO);
  // console.log("Swap info set for THC to wS");

  // console.log("Setting swap info for BEETS to wS using Balancer");
  // const BALANCER_BEETS_WS_PATH = [
  //   [BEETS, STS, "0x10ac2f9dae6539e77e372adb14b1bf8fbd16b3e8000200000000000000000005"],
  //   [STS, WRAPPED_NATIVE, "0x374641076b68371e69d03c417dac3e5f236c32fa000000000000000000000006"]
  // ];
  // const BALANCER_BEETS_WS_SWAP_INFO = await balancer(BALANCER_BEETS_WS_PATH);
  // await beefySwapper.setSwapInfo(BEETS, WRAPPED_NATIVE, BALANCER_BEETS_WS_SWAP_INFO);
  // console.log("Swap info set for BEETS to wS using Balancer");

  // console.log("Setting swap info for wS to BEETS using Balancer");
  // const BALANCER_WS_BEETS_PATH = [
  //   [WRAPPED_NATIVE, STS, "0xf76a5c48b9a481f5f20d6f50e9edfca76a3a361d000200000000000000000008"],
  //   [STS, BEETS, "0x21fed4063bf8ebf4f51f4adf4ecfc9717aa4ca9d000100000000000000000044"]
  // ];
  // const BALANCER_WS_BEETS_SWAP_INFO = await balancer(BALANCER_WS_BEETS_PATH);
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, BEETS, BALANCER_WS_BEETS_SWAP_INFO);
  // console.log("Swap info set for wS to BEETS using Balancer");

  // console.log("Setting swap info for wS to Stacked Sonic Syphony using Balancer");
  // const BALANCER_WS_SSS_PATH = [
  //   [WRAPPED_NATIVE, STACKED_SONIC_SYMPHONY, "0x374641076b68371e69d03c417dac3e5f236c32fa000000000000000000000006"]
  // ]
  // const BALANCER_WS_SSS_SWAP_INFO = await balancer(BALANCER_WS_SSS_PATH);
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, STACKED_SONIC_SYMPHONY, BALANCER_WS_SSS_SWAP_INFO);
  // console.log("Swap info set for wS to Stacked Sonic Syphony using Balancer");

  // console.log("Setting swap info for wS to Ringing Stable Beets using Balancer");
  // const BALANCER_WS_SRB_PATH = [
  //   [WRAPPED_NATIVE, STS, "0xf76a5c48b9a481f5f20d6f50e9edfca76a3a361d000200000000000000000008"],
  //   [STS, USDC, "0x713fb5036dc70012588d77a5b066f1dd05c712d7000200000000000000000041"],
  //   [USDC, RINGING_STABLE_BEETS, "0xcd4d2b142235d5650ffa6a38787ed0b7d7a51c0c000000000000000000000037"]
  // ];
  // const BALANCER_WS_RBS_SWAP_INFO = await balancer(BALANCER_WS_SRB_PATH);
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, RINGING_STABLE_BEETS, BALANCER_WS_RBS_SWAP_INFO);
  // console.log("Swap info set for wS to Ringing Stable Beets using Balancer");

  // console.log("Setting swap info for wS to Put A Ring On It using Balancer");
  // const BALANCER_WS_PAROI_PATH = [
  //   [WRAPPED_NATIVE, BEETS_STAKED_SONIC, "0xf76a5c48b9a481f5f20d6f50e9edfca76a3a361d000200000000000000000008"],
  //   [BEETS_STAKED_SONIC, PUT_A_RING_ON_IT, "0x25ca5451cd5a50ab1d324b5e64f32c0799661891000200000000000000000018"], 
  // ];
  // const BALANCER_WS_PAROI_SWAP_INFO = await balancer(BALANCER_WS_PAROI_PATH);
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, PUT_A_RING_ON_IT, BALANCER_WS_PAROI_SWAP_INFO);
  // console.log("Swap info set for wS to Put A Ring On It using Balancer");

  // console.log("Setting swap info for wS to Put A Ring On It using Balancer");
  // const BALANCER_WS_PAROI_PATH = [
  //   [BEETS_STAKED_SONIC, PUT_A_RING_ON_IT, "0x25ca5451cd5a50ab1d324b5e64f32c0799661891000200000000000000000018"], 
  // ];
  // const BALANCER_WS_PAROI_SWAP_INFO = await balancer(BALANCER_WS_PAROI_PATH);
  // await beefySwapper.setSwapInfo(BEETS_STAKED_SONIC, PUT_A_RING_ON_IT, BALANCER_WS_PAROI_SWAP_INFO);
  // console.log("Swap info set for wS to Put A Ring On It using Balancer");

  // console.log("Setting swap info for wS to stS using Equalizer");
  // const EQUALIZER_WS_STS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[WRAPPED_NATIVE, BEETS_STAKED_SONIC, true]], BEEFY_SWAPPER, UINT256_MAX)
  // const EQUALIZER_WS_STS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_WS_STS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  // await beefySwapper.setSwapInfo(WRAPPED_NATIVE, BEETS_STAKED_SONIC, EQUALIZER_WS_STS_SWAP_INFO);
  // console.log("Swap info set for wS to stS");

  console.log("Setting swap info for stS to wS using Equalizer");
  const EQUALIZER_STS_WS = await EqualizerRouter.populateTransaction.swapExactTokensForTokens(0, 0, [[BEETS_STAKED_SONIC, WRAPPED_NATIVE, true]], BEEFY_SWAPPER, UINT256_MAX)
  const EQUALIZER_STS_WS_SWAP_INFO = [EQUALIZER_ROUTER_O2, EQUALIZER_STS_WS.data, EQUALIZER_AMOUNT_INDEX, EQUALIZER_MIN_AMOUNT_INDEX, EQUALIZER_AMOUNT_SIGN_INDEX];
  await beefySwapper.setSwapInfo(BEETS_STAKED_SONIC, WRAPPED_NATIVE, EQUALIZER_STS_WS_SWAP_INFO);
  console.log("Swap info set for stS to wS");

}

async function balancer(path) {
  const BalancerVault = await ethers.getContractAt(BalancerVaultAbi, BALANCER_VAULT);

  const swapSteps = [];
  const assets = [];
  const limits = [INT256_MAX];

  for (let i = 0; i < path.length; ++i) {
    swapSteps.push([path[i][2], i, i + 1, 0, []])
    assets.push(path[i][0]);
    limits.push(0);
  }
  assets.push(path[path.length - 1][1]);
  console.log(swapSteps);
  console.log(assets);

  const txData = await BalancerVault.populateTransaction.batchSwap(
    0,
    swapSteps,
    assets,
    [BEEFY_SWAPPER, false, BEEFY_SWAPPER, false],
    limits,
    UINT256_MAX
  );
  const amountIndex = 420 + (32 * path.length);
  const minIndex = (txData.data.length - 66) / 2;
  const minAmountSign = -1;

  const swapInfo = [
    BALANCER_VAULT,
    txData.data,
    amountIndex,
    minIndex,
    minAmountSign
  ];

  return swapInfo;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
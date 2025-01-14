const hardhat = require("hardhat");
const { upgrades } = require("hardhat");
const { addressBook } = require("blockchain-addressbook");

/**
 * Script used to deploy the basic infrastructure needed to run Beefy.
 */

const ethers = hardhat.ethers;

const {
    platforms: {
        beefyfinance: {
            keeper,
        } },
} = addressBook.arbitrum;

const TIMELOCK_ADMIN_ROLE = "0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5";

// STUBS
const POOL_STUB = "0x828b310A00A7c929bcF7a76B40bFA15d3fD96B0e";


// MOCKS
const COIN_MOCK_1 = "0x4282ef3D31Bd845a3bC420f8738ad6da46f695d7"
const COIN_MOCK_2 = "0x13F6689CdDC51b7fb288D149aB8F49397852D497"
const CHAINLINK_FEED_MOCK = "0xEB34a3bf441eF951898F4643d012b5A57404C991"

// ADDRESSES TO BE REPLACED
const DEV_MULTISIG = "0xc2cCdd61187b81cC56EcA985bbaf9da418e3d87f"
const TREASURY_MULTISIG = "0xc2cCdd61187b81cC56EcA985bbaf9da418e3d87f"
const KEEPER = keeper;
const STRATEGIST = undefined;
const VOTER = undefined;
const TREASURER = undefined
const FEE_RECIPIENT = keeper;

const WRAPPED_NATIVE = "0x2E52C94502f728A634a7b8eFf5941FB066d3eE76";
const UNISWAP_V2_ROUTER_02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP_V3_QUOTER = undefined; // FIXME: Replace with actual address

const REWARD_POOL_TOKEN_NAME = "Stacked Reward Pool";
const REWARD_POOL_TOKEN_SYMBOL = "ST"

const TOTAL_FEE_LIMIT = "95000000000000000";
const CALLER_FEE = "500000000000000";
const STRATEGIST_FEE = "5000000000000000";

const SWAPPER_SLIPPAGE = "95000000000000000"; // Minimum acceptable percentage slippage output in 18 decimals
const STRAT_OWNER_DELAY = 21600;
const VAULT_OWNER_DELAY = 0;

const oracleConfig = {
    chainlink: [
        { token: "0x2E52C94502f728A634a7b8eFf5941FB066d3eE76", feed: CHAINLINK_FEED_MOCK },
    ]
};

const ZAP_CONFIG = {
    uniswapV2Router02: UNISWAP_V2_ROUTER_02,
    weth: WRAPPED_NATIVE
}

const PROPOSERS = [DEV_MULTISIG];
const EXECUTORS = [DEV_MULTISIG, KEEPER];

async function main() {
    await hardhat.run("compile");

    const deployer = await ethers.getSigner();

    // /**
    //  * Beefy Infrascructure.
    //  */

    console.log("Deploying BeefyFeeConfigurator");
    const BeefyFeeConfiguratorFactory = await ethers.getContractFactory("BeefyFeeConfigurator");
    const constructorArguments = [KEEPER, TOTAL_FEE_LIMIT];
    const beefyFeeConfiguratorProxy = await upgrades.deployProxy(BeefyFeeConfiguratorFactory, constructorArguments, { unsafeAllow: ['delegatecall'] });
    await beefyFeeConfiguratorProxy.deployed();

    await beefyFeeConfiguratorProxy.setFeeCategory(0, BigInt(TOTAL_FEE_LIMIT), BigInt(CALLER_FEE), BigInt(STRATEGIST_FEE), "default", true, true);
    await beefyFeeConfiguratorProxy.transferOwnership(DEV_MULTISIG);

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(beefyFeeConfiguratorProxy.address);

    console.log("BeefyFeeConfigurator deployed to:", beefyFeeConfiguratorProxy.address);
    console.log(`Implementation deployed to:`, implementationAddress);

    const TimelockController = await ethers.getContractFactory("TimelockController");

    console.log("Deploying vault owner.");
    let deployParams = [VAULT_OWNER_DELAY, PROPOSERS, EXECUTORS];
    const vaultOwner = await TimelockController.deploy(...deployParams);
    await vaultOwner.deployed();
    await vaultOwner.renounceRole(TIMELOCK_ADMIN_ROLE, deployer.address);
    console.log(`Vault owner deployed to ${vaultOwner.address}`);

    console.log("Deploying strategy owner.");
    const stratOwner = await TimelockController.deploy(STRAT_OWNER_DELAY, PROPOSERS, EXECUTORS);
    await stratOwner.deployed();
    await stratOwner.renounceRole(TIMELOCK_ADMIN_ROLE, deployer.address);
    console.log(`Strategy owner deployed to ${stratOwner.address}`);

    console.log("Deploying Multicall");
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log(`Multicall deployed to ${multicall.address}`);

    console.log("Deploying BeefyRegistry");
    const BeefyRegistry = await ethers.getContractFactory("BeefyRegistry");
    const beefyRegistry = await BeefyRegistry.deploy();
    await beefyRegistry.deployed();
    await beefyRegistry.initialize();
    console.log(`BeefyRegistry deployed to ${beefyRegistry.address}`);

    console.log("Deploying BeefyVaultV7");
    const VaultV7 = await ethers.getContractFactory("BeefyVaultV7");
    const vault7 = await VaultV7.deploy();
    await vault7.deployed();
    console.log(`Vault V7 deployed to ${vault7.address}`);

    console.log("Deploying BeefyVaultV7Factory");
    const VaultFactory = await ethers.getContractFactory("BeefyVaultV7Factory");
    const vaultFactory = await VaultFactory.deploy(vault7.address, { gasLimit: 350000 });
    await vaultFactory.deployed();
    console.log(`Vault Factory deployed to ${vaultFactory.address}`);

    console.log("Deploying BeefyWrapperFactory");
    const BeefyWrapperFactory = await ethers.getContractFactory("BeefyWrapperFactory");
    const wrapperFactory = await BeefyWrapperFactory.deploy();
    await wrapperFactory.deployed();
    console.log(`Beefy Wrapper Factory deployed to ${wrapperFactory.address}`);

    console.log("Deploying CowcentralizedVault");
    const CowcentralizedVault = await ethers.getContractFactory("BeefyVaultConcLiq");
    const cowcentralizedVault = await CowcentralizedVault.deploy();
    await cowcentralizedVault.deployed();
    console.log(`CowcentralizedVault deployed to ${cowcentralizedVault.address}`);

    console.log("Deploying BeefyVaultConcLiqFactory");
    const CowcentralizedVaultFactory = await ethers.getContractFactory("BeefyVaultConcLiqFactory");
    const cowcentralizedVaultFactory = await CowcentralizedVaultFactory.deploy(cowcentralizedVault.address, { gasLimit: 350000 });
    await cowcentralizedVaultFactory.deployed();
    console.log(`CowcentralizedVaultFactory deployed to ${cowcentralizedVaultFactory.address}`);

    console.log("Deploying Beefy Treasury");
    const BeefyTreasury = await ethers.getContractFactory("BeefyTreasury");
    const beefyTreasury = await BeefyTreasury.deploy();
    await beefyTreasury.deployed();
    await beefyTreasury.transferOwnership(TREASURY_MULTISIG);
    console.log(`Beefy Treasury deployed to ${beefyTreasury.address}`);

    // ERC20 Token for Beefy, contract should be replaced with Vicuna token or other token
    // that will be used in reward pool
    console.log("Deploying BIFI");
    const BIFI = await ethers.getContractFactory("BIFI");
    const bifi = await BIFI.deploy(beefyTreasury.address);
    await bifi.deployed();
    console.log(`BIFI deployed to ${bifi.address}`);

    console.log("Deploying BeefyRewardPool");
    const BeefyRewardPool = await ethers.getContractFactory("BeefyRewardPool");
    const beefyRewardPool = await BeefyRewardPool.deploy();
    await beefyRewardPool.deployed();
    await beefyRewardPool.initialize(bifi.address, REWARD_POOL_TOKEN_NAME, REWARD_POOL_TOKEN_SYMBOL);
    console.log(`BeefyRewardPool deployed to ${beefyRewardPool.address}`);

    console.log("Deploying StrategyFactory");
    const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    const strategyFactory = await StrategyFactory.deploy(WRAPPED_NATIVE, KEEPER, FEE_RECIPIENT, beefyFeeConfiguratorProxy.address);
    await strategyFactory.deployed();
    console.log(`StrategyFactory deployed to ${strategyFactory.address}`);

    /**
     * Beefy Swapper and Beefy Oracle.
     */

    console.log('Deploying BeefyOracleChainlink');
    const BeefyOracleChainlink = await ethers.getContractFactory("BeefyOracleChainlink");
    const beefyOracleChainlink = await BeefyOracleChainlink.deploy();
    await beefyOracleChainlink.deployed();
    console.log(`BeefyOracleChainlink deployed to ${beefyOracleChainlink.address}`);

    console.log('Deploying BeefyOracleUniswapV2');
    const BeefyOracleUniswapV2 = await ethers.getContractFactory("BeefyOracleUniswapV2");
    const beefyOracleUniswapV2 = await BeefyOracleUniswapV2.deploy();
    await beefyOracleUniswapV2.deployed();
    console.log(`BeefyOracleUniswapV2 deployed to ${beefyOracleUniswapV2.address}`);

    console.log('Deploying BeefyOracleUniswapV3');
    const BeefyOracleUniswapV3 = await ethers.getContractFactory("BeefyOracleUniswapV3");
    const beefyOracleUniswapV3 = await BeefyOracleUniswapV3.deploy();
    await beefyOracleUniswapV3.deployed();
    console.log(`BeefyOracleUniswapV3 deployed to ${beefyOracleUniswapV3.address}`);

    console.log('Deploying BeefyOracle');
    const BeefyOracle = await ethers.getContractFactory("BeefyOracle");
    const beefyOracle = await BeefyOracle.deploy();
    await beefyOracle.deployed();
    console.log(`BeefyOracle deployed to ${beefyOracle.address}`);

    console.log("Initializing BeefyOracle");
    await beefyOracle.initialize();

    console.log("Waiting for chain propagation");
    for (let i = 0; i < 10; i++) {
        if (await beefyOracle.owner() === deployer.address) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Setting up Chainlink Feeds")
    if (oracleConfig.chainlink.length !== 0) {
        for (var entry of oracleConfig.chainlink) {
            const data = ethers.utils.defaultAbiCoder.encode(["address"], [entry.feed]);
            await beefyOracle.setOracle(entry.token, beefyOracleChainlink.address, data);
            console.log(`Chainlink Oracle has been set for token ${entry.token} with feed ${entry.feed}`);
        }
    } else {
        console.log("No Chainlink aggregators has been set")
    }

    await beefyOracle.transferOwnership(keeper);


    console.log("Deploying BeefySwapper");
    const BeefySwapper = await ethers.getContractFactory("BeefySwapper");
    const beefySwapper = await BeefySwapper.deploy();
    await beefySwapper.deployed();
    await beefySwapper.initialize(beefyOracle.address, SWAPPER_SLIPPAGE);

    console.log("Waiting for chain propagation");
    for (let i = 0; i < 10; i++) {
        if (await beefySwapper.owner() === deployer.address) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    await beefySwapper.transferOwnership(keeper);

    console.log(`BeefySwapper deployed to ${beefySwapper.address}`);

    /**
     * Zaps.
     */
    console.log("Deploying BeefyUniV2Zap");
    const BeefyUniV2Zap = await ethers.getContractFactory("BeefyUniV2Zap");
    const beefyUniV2Zap = await BeefyUniV2Zap.deploy(ZAP_CONFIG.uniswapV2Router02, ZAP_CONFIG.weth);
    await beefyUniV2Zap.deployed();
    console.log(`BeefyUniV2Zap deployed to ${beefyUniV2Zap.address}`);

    /**
     * Vaults.
     */
    // Mocked version
   
    // console.log("Cloning Cowcentralized Vault");
    // const tx = await cowcentralizedVaultFactory.cloneVault();
    // const receipt = await tx.wait();
    // const cowcentralizedVaultAddress = receipt.events.filter((e) => e.event === "ProxyCreated")[0].args.proxy;
    // console.log(`Cowcentralized Vault cloned to ${cowcentralizedVaultAddress}`);

    // console.log("Deploying CowcentralizedStrategyMock");
    // const CowcentralizedStrategyMock = await ethers.getContractFactory("CowcentralizedStrategyMock");
    // const cowcentralizedStrategyMock = await CowcentralizedStrategyMock.deploy(POOL_STUB, cowcentralizedVaultAddress, COIN_MOCK_1, COIN_MOCK_2);
    // await cowcentralizedStrategyMock.deployed();
    // console.log(`CowcentralizedStrategyMock deployed to ${cowcentralizedStrategyMock.address}`);

    // const mockedCowcentralizedVault = CowcentralizedVault.attach(cowcentralizedVaultAddress);
    // await mockedCowcentralizedVault.initialize(cowcentralizedStrategyMock.address, "Cowcentralized Vault", "cV");

    // Real version
    // console.log("Deploying StrategyPassiveManagerUniswap");
    // const StrategyPassiveManagerUniswap = await ethers.getContractFactory("StrategyPassiveManagerUniswap");
    // const strategyPassiveManagerUniswap = await StrategyPassiveManagerUniswap.deploy();
    // await strategyPassiveManagerUniswap.deployed();
    // console.log(`StrategyPassiveManagerUniswap deployed to ${strategyPassiveManagerUniswap.address}`);

    // await cowcentralizedVault.initialize(strategyPassiveManagerUniswap.address, "Cowcentralized Vault", "cV");
    // await strategyPassiveManagerUniswap.initialize(
    //     POOL_STUB, // address _pool
    //     UNISWAP_V3_QUOTER, // address _quoter
    //     "", // int24 _positionWidth
    //     "", // bytes calldata _lpToken0ToNativePath
    //     "", // bytes calldata _lpToken1ToNativePath
    //     {        
    //         vault: cowcentralizedVault.address,
    //         unirouter: "",
    //         strategist: STRATEGIST,
    //         factory: strategyFactory.address,
    //     })

    // Mocked version
    console.log("Cloning Vault V7");
    const tx2 = await vaultFactory.cloneVault();
    const receipt2 = await tx2.wait();
    const vaultAddress = receipt2.events.filter((e) => e.event === "ProxyCreated")[0].args.proxy;
    console.log(`Vault V7 deployed to ${vaultAddress}`);

    console.log("Deploying StrategyMock");
    const StrategyMock = await ethers.getContractFactory("StrategyMock");
    const strategyMock = await StrategyMock.deploy(vaultAddress, COIN_MOCK_1);
    await strategyMock.deployed();
    console.log(`StrategyMock deployed to ${strategyMock.address}`);

    const mockedVaultv7 = VaultV7.attach(vaultAddress);
    await mockedVaultv7.initialize(strategyMock.address, "V7 Vault", "7V", 0);

    console.log("*******************");
    console.log("DEPLOYMENT COMPLETE");
    console.log("*******************");
    console.log("");
    console.log("");
    console.log("*************");
    console.log("BEEFY CONFIG");
    console.log("*************");
    for (var entry of PROPOSERS) {
        console.log(`Proposer: ${entry}`);
    }
    for (var entry of EXECUTORS) {
        console.log(`Executor: ${entry}`);
    }
    console.log("");
    console.log("");
    console.log("*************");
    console.log("BEEFY INFRA");
    console.log("*************");
    console.log(`Beefy Fee Configurator: ${beefyFeeConfiguratorProxy.address}`,);
    console.log(`Beefy Fee Configurator Implementation: ${implementationAddress}`,);
    console.log(`Vault owner: ${vaultOwner.address}`);
    console.log(`Strategy owner: ${stratOwner.address}`);
    console.log(`Multicall: ${multicall.address}`);
    console.log(`Beefy Registry: ${beefyRegistry.address}`);
    console.log(`Beefy Wrapper Factory: ${wrapperFactory.address}`);
    console.log(`Beefy V7: ${vault7.address}`);
    console.log(`Beefy Vault Factory: ${vaultFactory.address}`);
    console.log(`Cowcentralized Vault: ${cowcentralizedVault.address}`);
    console.log(`Cowcentralized Vault Factory: ${cowcentralizedVaultFactory.address}`);
    console.log(`Beefy Treasury: ${beefyTreasury.address}`);
    console.log(`BIFI: ${bifi.address}`);
    console.log(`Beefy Reward Pool: ${beefyRewardPool.address}`);
    console.log(`Strategy Factory: ${strategyFactory.address}`);
    console.log("");
    console.log("");
    console.log("*************");
    console.log("BEEFY SWAPPER")
    console.log("*************");
    console.log(`Beefy Swapper: ${beefySwapper.address}`);
    console.log(`Beefy Oracle Chainlink: ${beefyOracleChainlink.address}`);
    console.log(`Beefy Oracle Uniswap V2: ${beefyOracleUniswapV2.address}`);
    console.log(`Beefy Oracle Uniswap V3: ${beefyOracleUniswapV3.address}`);
    console.log(`Beefy Oracle: ${beefyOracle.address}`);
    console.log("");
    console.log("");
    console.log("*********");
    console.log("BEEFY ZAP")
    console.log("*********");
    console.log(`Beefy Uniswap V2 Zap: ${beefyUniV2Zap.address}`);
    console.log("");
    console.log("");
    console.log("*********");
    console.log("BEEFY VAULTS")
    console.log("*********");
    // console.log(`Mocked Cowcentralized Vault: ${mockedCowcentralizedVault.address}`);
    console.log(`Mocked Vault V7: ${mockedVaultv7.address}`);



    //   console.log(`
    //     const devMultisig = '${config.devMultisig}';
    //     const treasuryMultisig = '${config.treasuryMultisig}';

    //     export const beefyfinance = {
    //       devMultisig,
    //       treasuryMultisig,
    //       strategyOwner: '${stratOwner.address}',
    //       vaultOwner: '${vaultOwner.address}',
    //       keeper: 'X' // Wallet with some management capabilities,
    //       treasurer: treasuryMultisig,
    //       launchpoolOwner: devMultisig,
    //       rewardPool: '${beefyRewardPool.address}',
    //       treasury: '${beefyTreasury.address}',
    //       beefyFeeRecipient: 'X' // Wallet to receive fees,
    //       multicall: '${multicall.address}',
    //       bifiMaxiStrategy: 'X' // Stategy vault, can be ignored?,
    //       voter: 'X' // Wallet? Seems to be used in some strategies,
    //       beefyFeeConfig: '${transparentUpgradableProxy.address}',
    //       vaultFactory: '${vaultFactory.address}',
    //       wrapperFactory: '${wrapperFactory.address}',
    //       zap: 'X' // Zap feature,
    //       zapTokenManager: 'X' // Zap feature,
    //       treasurySwapper: 'X' // Zap feature? -> BeefySwapperTreasury,

    //       /// CLM Contracts
    //       clmFactory: 'X',
    //       clmStrategyFactory: 'X',
    //       clmRewardPoolFactory: 'X',
    //       positionMulticall: 'X',

    //       /// Beefy Swapper Contracts
    //       beefySwapper: '${beefySwapper.address}',
    //       beefyOracle: '${beefyOracle.address}',
    //       beefyOracleChainlink: '${beefyOracleChainlink.address}',
    //       beefyOracleUniswapV2: '${beefyOracleUniswapV2.address}',
    //       beefyOracleUniswapV3: '${beefyOracleUniswapV3.address}',
    //     } as const;
    //   `)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

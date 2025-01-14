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
      voter, 
      beefyFeeRecipient,
    } },
} = addressBook.arbitrum;

const TIMELOCK_ADMIN_ROLE = "0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5";
const STRAT_OWNER_DELAY = 21600;
const VAULT_OWNER_DELAY = 0;
const KEEPER = keeper;

const config = {
  devMultisig: "0xc2cCdd61187b81cC56EcA985bbaf9da418e3d87f",
  treasuryMultisig: "0x2E52C94502f728A634a7b8eFf5941FB066d3eE76",
  totalLimit: "95000000000000000",
  callFee: "500000000000000",
  strategist: "5000000000000000"
};

const proposer = config.devMultisig || TRUSTED_EOA;
const timelockProposers = [proposer];
const timelockExecutors = [proposer, KEEPER];

async function main() {
  await hardhat.run("compile");

  const deployer = await ethers.getSigner();

  const TimelockController = await ethers.getContractFactory("TimelockController");

  console.log("Deploying vault owner.");
  let deployParams = [VAULT_OWNER_DELAY, timelockProposers, timelockExecutors];
  const vaultOwner = await TimelockController.deploy(...deployParams);
  await vaultOwner.deployed();
  await vaultOwner.renounceRole(TIMELOCK_ADMIN_ROLE, deployer.address);
  console.log(`Vault owner deployed to ${vaultOwner.address}`);


  console.log("Deploying strategy owner.");
  const stratOwner = await TimelockController.deploy(STRAT_OWNER_DELAY, timelockProposers, timelockExecutors);
  await stratOwner.deployed();
  await stratOwner.renounceRole(TIMELOCK_ADMIN_ROLE, deployer.address);
  console.log(`Strategy owner deployed to ${stratOwner.address}`);

  console.log("Deploying multicall");
  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed();
  console.log(`Multicall deployed to ${multicall.address}`);

  const BeefyFeeConfiguratorFactory = await ethers.getContractFactory("BeefyFeeConfigurator");
  console.log("Deploying BeefyFeeConfigurator");

  const constructorArguments = [keeper, config.totalLimit];
  const transparentUpgradableProxy = await upgrades.deployProxy(BeefyFeeConfiguratorFactory, constructorArguments, { unsafeAllow: ['delegatecall']});
  await transparentUpgradableProxy.deployed();

  await transparentUpgradableProxy.setFeeCategory(0, BigInt(config.totalLimit), BigInt(config.callFee), BigInt(config.strategist), "default", true, true);
  await transparentUpgradableProxy.transferOwnership(config.devMultisig);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(transparentUpgradableProxy.address);

  console.log();
  console.log("BeefyFeeConfig:", transparentUpgradableProxy.address);
  console.log(`Implementation address:`, implementationAddress);

  console.log("Deploying Vault Factory");
  const VaultFactory = await ethers.getContractFactory("BeefyVaultV7Factory");
  const VaultV7 = await ethers.getContractFactory("BeefyVaultV7");
  const vault7 = await VaultV7.deploy();
  await vault7.deployed();
  console.log(`Vault V7 deployed to ${vault7.address}`);

  const vaultFactory = await VaultFactory.deploy(vault7.address, {gasLimit: 350000});
  await vaultFactory.deployed();
  console.log(`Vault Factory deployed to ${vaultFactory.address}`);

  console.log("Deploying Beefy Wrapper Factory");
  const BeefyWrapperFactory = await ethers.getContractFactory("BeefyWrapperFactory");
  const wrapperFactory = await BeefyWrapperFactory.deploy();
  await wrapperFactory.deployed();
  console.log(`Beefy Wrapper Factory deployed to ${wrapperFactory.address}`);

  console.log("Deploying Beefy Treasury");
  const BeefyTreasury = await ethers.getContractFactory("BeefyTreasury");
  const beefyTreasury = await BeefyTreasury.deploy();
  await beefyTreasury.deployed();
  await beefyTreasury.transferOwnership(config.treasuryMultisig);
  console.log(`Beefy Treasury deployed to ${beefyTreasury.address}`);

  console.log("Deploying BIFI");
  const BIFI = await ethers.getContractFactory("BIFI");
  const bifi = await BIFI.deploy(beefyTreasury.address);
  await bifi.deployed();
  console.log(`BIFI deployed to ${bifi.address}`);

  console.log("Deploying BeefyRewardPool");
  const BeefyRewardPool = await ethers.getContractFactory("BeefyRewardPool");
  const beefyRewardPool = await BeefyRewardPool.deploy();
  await beefyRewardPool.deployed();
  await beefyRewardPool.initialize(bifi.address);
  console.log(`BeefyRewardPool deployed to ${beefyRewardPool.address}`);

  console.log("Deploying Beefy Swapper");
  const BeefySwapper = await ethers.getContractFactory("BeefySwapper");
  const beefySwapper = await BeefySwapper.deploy();
  await beefySwapper.deployed();
  console.log(`Beefy Swapper deployed to ${beefySwapper.address}`);

  console.log('Deploying Beefy Oracle Chainlink');
  const BeefyOracleChainlink = await ethers.getContractFactory("BeefyOracleChainlink");
  const beefyOracleChainlink = await BeefyOracleChainlink.deploy();
  await beefyOracleChainlink.deployed();
  console.log(`Beefy Oracle Chainlink deployed to ${beefyOracleChainlink.address}`);

  console.log('Deploying Beefy Oracle Uniswap V2');
  const BeefyOracleUniswapV2 = await ethers.getContractFactory("BeefyOracleUniswapV2");
  const beefyOracleUniswapV2 = await BeefyOracleUniswapV2.deploy();
  await beefyOracleUniswapV2.deployed();
  console.log(`Beefy Oracle Uniswap V2 deployed to ${beefyOracleUniswapV2.address}`);

  console.log('Deploying Beefy Oracle Uniswap V3');
  const BeefyOracleUniswapV3 = await ethers.getContractFactory("BeefyOracleUniswapV3");
  const beefyOracleUniswapV3 = await BeefyOracleUniswapV3.deploy();
  await beefyOracleUniswapV3.deployed();
  console.log(`Beefy Oracle Uniswap V3 deployed to ${beefyOracleUniswapV3.address}`);

  console.log('Deploying Beefy Oracle');
  const BeefyOracle = await ethers.getContractFactory("BeefyOracle");
  const beefyOracle = await BeefyOracle.deploy();
  await beefyOracle.deployed();

  beefySwapper.initialize(beefyOracle.address, config.totalLimit);
  beefySwapper.transferOwnership(keeper);

  beefyOracle.initialize();
  beefyOracle.transferOwnership(keeper);
  console.log(`Beefy Oracle deployed to ${beefyOracle.address}`);

  console.log(`
    const devMultisig = '${config.devMultisig}';
    const treasuryMultisig = '${config.treasuryMultisig}';
  
    export const beefyfinance = {
      devMultisig,
      treasuryMultisig,
      strategyOwner: '${stratOwner.address}',
      vaultOwner: '${vaultOwner.address}',
      keeper: 'X' // Wallet with some management capabilities,
      treasurer: treasuryMultisig,
      launchpoolOwner: devMultisig,
      rewardPool: '${beefyRewardPool.address}',
      treasury: '${beefyTreasury.address}',
      beefyFeeRecipient: 'X' // Wallet to receive fees,
      multicall: '${multicall.address}',
      bifiMaxiStrategy: 'X' // Stategy vault, can be ignored?,
      voter: 'X' // Wallet? Seems to be used in some strategies,
      beefyFeeConfig: '${transparentUpgradableProxy.address}',
      vaultFactory: '${vaultFactory.address}',
      wrapperFactory: '${wrapperFactory.address}',
      zap: 'X' // Zap feature,
      zapTokenManager: 'X' // Zap feature,
      treasurySwapper: 'X' // Zap feature? -> BeefySwapperTreasury,
    
      /// CLM Contracts
      clmFactory: 'X',
      clmStrategyFactory: 'X',
      clmRewardPoolFactory: 'X',
      positionMulticall: 'X',
    
      /// Beefy Swapper Contracts
      beefySwapper: '${beefySwapper.address}',
      beefyOracle: '${beefyOracle.address}',
      beefyOracleChainlink: '${beefyOracleChainlink.address}',
      beefyOracleUniswapV2: '${beefyOracleUniswapV2.address}',
      beefyOracleUniswapV3: '${beefyOracleUniswapV3.address}',
    } as const;
  `)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  
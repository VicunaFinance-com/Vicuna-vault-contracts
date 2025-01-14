// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface ICLGauge {
    function nft() external view returns (address);

    function voter() external view returns (address);

    function pool() external view returns (address);

    function gaugeFactory() external view returns (address);

    function feesVotingReward() external view returns (address);

    function periodFinish() external view returns (uint256);

    function rewardRate() external view returns (uint256);

    function rewards(uint256 tokenId) external view returns (uint256);

    function lastUpdateTime(uint256 tokenId) external view returns (uint256);

    function rewardRateByEpoch(uint256) external view returns (uint256);

    function fees0() external view returns (uint256);

    function fees1() external view returns (uint256);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function tickSpacing() external view returns (int24);

    function left() external view returns (uint256 _left);

    function rewardToken() external view returns (address);

    function isPool() external view returns (bool);

    function rewardGrowthInside(uint256 tokenId) external view returns (uint256);

    function initialize(
        address _pool,
        address _feesVotingReward,
        address _rewardToken,
        address _voter,
        address _nft,
        address _token0,
        address _token1,
        int24 _tickSpacing,
        bool _isPool
    ) external;

    function earned(address account, uint256 tokenId) external view returns (uint256);

    function getReward(address account) external;

    function getReward(uint256 tokenId) external;

    function notifyRewardAmount(uint256 amount) external;

    function notifyRewardWithoutClaim(uint256 amount) external;

    function deposit(uint256 tokenId) external;

    function withdraw(uint256 tokenId) external;

    function increaseStakedLiquidity(
        uint256 tokenId,
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        uint256 deadline
    ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1);

    function decreaseStakedLiquidity(
        uint256 tokenId,
        uint128 liquidity,
        uint256 amount0Min,
        uint256 amount1Min,
        uint256 deadline
    ) external returns (uint256 amount0, uint256 amount1);

    function stakedValues(address depositor) external view returns (uint256[] memory);

    function stakedByIndex(address depositor, uint256 index) external view returns (uint256);

    function stakedContains(address depositor, uint256 tokenId) external view returns (bool);

    function stakedLength(address depositor) external view returns (uint256);
}

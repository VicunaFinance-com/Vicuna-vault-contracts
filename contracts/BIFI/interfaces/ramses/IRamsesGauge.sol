// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IRamsesGauge  {
    function getReward(
        address owner,
        uint256 index,
        int24 tickLower,
        int24 tickUpper,
        address[] memory tokens,
        address receiver
    ) external;
}
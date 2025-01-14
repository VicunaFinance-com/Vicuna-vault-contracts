// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../interfaces/beefy/IStrategyV7.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract StrategyMock is IStrategyV7 {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    bool public paused;
    address public vault;
    IERC20Upgradeable public want;

    constructor(address _vault, address _want) {
        vault = _vault;
        want = IERC20Upgradeable(_want);
        paused = false;
    }

    function beforeDeposit() external override {}

    function deposit() external override {}

    function withdraw(uint256 _amount) external override {
        this.want().safeTransfer(vault, _amount);
    }

    function balanceOf() external view override returns (uint256) {
        return this.balanceOfWant() + this.balanceOfPool();
    }

    function balanceOfWant() external view override returns (uint256) {
        return this.want().balanceOf(address(this));
    }

    function balanceOfPool() external pure override returns (uint256) {
        return 0;
    }

    function harvest() external override {}

    function retireStrat() external override {}

    function panic() external override {}

    function pause() external override {
        paused = true;
    }

    function unpause() external override {
        paused = false;
    }

    function unirouter() external pure override returns (address) {
        return address(0);
    }
}
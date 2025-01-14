// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import {IStrategyConcLiq} from "../interfaces/beefy/IStrategyConcLiq.sol";
// import {SafeERC20Upgradeable, IERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

// contract CowcentralizedStrategyMock is IStrategyConcLiq {
//     using SafeERC20Upgradeable for IERC20Upgradeable;

//     address public pool;
//     address public vault;
//     address public lpToken0;
//     address public lpToken1;
//     uint256 public price;

//     bool private calm;
//     bool private initliazed = false;

//     function initliaze(address _pool, address _vault, address _lpToken0, address _lpToken1) external {
//         if(!initliazed) {
//             pool = _pool;
//             vault = _vault;
//             lpToken0 = _lpToken0;
//             lpToken1 = _lpToken1;
//             initliazed = true;
//         } else {
//             revert("Already initialized");
//         }
//     }

//     function balances() external view override returns (uint256, uint256) {
//         return (IERC20Upgradeable(lpToken0).balanceOf(address(this)), IERC20Upgradeable(lpToken1).balanceOf(address(this)));
//     }

//     function beforeAction() external override {}

//     function deposit() external override {}

//     function withdraw(uint256 _amount0, uint256 _amount1) external override {
//         if (_amount0 > 0) IERC20Upgradeable(lpToken0).safeTransfer(vault, _amount0);
//         if (_amount1 > 0) IERC20Upgradeable(lpToken1).safeTransfer(vault, _amount1);
//     }

//     function isCalm() external view override returns (bool) {
//         return calm;
//     }

//     function setCalm(bool _calm) external {
//         calm = _calm;
//     }

//     function setPrice(uint256 _price) external {
//         price = _price;
//     }
// }
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import { IChainlink } from "../interfaces/oracle/IChainlink.sol";

contract ChainlinkMock is IChainlink {
    int256 private _latestAnswer;
    uint8 private _decimals;

    constructor(uint8 initialDecimals, int256 initialAnswer) {
        _decimals = initialDecimals;
        _latestAnswer = initialAnswer;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function setDecimals(uint8 newDecimals) public {
        _decimals = newDecimals;
    }

    function latestAnswer() public view returns (int256) {
        return _latestAnswer;
    }

    function setLatestAnswer(int256 newAnswer) public {
        _latestAnswer = newAnswer;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin-4/contracts/token/ERC20/ERC20.sol";

contract TokenMock is ERC20 {
    uint8 private _decimals;
    
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals
    ) ERC20(tokenName, tokenSymbol) {
        _decimals = tokenDecimals;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mintTo(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
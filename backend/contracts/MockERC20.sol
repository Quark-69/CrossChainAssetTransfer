// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    address public owner;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(owner, initialBalance * (10 ** uint256(decimals())));
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount * (10 ** uint256(decimals())));
    }
}
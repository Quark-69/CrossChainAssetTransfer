// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainAGateway is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    
    struct Transfer {
        address token;
        uint256 amount;
        bool unlocked;
    }

    uint256 public globalNonce;
    mapping(uint256 => Transfer) public transfers;
    mapping(address => mapping(uint256 => bool)) public usedUnlockNonces;

    event Locked(
        uint256 indexed nonce,
        address indexed token,
        address indexed sender,
        address receiver,
        uint256 amount
    );

    event Unlocked(
        uint256 indexed nonce,
        address indexed token,
        address receiver,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function lock(
        address tokenAddr,
        address receiver,
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "Invalid amount");
        globalNonce++;
        
        IERC20 token = IERC20(tokenAddr);
        token.safeTransferFrom(msg.sender, address(this), amount);
        transfers[globalNonce] = Transfer({
            token: address(token),
            amount: amount,
            unlocked: false
        });

        emit Locked(globalNonce, address(token), msg.sender, receiver, amount);
    }

    function unlock(
        uint256 nonce,
        address receiver,
        address token,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(!usedUnlockNonces[token][nonce], "Nonce used");
        require(transfers[nonce].amount == amount, "Amount mismatch");
        require(!transfers[nonce].unlocked, "Already unlocked");

        usedUnlockNonces[token][nonce] = true;
        transfers[nonce].unlocked = true;
        IERC20(token).safeTransfer(receiver, amount);

        emit Unlocked(nonce, token, receiver, amount);
    }
}
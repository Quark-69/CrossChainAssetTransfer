// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedToken.sol";

contract ChainBGateway is Ownable {
    WrappedTokenFactory public immutable factory;
    mapping(address => mapping(uint256 => bool)) public usedMintNonces;

    event Minted(
        uint256 indexed nonce,
        address indexed originalToken,
        address indexed receiver,
        uint256 amount
    );

    event Burned(
        address indexed sender,
        address indexed originalToken,
        uint256 amount
    );

    constructor(WrappedTokenFactory _factory) Ownable(msg.sender) {
        factory = _factory;
    }

    function mint(
        uint256 nonce,
        address originalToken,
        address receiver,
        uint256 amount
    ) external onlyOwner {
        require(!usedMintNonces[originalToken][nonce], "Nonce used");
        usedMintNonces[originalToken][nonce] = true;

        address wrappedToken = factory.originalToWrapped(originalToken);
        if(wrappedToken == address(0)) {
            wrappedToken = factory.createWrappedToken(originalToken);
        }
        
        WrappedERC20(wrappedToken).mint(receiver, amount);
        emit Minted(nonce, originalToken, receiver, amount);
    }

    function burn(address wrappedToken, uint256 amount) external {
        require(factory.isWrappedToken(wrappedToken), "Invalid token");
        WrappedERC20(wrappedToken).burn(msg.sender, amount);
        emit Burned(msg.sender, WrappedERC20(wrappedToken).originalToken(), amount);
    }
}
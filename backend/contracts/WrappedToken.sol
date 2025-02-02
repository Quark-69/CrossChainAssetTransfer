// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedTokenFactory is Ownable {
    mapping(address => address) public originalToWrapped;
    mapping(address => bool) public isWrappedToken;

    event NewWrappedToken(address indexed original, address wrapped);

    constructor() Ownable(msg.sender) {}

    function createWrappedToken(address originalToken) external returns (address) {
        require(originalToWrapped[originalToken] == address(0), "Already exists");
        
        bytes memory bytecode = abi.encodePacked(
            type(WrappedERC20).creationCode,
            abi.encode(originalToken)
        );
        
        address wrappedToken;
        assembly {
            wrappedToken := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        
        originalToWrapped[originalToken] = wrappedToken;
        isWrappedToken[wrappedToken] = true;
        
        emit NewWrappedToken(originalToken, wrappedToken);
        return wrappedToken;
    }
}

contract WrappedERC20 is ERC20 {
    address public immutable originalToken;
    
    constructor(address _originalToken) 
        ERC20(
            string(abi.encodePacked("Wrapped ", ERC20(_originalToken).name())),
            string(abi.encodePacked("w", ERC20(_originalToken).symbol()))
        )
    {
        originalToken = _originalToken;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
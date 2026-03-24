// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Token 42
 * @dev A simple ERC20 token implementation adhering to BEP-20 standards for the Tokenizer project.
 */
contract Token42 is ERC20, Ownable {
    // Mint 1,000,000 T42 tokens to the deployer on creation
    constructor() ERC20("Token 42", "T42") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}

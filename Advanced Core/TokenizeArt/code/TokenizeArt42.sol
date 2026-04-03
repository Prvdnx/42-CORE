// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenizeArt 42
 * @dev A simple ERC-721 NFT contract adhering to BEP-721 standards.
 *      Artist: ookamonu
 */
contract TokenizeArt42 is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Initialize NFT collection with name containing "42" and set deployer as owner
    constructor() ERC721("TokenizeArt 42", "TA42") Ownable(msg.sender) {}

    /**
     * @dev Mints a new NFT to the specified address with the given metadata URI.
     *      Only the contract owner can mint.
     * @param to The address that will receive the NFT.
     * @param uri The IPFS metadata URI for this NFT.
     * @return tokenId The ID of the newly minted NFT.
     */
    function mint(address to, string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // --- Required overrides for Solidity inheritance ---

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

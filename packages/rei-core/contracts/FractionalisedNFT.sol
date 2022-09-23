//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import './REI.sol';

contract FractionalisedNFT is ERC20, ERC721Holder {
    address public marketplaceAddress;
    REI rei;
    uint256 public tokenId;
    uint256 private numberOfFractions;

    constructor(
        string memory _name,
        string memory _symbol,
        address reiAddress,
        uint256 _tokenId,
        address to,
        uint256 _amount,
        address _marketplaceAddress
    ) ERC20(_name, _symbol) {
        rei = REI(reiAddress);
        tokenId = _tokenId;
        _mint(to, _amount);
        marketplaceAddress = _marketplaceAddress;
    }

    function decimals() public pure override returns (uint8) {
        return 1;
    }

    function unfractionlise() public returns (bool) {
        uint256 balance = balanceOf(msg.sender);
        require(balance == totalSupply(), 'Need full ownership');
        _burn(_msgSender(), balance);
        rei.transferFrom(address(this), msg.sender, tokenId);
        return true;
    }
}

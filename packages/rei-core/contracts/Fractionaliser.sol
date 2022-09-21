//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './FractionalisedNFT.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract Fractionaliser is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public totalFractionalised;
    address public marketplaceAddress;
    address public reiAddress;

    mapping(uint256 => address) public fractionaliseds;

    event Fractionalised(
        uint256 indexed fractionalisedId,
        address indexed fractionaliser,
        address indexed fractionalisedNftAddress,
        uint256 fractionQuantity,
        uint256 tokenId,
        address NFTContractAddress
    );

    constructor(address _marketplaceAddress, address _reiAddress) {
        marketplaceAddress = _marketplaceAddress;
        reiAddress = _reiAddress;
    }

    function fractionalise(
        string memory _name,
        string memory _symbol,
        uint256 _tokenId,
        uint256 _amount
    ) external returns (uint256) {
        require(_amount > 0, 'Amount needs to be more than 0');
        FractionalisedNFT fractionalisednft = new FractionalisedNFT(
            _name,
            _symbol,
            reiAddress,
            _tokenId,
            _msgSender(),
            _amount,
            marketplaceAddress
        );

        address fractionalisednftAddress = address(fractionalisednft);

        IERC721(reiAddress).safeTransferFrom(
            _msgSender(),
            fractionalisednftAddress,
            _tokenId
        );

        totalFractionalised.increment();
        fractionaliseds[
            totalFractionalised.current()
        ] = fractionalisednftAddress;
        emit Fractionalised(
            totalFractionalised.current(),
            _msgSender(),
            fractionalisednftAddress,
            _amount,
            _tokenId,
            reiAddress
        );
        return totalFractionalised.current();
    }

    function setMarketplaceAddress(address _marketplaceAddress) external {
        marketplaceAddress = _marketplaceAddress;
    }

    function setReiAddress(address _reiAddress) external {
        reiAddress = _reiAddress;
    }

    function getAddressOfFractionisedId(uint256 id)
        external
        view
        returns (address)
    {
        return fractionaliseds[id];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Approver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract REI is Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Approver approverContract;
    string public baseURI = 'https://ipfs.io/ipfs/';
    mapping(uint256 => string) private _hashes;

    constructor(
        string memory name,
        string memory symbol,
        address approverAddress
    ) ERC721(name, symbol) {
        approverContract = Approver(approverAddress);
    }

    modifier onlyApprover(address msgSender) {
        require(
            approverContract.isApprover(msgSender) || msgSender == owner(),
            'AccessControl: caller is not approver'
        );
        _;
    }

    function mint(
        address msgSender,
        address to,
        string memory tokenURI_
    ) public onlyApprover(msgSender) returns (uint256) {
        _tokenIds.increment();
        uint256 newREIID = _tokenIds.current();
        _mint(to, newREIID);
        _hashes[newREIID] = tokenURI_;
        return newREIID;
    }

    function ownerTokenIds(address owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(owner);
        require(balance > 0, 'Owner dont have tokens');
        uint256[] memory result = new uint256[](balance);
        for (uint256 i; i < balance; i++) {
            result[i] = tokenOfOwnerByIndex(owner, i);
        }
        return result;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(baseURI, _hashes[tokenId]));
    }

    function setBaseURI(string calldata _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function setApproverContract(address approverAddress) public onlyOwner {
        require(approverAddress != address(0), 'Invalid address');
        approverContract = Approver(approverAddress);
    }
}

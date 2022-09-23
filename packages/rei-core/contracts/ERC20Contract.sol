// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Contract is ERC20, ERC20Burnable {
    constructor() ERC20('ERC20 Token Sample1', 'Sample 1') {
        _mint(msg.sender, 100_000_000_000 * 10**18);
    }
}

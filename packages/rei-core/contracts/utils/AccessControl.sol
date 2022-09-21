//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Context.sol';

abstract contract AccessControl is Ownable {
    mapping(address => bool) private _approvers;

    event AccessSet(address _user, bool _enabled);

    function setApprover(address approver, bool enabled) public onlyOwner {
        require(approver != address(0), 'Invalid Approver Address');
        _approvers[approver] = enabled;
        emit AccessSet(approver, enabled);
    }

    function setApprovers(address[] calldata approvers, bool enabled)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < approvers.length; i++) {
            address approver = approvers[i];
            setApprover(approver, enabled);
        }
    }

    function isApprover(address approver) public view returns (bool) {
        return _approvers[approver];
    }

    modifier onlyApprover() {
        require(
            _approvers[_msgSender()] || _msgSender() == owner(),
            'AccessControl: caller is not approver'
        );
        _;
    }
}

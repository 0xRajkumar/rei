//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './utils/AccessControl.sol';
import './REI.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Approver is AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter public numberOfApplications;
    REI rei;

    enum ApplicationStatus {
        Pending,
        Accepted,
        Rejected
    }

    struct REIAttributes {
        string country;
        string city;
        string gpsCoordinates;
        uint256 surfaceAreainMTRs;
    }

    struct Application {
        uint256 applicationNumber;
        address applicant;
        string name;
        string description;
        string imageURI;
        REIAttributes attributes;
        ApplicationStatus applicationStatus;
    }

    mapping(uint256 => Application) public Applications;

    constructor(address reiAddress) {
        rei = REI(reiAddress);
    }

    function applyForApproval(
        string memory name,
        string memory description,
        string memory imageURI,
        REIAttributes memory attributions
    ) public {
        numberOfApplications.increment();
        uint256 applicationNumber = numberOfApplications.current();
        Applications[applicationNumber] = Application(
            applicationNumber,
            _msgSender(),
            name,
            description,
            imageURI,
            attributions,
            ApplicationStatus.Pending
        );
    }

    function applicationDecision(
        uint256 applicationNumber,
        ApplicationStatus status,
        string calldata reiURI
    ) public onlyApprover {
        require(
            applicationNumber <= numberOfApplications.current(),
            'No application with this application number'
        );
        Application storage application = Applications[applicationNumber];
        require(
            application.applicationStatus == ApplicationStatus.Pending,
            'application is not in pending state'
        );
        require(
            status != ApplicationStatus.Pending,
            "It's already in pending state"
        );
        application.applicationStatus == status;
        if (status == ApplicationStatus.Accepted) {
            rei.mint(application.applicant, reiURI);
        }
    }

    function setREIAddress(address reiaddress) public onlyOwner {
        rei = REI(reiaddress);
    }
}

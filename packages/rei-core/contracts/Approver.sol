//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './utils/AccessControl.sol';
import './REI.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Approver is AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter public numberOfApplications;
    Counters.Counter public numberOfApplicationsAccepted;
    Counters.Counter public numberOfApplicationsRejected;
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
        uint256 surfaceAreaInMTRs;
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

    event NewApplicationCreated(
        uint256 indexed applicationNumber,
        address indexed applicant,
        string name,
        string description,
        string imageURI,
        string country,
        string city,
        string gpsCoordinates,
        uint256 surfaceAreaInMTRs,
        ApplicationStatus applicationStatus
    );

    event DecisionTaken(
        uint256 indexed applicationNumber,
        address indexed decisionTaker,
        ApplicationStatus indexed decision
    );

    constructor(address reiAddress) {
        rei = REI(reiAddress);
    }

    function applyForApproval(
        string memory name,
        string memory description,
        string memory imageURI,
        string memory country,
        string memory city,
        string memory gpsCoordinates,
        uint256 surfaceAreaInMTRs
    ) public {
        numberOfApplications.increment();
        uint256 applicationNumber = numberOfApplications.current();
        REIAttributes memory attributions = REIAttributes(
            country,
            city,
            gpsCoordinates,
            surfaceAreaInMTRs
        );
        Applications[applicationNumber] = Application(
            applicationNumber,
            _msgSender(),
            name,
            description,
            imageURI,
            attributions,
            ApplicationStatus.Pending
        );
        emit NewApplicationCreated(
            applicationNumber,
            _msgSender(),
            name,
            description,
            imageURI,
            country,
            city,
            gpsCoordinates,
            surfaceAreaInMTRs,
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
        application.applicationStatus = status;
        if (status == ApplicationStatus.Accepted) {
            numberOfApplicationsAccepted.increment();
            rei.mint(_msgSender(), application.applicant, reiURI);
        } else {
            numberOfApplicationsRejected.increment();
        }
        emit DecisionTaken(applicationNumber, _msgSender(), status);
    }

    function getPendingApplication()
        public
        view
        returns (Application[] memory)
    {
        uint256 applicationsCount = numberOfApplications.current();
        uint256 numberOfPendingApplications = numberOfApplications.current() -
            numberOfApplicationsAccepted.current() -
            numberOfApplicationsRejected.current();

        uint256 currentIndex = 0;

        Application[] memory applications = new Application[](
            numberOfPendingApplications
        );
        for (uint256 i = 0; i < applicationsCount; i++) {
            if (
                Applications[i + 1].applicationStatus ==
                ApplicationStatus.Pending
            ) {
                uint256 currentId = i + 1;
                Application storage currentApplication = Applications[
                    currentId
                ];
                applications[currentIndex] = currentApplication;
                currentIndex += 1;
            }
        }
        return applications;
    }

    function getRejectedApplication()
        public
        view
        returns (Application[] memory)
    {
        uint256 applicationsCount = numberOfApplications.current();
        uint256 currentIndex = 0;

        Application[] memory applications = new Application[](
            numberOfApplicationsRejected.current()
        );
        for (uint256 i = 0; i < applicationsCount; i++) {
            if (
                Applications[i + 1].applicationStatus ==
                ApplicationStatus.Rejected
            ) {
                uint256 currentId = i + 1;
                Application storage currentApplication = Applications[
                    currentId
                ];
                applications[currentIndex] = currentApplication;
                currentIndex += 1;
            }
        }
        return applications;
    }

    function getApplicationAt(uint256 index)
        public
        view
        returns (Application memory)
    {
        require(numberOfApplications.current() >= index, 'not exist');
        return Applications[index];
    }

    function setREIAddress(address reiaddress) public onlyOwner {
        rei = REI(reiaddress);
    }
}

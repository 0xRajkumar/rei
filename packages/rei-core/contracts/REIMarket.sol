// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Fractionaliser.sol';
import './FractionalisedNFT.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract REIMarket is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter NumberOfLended;
    Fractionaliser FractionaliserContract;
    IERC20 USDTContract;
    uint256 public relaxationPeriodForlonee;

    constructor(address fractionaliser, address usdtAddress) {
        FractionaliserContract = Fractionaliser(fractionaliser);
        USDTContract = IERC20(usdtAddress);
    }

    enum LendStatus {
        Created,
        Funded,
        Taken,
        Repayed,
        Liquidated
    }
    struct LendForLoan {
        uint256 fractionalisedId;
        address fractionalisedNftAddress;
        uint256 numberOfFractions;
        uint256 numberOfFractionsInvested;
        address payable Loanee;
        Counters.Counter numberOfInvesters;
        mapping(address => uint256) InvestmentsByInvesters;
        uint256 LoanAmountPerFraction;
        uint256 InterestPerFractionInPercentage;
        uint256 repayByTimeStamp;
        uint256 startedAt;
        LendStatus status;
    }

    mapping(uint256 => LendForLoan) LendedForLoans;

    function applyForLoan(
        uint256 _fractionalisedId,
        uint256 _numberOfFractions,
        uint256 _loanAmountPerFraction,
        uint256 _interestPerFractionInPercentage, // as a % unit, from 0 - 10000 (2 extra 0s) for eg 25% is 2500
        uint256 repayByTimeStamp
    ) public {
        require(
            _fractionalisedId <= FractionaliserContract.totalFractionalised(),
            'Invalid'
        );
        address _fractionalisedNftAddress = FractionaliserContract
            .getAddressOfFractionisedId(_fractionalisedId);
        require(
            FractionalisedNFT(_fractionalisedNftAddress).balanceOf(
                _msgSender()
            ) >= _numberOfFractions,
            'Invalid'
        );

        require(
            _loanAmountPerFraction > 0 && _interestPerFractionInPercentage > 0,
            'Invalid'
        );

        require(
            FractionalisedNFT(_fractionalisedNftAddress).allowance(
                _msgSender(),
                address(this)
            ) >= _numberOfFractions,
            ''
        );

        FractionalisedNFT(_fractionalisedNftAddress).transferFrom(
            _msgSender(),
            address(this),
            _numberOfFractions
        );

        NumberOfLended.increment();

        LendForLoan storage lended = LendedForLoans[NumberOfLended.current()];
        lended.fractionalisedId = _fractionalisedId;
        lended.fractionalisedNftAddress = _fractionalisedNftAddress;
        lended.numberOfFractions = _numberOfFractions;
        lended.Loanee = payable(_msgSender());
        lended.LoanAmountPerFraction = _loanAmountPerFraction;
        lended
            .InterestPerFractionInPercentage = _interestPerFractionInPercentage;
        lended.repayByTimeStamp = repayByTimeStamp;
        lended.status = LendStatus.Created;
    }

    function invest(uint256 lendingNumber, uint256 _numberOfFraction) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            _numberOfFraction <=
                selectedLended.numberOfFractions -
                    selectedLended.numberOfFractionsInvested,
            ''
        );
        require(
            USDTContract.balanceOf(_msgSender()) >=
                selectedLended.LoanAmountPerFraction * _numberOfFraction,
            ''
        );
        require(
            USDTContract.allowance(_msgSender(), address(this)) >=
                selectedLended.LoanAmountPerFraction * _numberOfFraction,
            ''
        );
        USDTContract.transferFrom(
            _msgSender(),
            address(this),
            selectedLended.LoanAmountPerFraction * _numberOfFraction
        );
        FractionalisedNFT(selectedLended.fractionalisedNftAddress).transferFrom(
                address(this),
                _msgSender(),
                _numberOfFraction
            );
        selectedLended.numberOfFractionsInvested =
            selectedLended.numberOfFractionsInvested +
            _numberOfFraction;
        if (selectedLended.InvestmentsByInvesters[_msgSender()] == 0) {
            selectedLended.numberOfInvesters.increment();
        }
        selectedLended.InvestmentsByInvesters[_msgSender()] =
            selectedLended.InvestmentsByInvesters[_msgSender()] +
            _numberOfFraction;
        if (
            selectedLended.numberOfFractions ==
            selectedLended.numberOfFractionsInvested
        ) {
            selectedLended.status = LendStatus.Funded;
            selectedLended.startedAt = block.timestamp;
        }
    }

    function withdrawBeforeFunded(
        uint256 lendingNumber,
        uint256 _numberOfFraction
    ) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(selectedLended.status == LendStatus.Created);
        require(
            _numberOfFraction <=
                selectedLended.InvestmentsByInvesters[_msgSender()],
            ''
        );
        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .balanceOf(_msgSender()) >= _numberOfFraction,
            'Invalid'
        );

        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .allowance(_msgSender(), address(this)) >= _numberOfFraction,
            ''
        );
        FractionalisedNFT(selectedLended.fractionalisedNftAddress).transferFrom(
                _msgSender(),
                address(this),
                _numberOfFraction
            );
        USDTContract.transferFrom(
            address(this),
            _msgSender(),
            selectedLended.LoanAmountPerFraction * _numberOfFraction
        );
        selectedLended.numberOfFractionsInvested =
            selectedLended.numberOfFractionsInvested -
            _numberOfFraction;
        selectedLended.InvestmentsByInvesters[_msgSender()] =
            selectedLended.InvestmentsByInvesters[_msgSender()] -
            _numberOfFraction;
        if (selectedLended.InvestmentsByInvesters[_msgSender()] == 0) {
            selectedLended.numberOfInvesters.decrement();
        }
    }

    function withdrawLoan(uint256 lendingNumber) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(selectedLended.status == LendStatus.Funded);
        require(selectedLended.Loanee == _msgSender(), '');
        selectedLended.status = LendStatus.Taken;
        USDTContract.transferFrom(
            address(this),
            _msgSender(),
            selectedLended.LoanAmountPerFraction *
                selectedLended.numberOfFractions
        );
    }

    function repay(uint256 lendingNumber) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            selectedLended.repayByTimeStamp + selectedLended.startedAt >=
                block.timestamp,
            ''
        );
        require(selectedLended.status == LendStatus.Taken);
        uint256 loanPerFraction = selectedLended.LoanAmountPerFraction;
        uint256 interestPerFraction = (selectedLended.LoanAmountPerFraction *
            selectedLended.InterestPerFractionInPercentage) / 10000;
        uint256 totalPerFraction = loanPerFraction + interestPerFraction;
        require(
            USDTContract.balanceOf(_msgSender()) >=
                totalPerFraction * selectedLended.numberOfFractions,
            ''
        );
        require(
            USDTContract.allowance(_msgSender(), address(this)) >=
                totalPerFraction * selectedLended.numberOfFractions,
            ''
        );
        USDTContract.transferFrom(
            _msgSender(),
            address(this),
            totalPerFraction * selectedLended.numberOfFractions
        );
        selectedLended.status = LendStatus.Repayed;
    }

    function getBackInvestmentWithInterest(uint256 lendingNumber) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            selectedLended.repayByTimeStamp +
                selectedLended.startedAt +
                relaxationPeriodForlonee >=
                block.timestamp,
            ''
        );
        require(selectedLended.status == LendStatus.Repayed);
        uint256 loanPerFraction = selectedLended.LoanAmountPerFraction;
        uint256 interestPerFraction = (selectedLended.LoanAmountPerFraction *
            selectedLended.InterestPerFractionInPercentage) / 10000;
        uint256 totalPerFraction = loanPerFraction + interestPerFraction;
        uint256 totalFraction = selectedLended.InvestmentsByInvesters[
            _msgSender()
        ];
        uint256 totalNeedToPay = totalPerFraction * totalFraction;
        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .balanceOf(_msgSender()) == totalFraction,
            'Invalid'
        );

        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .allowance(_msgSender(), address(this)) >= totalFraction,
            ''
        );

        FractionalisedNFT(selectedLended.fractionalisedNftAddress).transferFrom(
                _msgSender(),
                selectedLended.Loanee,
                totalFraction
            );
        USDTContract.transferFrom(address(this), _msgSender(), totalNeedToPay);
        selectedLended.InvestmentsByInvesters[_msgSender()] = 0;
        selectedLended.numberOfFractionsInvested =
            selectedLended.numberOfFractionsInvested -
            totalFraction;
        selectedLended.numberOfInvesters.decrement();
    }

    function setFractionaliserContract(address fractionaliser) external {
        FractionaliserContract = Fractionaliser(fractionaliser);
    }
}

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
    address public USDTAddress;
    uint256 public relaxationPeriodForlonee;

    constructor(address fractionaliser, address usdtAddress) {
        FractionaliserContract = Fractionaliser(fractionaliser);
        USDTContract = IERC20(usdtAddress);
        USDTAddress = usdtAddress;
    }

    function updateUSDT(address usdtAddress) public {
        USDTContract = IERC20(usdtAddress);
        USDTAddress = usdtAddress;
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
        address liquidator;
    }
    event Applied(
        uint256 lendingNumber,
        uint256 fractionalisedId,
        address fractionalisedNftAddress,
        uint256 numberOfFractions,
        address Loanee,
        uint256 loanAmountPerFraction,
        uint256 interestPerFractionInPercentage,
        uint256 repayByTimeStamp,
        LendStatus status
    );

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
            'Invalid fractionalisedId'
        );
        require(
            _numberOfFractions > 0,
            'Number of Fraction should be more than zero'
        );
        address _fractionalisedNftAddress = FractionaliserContract
            .getAddressOfFractionisedId(_fractionalisedId);
        require(
            FractionalisedNFT(_fractionalisedNftAddress).balanceOf(
                _msgSender()
            ) >= _numberOfFractions,
            'Invalid  balanceOf'
        );

        require(
            _loanAmountPerFraction > 0 && _interestPerFractionInPercentage > 0,
            'Invalid _loanAmountPerFraction'
        );

        require(
            FractionalisedNFT(_fractionalisedNftAddress).allowance(
                _msgSender(),
                address(this)
            ) >= _numberOfFractions,
            'Low allowance'
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
        emit Applied(
            NumberOfLended.current(),
            _fractionalisedId,
            _fractionalisedNftAddress,
            _numberOfFractions,
            lended.Loanee,
            _loanAmountPerFraction,
            _interestPerFractionInPercentage,
            repayByTimeStamp,
            LendStatus.Created
        );
    }

    event Invested(
        uint256 lendingNumber,
        uint256 numberOfFractionsInvested,
        uint256 numberOfInvesters,
        uint256 startedAt,
        LendStatus status,
        address invester,
        uint256 amountInvestedByInvester
    );

    function invest(uint256 lendingNumber, uint256 _numberOfFraction) public {
        require(lendingNumber <= NumberOfLended.current(), '');
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            _numberOfFraction <=
                selectedLended.numberOfFractions -
                    selectedLended.numberOfFractionsInvested,
            'Wrong number of fraction'
        );
        uint256 totalLoan = selectedLended.LoanAmountPerFraction *
            _numberOfFraction;
        require(
            USDTContract.balanceOf(_msgSender()) >= totalLoan,
            'Low balance'
        );
        require(
            USDTContract.allowance(_msgSender(), address(this)) >= totalLoan,
            'insufficient allowance'
        );
        USDTContract.transferFrom(_msgSender(), address(this), totalLoan);
        FractionalisedNFT(selectedLended.fractionalisedNftAddress).transfer(
            _msgSender(),
            _numberOfFraction
        );
        uint256 totalNumberOfFractionInvested = selectedLended
            .numberOfFractionsInvested + _numberOfFraction;
        selectedLended
            .numberOfFractionsInvested = totalNumberOfFractionInvested;
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
        emit Invested(
            lendingNumber,
            totalNumberOfFractionInvested,
            selectedLended.numberOfInvesters.current(),
            selectedLended.startedAt,
            selectedLended.status,
            _msgSender(),
            selectedLended.InvestmentsByInvesters[_msgSender()]
        );
    }

    event WithdrawalBeforeFunded(
        uint256 lendingNumber,
        uint256 numberOfFractionsInvested,
        uint256 numberOfInvesters,
        address invester,
        uint256 amountInvestedByInvester
    );

    function withdrawBeforeFunded(
        uint256 lendingNumber,
        uint256 _numberOfFraction
    ) public {
        require(
            lendingNumber <= NumberOfLended.current(),
            'Wrong lending number'
        );
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(selectedLended.status == LendStatus.Created);
        require(
            _numberOfFraction <=
                selectedLended.InvestmentsByInvesters[_msgSender()],
            'Wrong number of fraction'
        );
        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .balanceOf(_msgSender()) >= _numberOfFraction,
            'Low balance'
        );

        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .allowance(_msgSender(), address(this)) >= _numberOfFraction,
            'Low allowance'
        );
        FractionalisedNFT(selectedLended.fractionalisedNftAddress).transferFrom(
                _msgSender(),
                address(this),
                _numberOfFraction
            );
        USDTContract.transfer(
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
        emit WithdrawalBeforeFunded(
            lendingNumber,
            selectedLended.numberOfFractionsInvested,
            selectedLended.numberOfInvesters.current(),
            _msgSender(),
            selectedLended.InvestmentsByInvesters[_msgSender()]
        );
    }

    event WithDrawalLoan(uint256 lendingNumber, LendStatus status);

    function withdrawLoan(uint256 lendingNumber) public {
        require(
            lendingNumber <= NumberOfLended.current(),
            'Wrong lending number'
        );
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(selectedLended.status == LendStatus.Funded);
        require(
            selectedLended.Loanee == _msgSender(),
            'Only loanee can withdraw'
        );
        selectedLended.status = LendStatus.Taken;
        USDTContract.transfer(
            _msgSender(),
            selectedLended.LoanAmountPerFraction *
                selectedLended.numberOfFractions
        );
        emit WithDrawalLoan(lendingNumber, LendStatus.Taken);
    }

    event Repayed(uint256 lendingNumber, LendStatus status);

    function repay(uint256 lendingNumber) public {
        require(
            lendingNumber <= NumberOfLended.current(),
            'Wrong lending number'
        );
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            selectedLended.status == LendStatus.Taken,
            'Status should be repayed'
        );
        require(
            selectedLended.repayByTimeStamp + selectedLended.startedAt <=
                block.timestamp,
            'Repay time is not completed'
        );
        selectedLended.status = LendStatus.Repayed;
        if (
            selectedLended.repayByTimeStamp +
                selectedLended.startedAt +
                relaxationPeriodForlonee <=
            block.timestamp
        ) {
            selectedLended.liquidator = _msgSender();
            selectedLended.status = LendStatus.Liquidated;
        }
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
        emit Repayed(lendingNumber, selectedLended.status);
    }

    event InterestPaid(
        uint256 lendingNumber,
        uint256 numberOfInvesters,
        uint256 numberOfFractionsInvested,
        address invester,
        uint256 amountInvestedByInvester
    );

    function getBackInvestmentWithInterest(uint256 lendingNumber) public {
        require(
            lendingNumber <= NumberOfLended.current(),
            'Wrong lending number'
        );
        LendForLoan storage selectedLended = LendedForLoans[lendingNumber];
        require(
            selectedLended.status == LendStatus.Repayed ||
                selectedLended.status == LendStatus.Liquidated,
            'Not yet repayed'
        );
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
            'low balance'
        );

        require(
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .allowance(_msgSender(), address(this)) >= totalFraction,
            'Low allowance'
        );

        if (selectedLended.liquidator == address(0)) {
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .transferFrom(
                    _msgSender(),
                    selectedLended.Loanee,
                    totalFraction
                );
        } else {
            FractionalisedNFT(selectedLended.fractionalisedNftAddress)
                .transferFrom(
                    _msgSender(),
                    selectedLended.liquidator,
                    totalFraction
                );
        }
        USDTContract.transfer(_msgSender(), totalNeedToPay);
        selectedLended.InvestmentsByInvesters[_msgSender()] = 0;
        selectedLended.numberOfFractionsInvested =
            selectedLended.numberOfFractionsInvested -
            totalFraction;
        selectedLended.numberOfInvesters.decrement();
        emit InterestPaid(
            lendingNumber,
            selectedLended.numberOfInvesters.current(),
            selectedLended.numberOfFractionsInvested,
            _msgSender(),
            0
        );
    }

    function setFractionaliserContract(address fractionaliser) external {
        FractionaliserContract = Fractionaliser(fractionaliser);
    }
}

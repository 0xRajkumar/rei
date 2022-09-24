import {
  BigDecimal,
  bigInt,
  BigInt,
  ByteArray,
  Bytes,
} from "@graphprotocol/graph-ts";
import {
  Applied as AppliedEvent,
  Invested as InvestedEvent,
  WithdrawalBeforeFunded as WithdrawalBeforeFundedEvent,
  Repayed as RepayedEvent,
  WithDrawalLoan as WithDrawalLoanEvent,
  InterestPaid as InterestPaidEvent,
} from "../generated/REIMarket/REIMarket";
import {
  Invester,
  LendedForLoan,
  InvesterLendedForLoan,
} from "../generated/schema";
import { REI as REIContract } from "../generated/REI/REI";
import { Fractionaliser as FractionaliserContract } from "../generated/Fractionaliser/Fractionaliser";
const REICONTRACTADDRESS = "0x686898109964C4B1A0b5C074E8C23F8Ef0c8E860";
import { Fractionalised, UserFractionalised } from "../generated/schema";

export function handleApplied(event: AppliedEvent): void {
  let lended = new LendedForLoan(event.params.lendingNumber.toString());
  lended.lendingNumber = event.params.lendingNumber;
  lended.fractionalisedId = event.params.fractionalisedId;
  let fractionalised = Fractionalised.load(
    event.params.fractionalisedId.toString()
  );
  if (fractionalised) {
    fractionalised.fractionQuantity = fractionalised.fractionQuantity.minus(
      event.params.numberOfFractions
    );
    fractionalised.save();
  }
  lended.fractionalisedNftAddress = event.params.fractionalisedNftAddress;
  lended.numberOfFractions = event.params.numberOfFractions;
  lended.Loanee = event.params.Loanee;
  lended.loanAmountPerFraction = event.params.loanAmountPerFraction;
  lended.interestPerFractionInPercentage =
    event.params.interestPerFractionInPercentage;
  lended.repayByTimeStamp = event.params.repayByTimeStamp;
  lended.startedAt = BigInt.fromString("0");
  lended.status = event.params.status;
  lended.numberOfFractionsInvested = BigInt.fromString("0");
  lended.numberOfInvesters = BigInt.fromString("0");
  lended.save();
}

export function handleInvested(event: InvestedEvent): void {
  const investerlendedforloans = new InvesterLendedForLoan(
    event.params.invester
      .concat(
        Bytes.fromByteArray(ByteArray.fromBigInt(event.params.lendingNumber))
      )
      .toString()
  );

  investerlendedforloans.amount = event.params.amountInvestedByInvester;
  investerlendedforloans.invester = event.params.invester.toHexString();
  investerlendedforloans.lendedforloan = event.params.lendingNumber.toString();

  const invester = new Invester(event.params.invester.toHexString());
  invester.invester = event.params.invester.toHexString();

  let lended = new LendedForLoan(event.params.lendingNumber.toString());
  lended.numberOfFractionsInvested = event.params.numberOfFractionsInvested;
  lended.numberOfInvesters = event.params.numberOfInvesters;
  lended.startedAt = event.params.startedAt;
  lended.status = event.params.status;
  investerlendedforloans.save();
  invester.save();
  lended.save();
}
export function handleWithdrawalBeforeFunded(
  event: WithdrawalBeforeFundedEvent
): void {
  const investerlendedforloans = InvesterLendedForLoan.load(
    event.params.invester
      .concat(
        Bytes.fromByteArray(ByteArray.fromBigInt(event.params.lendingNumber))
      )
      .toString()
  );
  if (investerlendedforloans) {
    investerlendedforloans.amount = event.params.amountInvestedByInvester;
    investerlendedforloans.invester = event.params.invester.toHexString();
    investerlendedforloans.save();
  }
  const invester = Invester.load(event.params.invester.toHexString());
  if (invester) {
    invester.invester = event.params.invester.toHexString();
    invester.save();
  }
  let lended = LendedForLoan.load(event.params.lendingNumber.toString());
  if (lended) {
    lended.numberOfInvesters = event.params.numberOfInvesters;
    lended.numberOfFractionsInvested = event.params.numberOfFractionsInvested;
    lended.save();
  }
}

export function handleRepayed(event: RepayedEvent): void {
  let lended = LendedForLoan.load(event.params.lendingNumber.toString());
  if (lended) {
    lended.status = event.params.status;
    lended.save();
  }
}
export function handleWithDrawalLoan(event: WithDrawalLoanEvent): void {
  let lended = LendedForLoan.load(event.params.lendingNumber.toString());
  if (lended) {
    lended.status = event.params.status;
    lended.save();
  }
}

export function handleInterestPaid(event: InterestPaidEvent): void {
  let lended = LendedForLoan.load(event.params.lendingNumber.toString());
  if (lended) {
    lended.numberOfInvesters = event.params.numberOfInvesters;
    lended.numberOfFractionsInvested = event.params.numberOfFractionsInvested;
    lended.save();
  }
  const investerlendedforloans = InvesterLendedForLoan.load(
    event.params.invester
      .concat(
        Bytes.fromByteArray(ByteArray.fromBigInt(event.params.lendingNumber))
      )
      .toString()
  );
  if (investerlendedforloans) {
    investerlendedforloans.amount = event.params.amountInvestedByInvester;
    investerlendedforloans.save();
  }
}

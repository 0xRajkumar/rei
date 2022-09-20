import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Fractionalised,
  FractionaliserOwnershipTransferred
} from "../generated/Fractionaliser/Fractionaliser"

export function createFractionalisedEvent(
  fractionalisedId: BigInt,
  fractionaliser: Address,
  fractionalisedNftAddress: Address,
  fractionQuantity: BigInt,
  tokenId: BigInt,
  NFTContractAddress: Address
): Fractionalised {
  let fractionalisedEvent = changetype<Fractionalised>(newMockEvent())

  fractionalisedEvent.parameters = new Array()

  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "fractionalisedId",
      ethereum.Value.fromUnsignedBigInt(fractionalisedId)
    )
  )
  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "fractionaliser",
      ethereum.Value.fromAddress(fractionaliser)
    )
  )
  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "fractionalisedNftAddress",
      ethereum.Value.fromAddress(fractionalisedNftAddress)
    )
  )
  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "fractionQuantity",
      ethereum.Value.fromUnsignedBigInt(fractionQuantity)
    )
  )
  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  fractionalisedEvent.parameters.push(
    new ethereum.EventParam(
      "NFTContractAddress",
      ethereum.Value.fromAddress(NFTContractAddress)
    )
  )

  return fractionalisedEvent
}

export function createFractionaliserOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): FractionaliserOwnershipTransferred {
  let fractionaliserOwnershipTransferredEvent = changetype<
    FractionaliserOwnershipTransferred
  >(newMockEvent())

  fractionaliserOwnershipTransferredEvent.parameters = new Array()

  fractionaliserOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  fractionaliserOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return fractionaliserOwnershipTransferredEvent
}

import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
<<<<<<< HEAD
  AccessSet,
  DecisionTaken,
  NewApplicationCreated,
  OwnershipTransferred
} from "../generated/Approver/Approver"

export function createAccessSetEvent(
  _user: Address,
  _access: string,
  _enabled: boolean
): AccessSet {
  let accessSetEvent = changetype<AccessSet>(newMockEvent())

  accessSetEvent.parameters = new Array()

  accessSetEvent.parameters.push(
    new ethereum.EventParam("_user", ethereum.Value.fromAddress(_user))
  )
  accessSetEvent.parameters.push(
    new ethereum.EventParam("_access", ethereum.Value.fromString(_access))
  )
  accessSetEvent.parameters.push(
    new ethereum.EventParam("_enabled", ethereum.Value.fromBoolean(_enabled))
  )

  return accessSetEvent
}

export function createDecisionTakenEvent(
  applicationNumber: BigInt,
  decisionTaker: Address,
  decision: i32
): DecisionTaken {
  let decisionTakenEvent = changetype<DecisionTaken>(newMockEvent())

  decisionTakenEvent.parameters = new Array()

  decisionTakenEvent.parameters.push(
    new ethereum.EventParam(
      "applicationNumber",
      ethereum.Value.fromUnsignedBigInt(applicationNumber)
    )
  )
  decisionTakenEvent.parameters.push(
    new ethereum.EventParam(
      "decisionTaker",
      ethereum.Value.fromAddress(decisionTaker)
    )
  )
  decisionTakenEvent.parameters.push(
    new ethereum.EventParam(
      "decision",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(decision))
    )
  )

  return decisionTakenEvent
}

export function createNewApplicationCreatedEvent(
  applicationNumber: BigInt,
  applicant: Address,
  name: string,
  description: string,
  imageURI: string,
  country: string,
  city: string,
  gpsCoordinates: string,
  surfaceAreaInMTRs: BigInt,
  applicationStatus: i32
): NewApplicationCreated {
  let newApplicationCreatedEvent = changetype<NewApplicationCreated>(
    newMockEvent()
  )

  newApplicationCreatedEvent.parameters = new Array()

  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "applicationNumber",
      ethereum.Value.fromUnsignedBigInt(applicationNumber)
    )
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam("applicant", ethereum.Value.fromAddress(applicant))
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam("imageURI", ethereum.Value.fromString(imageURI))
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam("city", ethereum.Value.fromString(city))
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "gpsCoordinates",
      ethereum.Value.fromString(gpsCoordinates)
    )
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "surfaceAreaInMTRs",
      ethereum.Value.fromUnsignedBigInt(surfaceAreaInMTRs)
    )
  )
  newApplicationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "applicationStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(applicationStatus))
    )
  )

  return newApplicationCreatedEvent
=======
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
} from "../generated/Approver/Approver"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
>>>>>>> develop
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
<<<<<<< HEAD
=======

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
>>>>>>> develop

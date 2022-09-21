import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AccessSet,
  DecisionTaken,
  NewApplicationCreated,
  OwnershipTransferred
} from "../generated/Approver/Approver"

export function createAccessSetEvent(
  _user: Address,
  _enabled: boolean
): AccessSet {
  let accessSetEvent = changetype<AccessSet>(newMockEvent())

  accessSetEvent.parameters = new Array()

  accessSetEvent.parameters.push(
    new ethereum.EventParam("_user", ethereum.Value.fromAddress(_user))
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

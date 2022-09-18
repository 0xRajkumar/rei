import {
  DecisionTaken as DecisionTakenEvent,
  NewApplicationCreated as NewApplicationCreatedEvent,
  Approver as ApproverContract,
} from "../generated/Approver/Approver";
import { Application, WithStatus, User } from "../generated/schema";
import {
  ipfs,
  json,
  BigInt,
  ethereum,
  Bytes,
  bigInt,
} from "@graphprotocol/graph-ts";
export function handleNewApplicationCreated(
  event: NewApplicationCreatedEvent
): void {
  let application = new Application(event.params.applicationNumber.toString());
  // type Application @entity {
  //   id: ID!
  //   applicationNumber: BigInt!
  //   applicant: Bytes!
  //   name: String!
  //   description: String!
  //   imageURI: String!
  //   country: String!
  //   gpsCoordinates: String!
  //   surfaceAreaInMTRs: BigInt!
  //   applicationStatus: WithStatus!
  // }
  application.applicationNumber = event.params.applicationNumber;
  application.applicant = event.params.applicant.toHexString();
  application.name = event.params.name;
  application.description = event.params.description;
  application.imageURI = event.params.imageURI;
  application.country = event.params.country;
  application.gpsCoordinates = event.params.gpsCoordinates;
  application.surfaceAreaInMTRs = event.params.surfaceAreaInMTRs;
  application.applicationStatus = event.params.applicationStatus.toString();
  // let approverContract = ApproverContract.bind(event.address);
  // approverContract.getApllicationAt(event.params.applicationNumber);
  // entity.applicant = approverContract.getApllicationAt(
  //   event.params.applicationNumber
  // ).applicant;
  // entity.applicationStatus = approverContract
  //   .getApllicationAt(event.params.applicationNumber)
  //   .applicationStatus.toString();
  // entity.description = approverContract
  //   .getApllicationAt(event.params.applicationNumber)
  //   .description.toString();
  // entity.imageURI = approverContract
  //   .getApllicationAt(event.params.applicationNumber)
  //   .imageURI.toString();
  application.save();
  let withstatus = new WithStatus(event.params.applicationStatus.toString());
  withstatus.save();
  let user = new User(event.params.applicant.toHexString());
  user.save();
}

export function handleDecisionTaken(event: DecisionTakenEvent): void {
  let application = new Application(event.params.applicationNumber.toString());
  application.applicationStatus = event.params.decision.toString();
  application.save();
  let withstatus = new WithStatus(event.params.decision.toString());
  withstatus.save();
}

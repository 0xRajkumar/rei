import {
  DecisionTaken as DecisionTakenEvent,
  NewApplicationCreated as NewApplicationCreatedEvent,
  AccessSet as AccessSetEvent,
  Approver as ApproverContract,
} from "../generated/Approver/Approver";
import {
  Application,
  WithStatus,
  User,
  ApproverAccess,
} from "../generated/schema";
export function handleNewApplicationCreated(
  event: NewApplicationCreatedEvent
): void {
  let application = new Application(event.params.applicationNumber.toString());
  application.applicationNumber = event.params.applicationNumber;
  application.applicant = event.params.applicant.toHexString();
  application.name = event.params.name;
  application.description = event.params.description;
  application.imageURI = event.params.imageURI;
  application.country = event.params.country;
  application.gpsCoordinates = event.params.gpsCoordinates;
  application.surfaceAreaInMTRs = event.params.surfaceAreaInMTRs;
  application.applicationStatus = event.params.applicationStatus.toString();
  application.city = event.params.city;
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

export function handleAccessSet(event: AccessSetEvent): void {
  const userAccess = new ApproverAccess(event.params._user.toHexString());
  userAccess.bool = event.params._enabled;
  userAccess.user = event.params._user;
  userAccess.save();
}

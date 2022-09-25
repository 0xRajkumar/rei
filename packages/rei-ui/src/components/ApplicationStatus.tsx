import { chakra } from "@chakra-ui/react";
function ApplicationStatus({ status }: { status: number }) {
  if (status == 0) {
    return (
      <chakra.span color="yellow.500" fontSize="large">
        PENDING
      </chakra.span>
    );
  } else if (status == 1) {
    return (
      <chakra.span color="green.500" fontSize="large">
        ACCEPTED
      </chakra.span>
    );
  } else {
    return (
      <chakra.span color="red.500" fontSize="large">
        REJECTED
      </chakra.span>
    );
  }
}

export default ApplicationStatus;

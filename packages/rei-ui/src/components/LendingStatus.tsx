import React from "react";
import { chakra } from "@chakra-ui/react";
// enum LendStatus {
//   Created,
//   Funded,
//   Taken,
//   Repayed,
//   Liquidated,
// }

function LendingStatus({ status }: { status: number }) {
  if (status == 0) {
    return (
      <chakra.span color="yellow.500" fontSize="large">
        Created
      </chakra.span>
    );
  } else if (status == 1) {
    return (
      <chakra.span color="green.200" fontSize="large">
        Funded
      </chakra.span>
    );
  } else if (status == 2) {
    return (
      <chakra.span color="green.300" fontSize="large">
        Taken
      </chakra.span>
    );
  } else if (status == 3) {
    return (
      <chakra.span color="green.600" fontSize="large">
        Repayed
      </chakra.span>
    );
  } else {
    return (
      <chakra.span color="green.600" fontSize="large">
        Liquidated
      </chakra.span>
    );
  }
}
export default LendingStatus;

import { gql } from "@apollo/client";

export const GET_PENDING_APPLICATION = gql`
  query GetPendingApplication {
    withStatuses(where: { id: "0" }) {
      id
      applications {
        id
        applicationNumber
        applicant {
          id
        }
        name
        description
        imageURI
        country
        gpsCoordinates
        applicationStatus {
          id
        }
      }
    }
  }
`;

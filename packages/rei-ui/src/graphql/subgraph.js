import { gql } from "@apollo/client";
export const GET_PENDING_APPLICATIONS = gql`
  query GetPendingApplications {
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
export const GET_USER_APPLICATIONS = gql`
  query GetUserApplications($address: String!) {
    users(where: { id: $address }) {
      id
      applications {
        id
        applicationNumber
        name
        description
        imageURI
        country
        gpsCoordinates
        surfaceAreaInMTRs
        applicationStatus {
          id
        }
      }
    }
  }
`;

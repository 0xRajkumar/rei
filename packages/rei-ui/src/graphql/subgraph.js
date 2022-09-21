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
        surfaceAreaInMTRs
        city
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

export const GET_USER_TOKENS = gql`
  query GetUserTokens($address: String!) {
    tokenUsers(where: { id: $address }) {
      id
      tokens {
        id
        tokenID
        tokenURI
      }
    }
  }
`;
export const GET_USER_FRACTIONALISEDS = gql`
  query GetUserFractionaliseds($address: String!) {
    userFractionaliseds(where: { id: $address }) {
      id
      fractionaliseds {
        fractionalisedId
        fractionalisedNftAddress
        tokenId
        tokenURI
        NFTContractAddress
        fractionQuantity
      }
    }
  }
`;

export const GET_APPROVER_ACCESS = gql`
  query GetApproverAccess($address: String!) {
    approverAccesses(where: { id: $address }) {
      id
      user
      bool
    }
  }
`;

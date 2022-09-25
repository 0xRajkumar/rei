import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { useAccount, useContract, useSigner } from "wagmi";
import { GET_LENDED_FOR_LOANS, GET_USER_TOKENS } from "../graphql/subgraph";
import { REIContractAddress } from "../constants/addresses";
import REIAbi from "../constants/abis/REI.json";
import MarketItem from "../components/MarketItem";
import { Box, Heading } from "@chakra-ui/react";
function market() {
  const [fractionalisedNFTAddress, setfractionalisedNFTAddress] = useState("");
  const { data: signer } = useSigner();
  const REIContract = useContract({
    addressOrName: REIContractAddress,
    contractInterface: REIAbi,
    signerOrProvider: signer,
  });
  const {
    loading: loadinglendedloans,
    error: errorlendedloans,
    data: lendedloans,
    refetch: refetchLendedLoans,
  } = useQuery(GET_LENDED_FOR_LOANS);

  const lendedForLoans = loadinglendedloans
    ? null
    : lendedloans?.lendedForLoans;
  return (
    <div>
      <Box
        justifyContent="left"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        rowGap="4"
      >
        {loadinglendedloans ? (
          <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
            All pending applications
          </Heading>
        ) : (
          lendedForLoans?.map((data: any, index: any) => {
            return (
              <MarketItem
                data={data}
                key={index}
                refetch={refetchLendedLoans}
              />
            );
          })
        )}
      </Box>
    </div>
  );
}

export default market;

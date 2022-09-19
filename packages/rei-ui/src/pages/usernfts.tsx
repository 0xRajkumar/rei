import { useEffect, ChangeEvent, useState } from "react";
import ApproverAbi from "../constants/abis/Approver.json";
import {
  Center,
  Link,
  Heading,
  Text,
  Divider,
  VStack,
  Box,
  Image,
  Stack,
  Flex,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { GET_USER_TOKENS } from "../graphql/subgraph";
import { useAccount, useContract, useSigner } from "wagmi";
import { ApproverContractAddress } from "../constants/addresses";
const usernfts: NextPage = () => {
  const [userTokens, setUserTokens] = useState<any>(null);
  const { address: userAddress, isConnected, connector } = useAccount();
  const {
    loading,
    error,
    data: usersNfts,
    refetch,
  } = useQuery(GET_USER_TOKENS, {
    variables: {
      address: userAddress?.toLocaleLowerCase(),
    },
  });
  useEffect(() => {
    if (userAddress !== undefined) {
      refetch({ address: userAddress?.toLocaleLowerCase() });
    }
  }, [userAddress]);
  console.log(loading ? "" : usersNfts.tokenUsers[0].tokens);
  const tokens = loading ? null : usersNfts?.tokenUsers[0]?.tokens;

  async function fetchtokendetails() {
    const userTokenData = await Promise.all(
      tokens.map(async (data: any) => {
        const tokenData = await fetch(data.tokenURI);
        const token = await tokenData.json();
        return { ...token, tokenId: data.tokenID };
      })
    );
    console.log(
      "🚀 ~ file: usernfts.tsx ~ line 56 ~ fetchtokendetails ~ userTokenData",
      userTokenData
    );
    setUserTokens(userTokenData);
  }
  useEffect(() => {
    if (tokens) {
      fetchtokendetails();
    }
  }, [tokens]);
  return (
    <Box>
      <Box>
        <Heading>Your Created Applications</Heading>
        <Stack flexDirection="row" flexWrap="wrap" gap="2">
          {loading ? (
            <Heading textShadow="2px 2px #0987A0">Loading Data</Heading>
          ) : (
            userTokens?.map((data: any, index: number) => {
              return (
                <Center py={12} key={index}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={"white"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${data.image})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={data.image}
                        alt="Nothing here"
                      />
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                      >
                        tokenId = {data.tokenId}
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {data.description}
                      </Heading>
                      <Stack direction={"column"} align={"center"}>
                        <Text color={"gray.600"}>
                          Country = {data.attributes.Country}
                        </Text>
                        <Text color={"gray.600"}>
                          {" "}
                          Country = {data.attributes.City}
                        </Text>
                        <Text color={"gray.600"}>
                          Country = {data.attributes.GPSCoordinates}
                        </Text>
                        <Text color={"gray.600"}>
                          Country = {data.attributes.SurfaceArea}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>
              );
            })
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default usernfts;

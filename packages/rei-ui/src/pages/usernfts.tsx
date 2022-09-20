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
import { GET_USER_TOKENS, GET_USER_FRACTIONALISEDS } from "../graphql/subgraph";
import { useAccount, useContract, useSigner } from "wagmi";
import { ApproverContractAddress } from "../constants/addresses";
const usernfts: NextPage = () => {
  const [userTokens, setUserTokens] = useState<any>(null);
  const [userFractionlisedsData, setUserFractionlisedsData] =
    useState<any>(null);
  const { address: userAddress, isConnected, connector } = useAccount();
  const {
    loading: loadingUserNfts,
    error: errorUserNfts,
    data: userNfts,
    refetch: refetchUserNfts,
  } = useQuery(GET_USER_TOKENS, {
    variables: {
      address: userAddress?.toLocaleLowerCase(),
    },
  });
  const {
    loading: loadingUserFractionalised,
    error: errorFractionaliseds,
    data: userFractionaliseds,
    refetch: refetchUserFractionalised,
  } = useQuery(GET_USER_FRACTIONALISEDS, {
    variables: {
      address: userAddress?.toLocaleLowerCase(),
    },
  });
  useEffect(() => {
    if (userAddress !== undefined) {
      refetchUserNfts({ address: userAddress?.toLocaleLowerCase() });
      refetchUserFractionalised({ address: userAddress?.toLocaleLowerCase() });
    }
  }, [userAddress]);
  console.log(
    loadingUserFractionalised
      ? ""
      : userFractionaliseds?.userFractionaliseds[0]?.fractionaliseds
  );
  const tokens = loadingUserNfts ? null : userNfts?.tokenUsers[0]?.tokens;
  const userFractionliseds = loadingUserFractionalised
    ? null
    : userFractionaliseds?.userFractionaliseds[0]?.fractionaliseds;

  async function fetchtokendetails(dataArr: any) {
    const userData = await Promise.all(
      dataArr.map(async (data: any) => {
        const tokenData = await fetch(data.tokenURI);
        const token = await tokenData.json();
        return { ...token, ...data };
      })
    );
    return userData;
  }
  useEffect(() => {
    if (tokens) {
      fetchtokendetails(tokens)
        .then((userData) => {
          setUserTokens(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tokens]);
  useEffect(() => {
    if (userFractionliseds) {
      fetchtokendetails(userFractionliseds)
        .then((userData) => {
          setUserFractionlisedsData(userData);
          console.log(
            "🚀 ~ file: usernfts.tsx ~ line 94 ~ .then ~ userData",
            userData
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userFractionliseds]);
  return (
    <Box>
      <Box>
        <Heading>Your Created Applications</Heading>
        <Stack flexDirection="row" flexWrap="wrap" gap="2">
          {loadingUserNfts ? (
            <Heading textShadow="2px 2px #0987A0">loadingUserNfts Data</Heading>
          ) : (
            userTokens?.map((data: any, index: number) => {
              const {
                image,
                tokenId,
                description,
                attributes: { SurfaceArea, GPSCoordinates, City, Country },
              } = data;
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
                        backgroundImage: `url(${image})`,
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
                        tokenId = {tokenId}
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {description}
                      </Heading>
                      <Stack direction={"column"} align={"center"}>
                        <Text color={"gray.600"}>Country = {Country}</Text>
                        <Text color={"gray.600"}> Country = {City}</Text>
                        <Text color={"gray.600"}>
                          Country = {GPSCoordinates}
                        </Text>
                        <Text color={"gray.600"}>Country = {SurfaceArea}</Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>
              );
            })
          )}
        </Stack>
      </Box>
      <Box>
        <Heading>Your Frationalised NFTs</Heading>
        <Stack flexDirection="row" flexWrap="wrap" gap="2">
          {loadingUserFractionalised ? (
            <Heading textShadow="2px 2px #0987A0">
              loadingUserFractionalised Data
            </Heading>
          ) : (
            userFractionlisedsData?.map((data: any, index: number) => {
              const {
                image,
                tokenId,
                description,
                attributes: { SurfaceArea, GPSCoordinates, City, Country },
                fractionalisedNftAddress,
                fractionalisedId,
                fractionQuantity,
                NFTContractAddress,
              } = data;
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
                        backgroundImage: `url(${image})`,
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
                        tokenId = {tokenId}
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {description}
                      </Heading>
                      <Stack direction={"column"} align={"center"}>
                        <Text color={"gray.600"}>Country = {Country}</Text>
                        <Text color={"gray.600"}> Country = {City}</Text>
                        <Text color={"gray.600"}>
                          Country = {GPSCoordinates}
                        </Text>
                        <Text color={"gray.600"}>Country = {SurfaceArea}</Text>
                        <Text color={"gray.600"}>
                          fractionalisedNftAddress = {fractionalisedNftAddress}
                        </Text>
                        <Text color={"gray.600"}>
                          fractionalisedId = {fractionalisedId}
                        </Text>
                        <Text color={"gray.600"}>
                          fractionQuantity = {fractionQuantity}
                        </Text>
                        <Text color={"gray.600"}>
                          NFTContractAddress = {NFTContractAddress}
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

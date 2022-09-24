import {
  useEffect,
  ChangeEvent,
  useState,
  useRef,
  HtmlHTMLAttributes,
} from "react";
import FractionaliserAbi from "../constants/abis/Fractionaliser.json";
import REIAbi from "../constants/abis/REI.json";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Radio,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import {
  GET_USER_TOKENS,
  GET_USER_FRACTIONALISEDS,
  GET_LENDED_FOR_LOANS,
  GET_INVESTED_LENDS,
} from "../graphql/subgraph";
import { useAccount, useContract, useSigner } from "wagmi";
import {
  ApproverContractAddress,
  FractionaliserContractAddress,
  REIContractAddress,
} from "../constants/addresses";
import FractionalNFT from "../components/FractionalNFT";
import LendedItem from "../components/LendedItem";
import InvestedInItem from "../components/InvestedInItem";
const usernfts: NextPage = () => {
  const [isFractionaliserApproved, setisFractionaliserApproved] =
    useState(false);
  const [fractionForm, setfractionForm] = useState({
    name: "",
    symbol: "",
    amount: 0,
  });
  const [userTokens, setUserTokens] = useState<any>(null);
  const [userFractionlisedsData, setUserFractionlisedsData] =
    useState<any>(null);
  const { address: userAddress, isConnected, connector } = useAccount();
  const { data: signer } = useSigner();

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
  const {
    loading: loadingUserLended,
    error: errorUserLended,
    data: userLended,
    refetch: refetchUserLended,
  } = useQuery(GET_LENDED_FOR_LOANS, {
    variables: {
      address: userAddress?.toLocaleLowerCase(),
    },
  });
  const {
    loading: loadingUserInvestedLends,
    error: errorUserInvestedLends,
    data: UserInvestedLends,
    refetch: refetchUserInvestedLends,
  } = useQuery(GET_INVESTED_LENDS, {
    variables: {
      id: userAddress?.toLocaleLowerCase(),
    },
  });
  const investedIn = loadingUserInvestedLends
    ? null
    : UserInvestedLends?.invester?.lendedforlaons;
  console.log(
    loadingUserInvestedLends
      ? "None"
      : UserInvestedLends?.invester?.lendedforlaons
  );
  useEffect(() => {
    if (userAddress !== undefined) {
      refetchUserNfts({ address: userAddress?.toLocaleLowerCase() });
      refetchUserFractionalised({ address: userAddress?.toLocaleLowerCase() });
      refetchUserLended({ address: userAddress?.toLocaleLowerCase() });
      refetchUserInvestedLends({ id: userAddress?.toLocaleLowerCase() });
    }
  }, [userAddress]);
  const tokens = loadingUserNfts ? null : userNfts?.tokenUsers[0]?.tokens;
  const userFractionliseds = loadingUserFractionalised
    ? null
    : userFractionaliseds?.userFractionaliseds[0]?.fractionaliseds;
  const userLendeds = loadingUserLended ? null : userLended?.lendedForLoans;

  const FractionaliserContract = useContract({
    addressOrName: FractionaliserContractAddress,
    contractInterface: FractionaliserAbi,
    signerOrProvider: signer,
  });
  const REIContract = useContract({
    addressOrName: REIContractAddress,
    contractInterface: REIAbi,
    signerOrProvider: signer,
  });
  const {
    isOpen: isFractionOpen,
    onOpen: onFractionOpen,
    onClose: onFractionClose,
  } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
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
  function handleFractionForm(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;
    setfractionForm((preData) => {
      return { ...preData, [name]: value };
    });
  }

  async function handleFraction(tokenId: Number) {
    const { name, symbol, amount } = fractionForm;
    if (!name || !symbol || !amount) return;
    await FractionaliserContract.fractionalise(name, symbol, tokenId, amount);
  }
  async function isFractionaliserContractApproved() {
    try {
      console.log(userAddress, FractionaliserContractAddress);
      const bool = await REIContract.isApprovedForAll(
        userAddress,
        FractionaliserContractAddress
      );
      setisFractionaliserApproved(bool);
    } catch (err) {
      console.log(err, "Here is Error");
    }
  }
  async function approveFractionaliserContract() {
    try {
      const tx = await REIContract.setApprovalForAll(
        FractionaliserContractAddress,
        true
      );
      await tx.wait();
      isFractionaliserContractApproved();
    } catch (err) {
      console.log(err);
    }
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userFractionliseds]);
  useEffect(() => {
    isFractionaliserContractApproved();
  }, [userAddress, REIContract]);

  return (
    <Box>
      <Box>
        <Heading>Your Created Applications</Heading>
        <Stack flexDirection="row" flexWrap="wrap" gap="2">
          {loadingUserNfts ? (
            <Heading textShadow="2px 2px #0987A0">
              loadingUserNfts Data {userAddress}
            </Heading>
          ) : (
            userTokens?.map((data: any, index: number) => {
              const {
                image,
                tokenID,
                description,
                attributes: { SurfaceArea, GPSCoordinates, City, Country },
              } = data;
              return (
                <Box>
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
                          tokenId = {tokenID}
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
                          <Text color={"gray.600"}>
                            Country = {SurfaceArea}
                          </Text>
                        </Stack>
                        {isFractionaliserApproved ? (
                          <Button onClick={onFractionOpen}>DO Fractions</Button>
                        ) : (
                          <Button onClick={approveFractionaliserContract}>
                            First Approve
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </Center>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isFractionOpen}
                    onClose={onFractionClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Do approve</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl isRequired>
                          <FormLabel>Name</FormLabel>
                          <Input
                            type="string"
                            name="name"
                            onChange={handleFractionForm}
                            placeholder="Name"
                          />
                          <FormLabel>Symbol</FormLabel>
                          <Input
                            type="text"
                            onChange={handleFractionForm}
                            name="symbol"
                            placeholder="Symbol"
                          />
                          <FormLabel>Amount</FormLabel>
                          <Input
                            type="number"
                            onChange={handleFractionForm}
                            name="amount"
                            placeholder="Amount"
                          />
                        </FormControl>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          w={"full"}
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            handleFraction(tokenID);
                          }}
                        >
                          Save
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })
          )}
        </Stack>
      </Box>
      <Box>
        <Heading>Your Frationalised NFTs</Heading>
        <Stack flexDirection="row" flexWrap="wrap" gap="2">
          {loadingUserFractionalised ? (
            <Heading textShadow="2px 2px #0987A0">DID Fractions</Heading>
          ) : (
            userFractionlisedsData?.map((data: any, index: number) => {
              return <FractionalNFT data={data} key={index} />;
            })
          )}
        </Stack>
      </Box>
      <Box>
        <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
          Lended For Loans
        </Heading>
        {loadingUserLended ? (
          <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
            loadingUserLended
          </Heading>
        ) : (
          <Flex flexDirection="row" flexWrap="wrap" gap="3">
            {userLendeds?.map((data: any, index: any) => {
              return <LendedItem data={data} key={index} />;
            })}
          </Flex>
        )}
      </Box>
      <Box>
        <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
          Invested IN
        </Heading>
        {loadingUserInvestedLends ? (
          <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
            loadingUserInvestedLends
          </Heading>
        ) : (
          <Flex flexDirection="row" flexWrap="wrap" gap="3">
            {investedIn?.map((data: any, index: any) => {
              return (
                <InvestedInItem
                  data={data.lendedforloan}
                  amountInvested={data.amount}
                  key={index}
                />
              );
            })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default usernfts;

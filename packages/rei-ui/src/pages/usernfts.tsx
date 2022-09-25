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
  chakra,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import {
  GET_USER_TOKENS,
  GET_USER_FRACTIONALISEDS,
  GET_LENDED_FOR_LOANS,
  GET_INVESTED_LENDS,
  GET_LENDED_BY_USER,
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
import { GoPrimitiveDot } from "react-icons/go";
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
  } = useQuery(GET_LENDED_BY_USER, {
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
    try {
      const userData = await Promise.all(
        dataArr.map(async (data: any) => {
          const tokenData = await fetch(data.tokenURI);
          const token = await tokenData.json();
          console.log(token, "NANAN");
          return { ...token, ...data };
        })
      );
      return userData;
    } catch (err) {
      console.log(
        "🚀 ~ file: usernfts.tsx ~ line 157 ~ fetchtokendetails ~ err",
        err
      );
      toast({ title: "Error: see in console", status: "error" });
    }
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
  const toast = useToast();
  async function handleFraction(tokenId: Number) {
    try {
      const { name, symbol, amount } = fractionForm;
      if (!name || !symbol || !amount) {
        toast({ title: "Put all value", status: "warning" });
        return;
      }
      const tx = await FractionaliserContract.fractionalise(
        name,
        symbol,
        tokenId,
        amount
      );
      await tx.wait();
      refetchUserNfts({ address: userAddress?.toLocaleLowerCase() });
      refetchUserFractionalised({ address: userAddress?.toLocaleLowerCase() });
      onFractionClose();
      setfractionForm({
        name: "",
        symbol: "",
        amount: 0,
      });
    } catch (err) {
      toast({ title: "Error: See in console", status: "error" });
      console.log(
        "🚀 ~ file: usernfts.tsx ~ line 183 ~ handleFraction ~ err",
        err
      );
      onFractionClose();
      setfractionForm({
        name: "",
        symbol: "",
        amount: 0,
      });
    }
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
      toast({ title: "Error: see in console", status: "error" });
      console.log(err);
    }
  }

  useEffect(() => {
    if (tokens) {
      fetchtokendetails(tokens)
        .then((userData) => {
          console.log(
            "🚀 ~ file: usernfts.tsx ~ line 213 ~ .then ~ userData",
            userData
          );
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
  function refetchAfterApplyingFOrLoan() {
    refetchUserFractionalised({ address: userAddress?.toLocaleLowerCase() });
    refetchUserLended({ address: userAddress?.toLocaleLowerCase() });
  }
  console.log(userTokens, "OKKKK");
  return (
    <Box>
      <Box>
        <Heading>Your Created Applications</Heading>
        <Box
          justifyContent="left"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          rowGap="4"
        >
          {loadingUserNfts ? (
            <Heading textShadow="2px 2px #0987A0">
              loadingUserNfts Data {userAddress}
            </Heading>
          ) : (
            userTokens?.map((data: any, index: number) => {
              const {
                image,
                tokenID,
                name,
                description,
                attributes: { SurfaceArea, GPSCoordinates, City, Country },
              } = data;
              return (
                <Box
                  mx="2"
                  rounded="lg"
                  flex="1"
                  shadow="md"
                  bg="white"
                  maxW="2xl"
                  mt="0"
                >
                  <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={image}
                    alt="Article"
                  />
                  <Box p={6}>
                    <Box>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Flex alignItems="center">
                          <Flex alignItems="center">
                            <Link fontWeight="bold" color="gray.700">
                              Token Id
                            </Link>
                          </Flex>
                          <chakra.span mx={1} fontSize="sm" color="gray.600">
                            {tokenID}
                          </chakra.span>
                        </Flex>
                      </Box>
                      <chakra.span
                        display="block"
                        color="gray.800"
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                      >
                        {name}
                      </chakra.span>
                      <chakra.p mt={2} fontSize="sm" color="gray.600">
                        {description}
                      </chakra.p>
                    </Box>
                    <Box mt={4}>
                      <Flex alignItems="center">
                        <GoPrimitiveDot height="8" />
                        <Flex alignItems="center" mx="2">
                          <Link fontWeight="bold" color="gray.700">
                            Country
                          </Link>
                        </Flex>
                        <chakra.span mx={1} fontSize="sm" color="gray.600">
                          {Country}
                        </chakra.span>
                      </Flex>
                      <Flex alignItems="center">
                        <GoPrimitiveDot height="8" />
                        <Flex alignItems="center" mx="2">
                          <Link fontWeight="bold" color="gray.700">
                            City
                          </Link>
                        </Flex>
                        <chakra.span mx={1} fontSize="sm" color="gray.600">
                          {City}
                        </chakra.span>
                      </Flex>
                      <Flex alignItems="center">
                        <GoPrimitiveDot height="8" />
                        <Flex alignItems="center" mx="2">
                          <Link fontWeight="bold" color="gray.700">
                            Location
                          </Link>
                        </Flex>
                        <chakra.span mx={1} fontSize="sm" color="gray.600">
                          {GPSCoordinates}
                        </chakra.span>
                      </Flex>
                      <Flex alignItems="center">
                        <GoPrimitiveDot height="8" />
                        <Flex alignItems="center" mx="2">
                          <Link fontWeight="bold" color="gray.700">
                            Surface area
                          </Link>
                        </Flex>
                        <chakra.span mx={1} fontSize="sm" color="gray.600">
                          {SurfaceArea}
                        </chakra.span>
                      </Flex>
                    </Box>
                    <Box py="4">
                      {isFractionaliserApproved ? (
                        <Button
                          colorScheme="linkedin"
                          w="full"
                          onClick={onFractionOpen}
                        >
                          Do fractions
                        </Button>
                      ) : (
                        <Button
                          colorScheme="linkedin"
                          w="full"
                          onClick={approveFractionaliserContract}
                        >
                          First Approve
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isFractionOpen}
                    onClose={onFractionClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Token ID {tokenID}</ModalHeader>
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
                          colorScheme="linkedin"
                          mr={3}
                          onClick={() => {
                            handleFraction(tokenID);
                          }}
                        >
                          Do fractions
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })
          )}
        </Box>
      </Box>
      <Box>
        <Heading>Your Frationalised NFTs</Heading>
        <Box
          justifyContent="left"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          rowGap="4"
        >
          {loadingUserFractionalised ? (
            <Heading textShadow="2px 2px #0987A0">DID Fractions</Heading>
          ) : (
            userFractionlisedsData?.map((data: any, index: number) => {
              return (
                <FractionalNFT
                  refetch={refetchAfterApplyingFOrLoan}
                  data={data}
                  key={index}
                />
              );
            })
          )}
        </Box>
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
          <Box
            justifyContent="left"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            rowGap="4"
          >
            {userLendeds?.map((data: any, index: any) => {
              return (
                <LendedItem
                  refetch={() => {
                    refetchUserLended({
                      address: userAddress?.toLocaleLowerCase(),
                    });
                  }}
                  data={data}
                  key={index}
                />
              );
            })}
          </Box>
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
          <Box
            justifyContent="left"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            rowGap="4"
          >
            {investedIn?.map((data: any, index: any) => {
              return (
                <InvestedInItem
                  refetch={() => {
                    refetchUserInvestedLends({
                      id: userAddress?.toLocaleLowerCase(),
                    });
                  }}
                  data={data.lendedforloan}
                  amountInvested={data.amount}
                  key={index}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default usernfts;

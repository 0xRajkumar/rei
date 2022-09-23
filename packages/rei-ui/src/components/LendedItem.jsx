import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import ERC20Abi from "../constants/abis/ERC20.json";
  import React, { useState, useEffect } from "react";
  import FractionalisedNFTAbi from "../constants/abis/FraactionalisedNFT.json";
  import FractionaliserAbi from "../constants/abis/Fractionaliser.json";
  import REIMarketAbi from "../constants/abis/REIMarket.json";
  import { useAccount, useContract, useSigner } from "wagmi";
  import {
    FractionaliserContractAddress,
    REIContractAddress,
    REIMarketContractAddress,
    USDTAddress,
  } from "../constants/addresses";
  import { ethers } from "ethers";
  import { GET_USER_FRACTIONALISEDS_WITH_FRACTIONALISEDID } from "../graphql/subgraph";
  import { useQuery } from "@apollo/client";
  function LendedItem({ data, key }) {
    const [investingInNumberOfFraction, setinvestingInNumberOfFraction] =
      useState(0);
    const { data: signer } = useSigner();
    const USDTContract = useContract({
      addressOrName: USDTAddress,
      contractInterface: ERC20Abi,
      signerOrProvider: signer,
    });
    const REIMarketContract = useContract({
      addressOrName: REIMarketContractAddress,
      contractInterface: REIMarketAbi,
      signerOrProvider: signer,
    });
    const { address: userAddress } = useAccount();
    const [isReiContractApproved, setisReiContractApproved] = useState(false);
    const {
      isOpen: isInvestOpen,
      onOpen: onInvestOpen,
      onClose: onInvestClose,
    } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const {
      status,
      numberOfFractionsInvested,
      numberOfFractions,
      lendingNumber,
      fractionalisedNftAddress,
      fractionalisedId,
      Loanee,
    } = data;
    const [tokenDetail, settokenDetail] = useState(null);
    const {
      loading: loadingfractionalised,
      error: errorfractionalised,
      data: fractionalised,
      refetch: refetchfractionalised,
    } = useQuery(GET_USER_FRACTIONALISEDS_WITH_FRACTIONALISEDID, {
      variables: {
        id: data.fractionalisedId,
      },
    });
  
    async function fetchtokendetails(data) {
      const tokenData = await fetch(data.tokenURI);
      const tokenDatainJson = await tokenData.json();
      settokenDetail({ ...tokenDatainJson, tokenId: data.tokenId });
    }
  
    const fractionalisedNFT = loadingfractionalised
      ? null
      : fractionalised.fractionaliseds[0];
    useEffect(() => {
      if (fractionalisedNFT) {
        fetchtokendetails(fractionalisedNFT);
      }
    }, [fractionalisedNFT]);
    return (
      <>
        {tokenDetail && (
          <Center py={12} key={key}>
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
                  backgroundImage: `url(${tokenDetail?.image})`,
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
                  src={tokenDetail?.image}
                  alt="Nothing here"
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  tokenId = {tokenDetail?.tokenId}
                </Text>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {tokenDetail?.description}
                </Heading>
                <Stack direction={"column"} align={"center"}>
                  <Text color={"gray.600"}>
                    Country = {tokenDetail?.attributes?.Country}
                  </Text>
                  <Text color={"gray.600"}>
                    {" "}
                    Country = {tokenDetail?.attributes?.City}
                  </Text>
                  <Text color={"gray.600"}>
                    Country = {tokenDetail?.attributes?.GPSCoordinates}
                  </Text>
                  <Text color={"gray.600"}>
                    Country = {tokenDetail?.attributes?.SurfaceArea}
                  </Text>
                  <Text color={"gray.600"}>Loanee = {Loanee}</Text>
                  <Text color={"gray.600"}>
                    fractionalisedId = {fractionalisedId}
                  </Text>
                  <Text color={"gray.600"}>
                    fractionalisedNftAddress = {fractionalisedNftAddress}
                  </Text>
                  <Text color={"gray.600"}>lendingNumber = {lendingNumber}</Text>
                  <Text color={"gray.600"}>
                    numberOfFractions = {numberOfFractions}
                  </Text>
                  <Text color={"gray.600"}>
                    numberOfFractionsInvested = {numberOfFractionsInvested}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        )}
      </>
    );
  }
  
  export default LendedItem;
  
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
  chakra,
  Link,
  Flex,
  useToast,
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
import { GoPrimitiveDot } from "react-icons/go";
import ShowINSName from "./ShowINSName";
function MarketItem({ data, key, refetch }: any) {
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
  const [isReiContractApproved, setisReiMarketContractApproved] =
    useState(false);
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
    loanAmountPerFraction,
    interestPerFractionInPercentage,
  } = data;
  const [tokenDetail, settokenDetail] = useState<any>(null);
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
  const toast = useToast();
  async function fetchtokendetails(data: any) {
    try {
      const tokenData = await fetch(data.tokenURI);
      const tokenDatainJson = await tokenData.json();
      settokenDetail({ ...tokenDatainJson, tokenId: data.tokenId });
    } catch (error) {
      console.log(
        "🚀 ~ file: MarketItem.tsx ~ line 94 ~ fetchtokendetails ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
    }
  }

  async function handleREIApprove() {
    try {
      const approvetx = await USDTContract.approve(
        REIMarketContractAddress,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      await approvetx.wait();
      setisReiMarketContractApproved(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: MarketItem.tsx ~ line 109 ~ handleREIApprove ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
    }
  }

  const fractionalisedNFT = loadingfractionalised
    ? null
    : fractionalised.fractionaliseds[0];
  async function isREIApprovesFORUSDT() {
    try {
      const amount = await USDTContract.allowance(
        userAddress,
        REIMarketContractAddress
      );
      if (
        amount.toString() ==
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      ) {
        setisReiMarketContractApproved(true);
      }
    } catch (error) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: MarketItem.tsx ~ line 129 ~ isREIApprovesFORUSDT ~ error",
        error
      );
    }
  }
  useEffect(() => {
    if (fractionalisedNFT) {
      fetchtokendetails(fractionalisedNFT);
    }
  }, [fractionalisedNFT]);
  useEffect(() => {
    isREIApprovesFORUSDT();
  }, [userAddress]);
  async function handleInvest() {
    try {
      if (investingInNumberOfFraction <= 0) {
        toast({ title: "Fill all value", status: "warning" });
        return;
      }
      const investtx = await REIMarketContract.invest(
        lendingNumber,
        investingInNumberOfFraction
      );
      await investtx.wait();
      refetch({});
      setinvestingInNumberOfFraction(0);
      onInvestClose();
    } catch (error) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: MarketItem.tsx ~ line 157 ~ handleInvest ~ error",
        error
      );
    }
  }
  const loanPerFractionInEther = ethers.utils.formatEther(
    loanAmountPerFraction ?? ""
  );
  return (
    <>
      {tokenDetail && (
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
            src={tokenDetail?.image}
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
                    {tokenDetail?.tokenId}
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
                {tokenDetail?.name}
              </chakra.span>
              <chakra.p mt={2} fontSize="sm" color="gray.600">
                {tokenDetail?.description}
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
                  {tokenDetail?.attributes?.Country}
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
                  {tokenDetail?.attributes?.City}
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
                  {tokenDetail?.attributes?.GPSCoordinates}
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
                  {tokenDetail?.attributes?.SurfaceArea}
                </chakra.span>
              </Flex>{" "}
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Loanee
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  <ShowINSName userAddress={Loanee} />
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Amount per fraction
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {loanPerFractionInEther} MATIC
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Interest in percentage
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {interestPerFractionInPercentage}%
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Lending number
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {lendingNumber}
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Fractionlised ID
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {fractionalisedId}
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Number of fraction
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {numberOfFractions}
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Fractionalised nft Address
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  <ShowINSName userAddress={fractionalisedNftAddress} />
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Number of fractions invested
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {numberOfFractionsInvested}
                </chakra.span>
              </Flex>
            </Box>
            <Box py="4">
              <Button colorScheme="linkedin" w="full" onClick={onInvestOpen}>
                Invest
              </Button>
            </Box>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isInvestOpen}
              onClose={onInvestClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Invest</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <NumberInput
                    onChange={(e) => {
                      console.log(e.valueOf());
                      setinvestingInNumberOfFraction(Number(e.valueOf()));
                    }}
                    defaultValue={0}
                    min={0}
                    max={numberOfFractions - numberOfFractionsInvested}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </ModalBody>
                <ModalFooter>
                  {isReiContractApproved ? (
                    <Button
                      onClick={handleInvest}
                      colorScheme="linkedin"
                      w="full"
                      mr={3}
                    >
                      Do invest
                    </Button>
                  ) : (
                    <Button
                      onClick={handleREIApprove}
                      colorScheme="linkedin"
                      w="full"
                      mr={3}
                    >
                      First Approve
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      )}
    </>
  );
}

export default MarketItem;

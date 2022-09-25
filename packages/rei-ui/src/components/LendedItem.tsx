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
  Flex,
  Link,
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
import LendingStatus from "./LendingStatus";
function LendedItem({ refetch, data, key }: any) {
  const [isApproved, setisApproved] = useState(false);
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
    loanAmountPerFraction,
    interestPerFractionInPercentage,
  } = data;
  console.log(
    "🚀 ~ file: LendedItem.tsx ~ line 74 ~ LendedItem ~ status",
    status
  );
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
    } catch (err) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 98 ~ fetchtokendetails ~ err",
        err
      );
    }
  }

  const fractionalisedNFT = loadingfractionalised
    ? null
    : fractionalised.fractionaliseds[0];
  useEffect(() => {
    if (fractionalisedNFT) {
      fetchtokendetails(fractionalisedNFT);
    }
  }, [fractionalisedNFT]);
  async function handleREIApprove() {
    try {
      const approvetx = await USDTContract.approve(
        REIMarketContractAddress,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      await approvetx.wait();
      setisApproved(true);
    } catch (err) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 121 ~ handleREIApprove ~ err",
        err
      );
    }
  }
  const loanPerFractionInEther = ethers.utils.formatEther(
    loanAmountPerFraction ?? ""
  );
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
        setisApproved(true);
      }
    } catch (err) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 138 ~ isREIApprovesFORUSDT ~ err",
        err
      );
    }
  }
  async function handlerepay() {
    try {
      const repaytx = await REIMarketContract.repay(lendingNumber);
      await repaytx.wait();
      refetch();
    } catch (err) {
      toast({ title: "Error: seein console", status: "error" });
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 125 ~ handlerepay ~ err",
        err
      );
    }
  }
  async function withdrawLoan() {
    try {
      const wltx = await REIMarketContract.withdrawLoan(lendingNumber);
      await wltx.wait();
      refetch({});
    } catch (err) {
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 163 ~ withdrawLoan ~ err",
        err
      );
      toast({ title: "Error: see in Console", status: "error" });
    }
  }
  useEffect(() => {
    isREIApprovesFORUSDT();
  }, [userAddress]);
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
              </Flex>
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
                    Fractionalised Id
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
                    Fractionalised Nft Address
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
                    Number of fraction invested
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {numberOfFractionsInvested}
                </chakra.span>
              </Flex>
              <Flex alignItems="center">
                <GoPrimitiveDot height="8" />
                <Flex alignItems="center" mx="2">
                  <Link fontWeight="bold" color="gray.700">
                    Status
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  <LendingStatus status={status} />
                </chakra.span>
              </Flex>
            </Box>
            <Box>
              {status === 2 && (
                <>
                  {isApproved ? (
                    <Button
                      w="full"
                      colorScheme="linkedin"
                      onClick={handlerepay}
                    >
                      Get Back NFT
                    </Button>
                  ) : (
                    <Button
                      w="full"
                      colorScheme="linkedin"
                      onClick={handleREIApprove}
                    >
                      Approve
                    </Button>
                  )}
                </>
              )}
              {status === 1 && (
                <Button w="full" colorScheme="linkedin" onClick={withdrawLoan}>
                  Withdraw Loan
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default LendedItem;

import {
  Box,
  Button,
  Image,
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
function InvestedInItem({ refetch, data, amountInvested, key }: any) {
  const [investingInNumberOfFraction, setinvestingInNumberOfFraction] =
    useState(0);
  const { data: signer } = useSigner();
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
  const FractionalisedNFTContract = useContract({
    addressOrName: fractionalisedNftAddress,
    contractInterface: FractionalisedNFTAbi,
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
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: InvestedInItem.tsx ~ line 99 ~ fetchtokendetails ~ error",
        error
      );
    }
  }

  async function handleREIApprove() {
    try {
      const approvetx = await FractionalisedNFTContract.approve(
        REIMarketContractAddress,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      await approvetx.wait();
      setisReiContractApproved(true);
    } catch (error) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: InvestedInItem.tsx ~ line 114 ~ handleREIApprove ~ error",
        error
      );
    }
  }

  async function isREIApprovesFORUSDT() {
    try {
      const amount = await FractionalisedNFTContract.allowance(
        userAddress,
        REIMarketContractAddress
      );
      if (
        amount.toString() ==
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      ) {
        setisReiContractApproved(true);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: InvestedInItem.tsx ~ line 131 ~ isREIApprovesFORUSDT ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
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
  useEffect(() => {
    isREIApprovesFORUSDT();
  }, [userAddress]);
  async function handleWithdrawInvestment() {
    try {
      const tx = await REIMarketContract.withdrawBeforeFunded(
        lendingNumber,
        amountInvested
      );
      await tx.wait();
      refetch();
    } catch (error) {
      console.log(
        "🚀 ~ file: InvestedInItem.tsx ~ line 162 ~ handleWithdrawInvestment ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
    }
  }
  async function handleGetBackInvestmentWithInterest() {
    try {
      const tx = await REIMarketContract.getBackInvestmentWithInterest(
        lendingNumber
      );
      await tx.wait();
      refetch({});
    } catch (error) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: InvestedInItem.tsx ~ line 176 ~ handleGetBackInvestmentWithInterest ~ error",
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
                  {loanPerFractionInEther} Matic
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
                  {interestPerFractionInPercentage}
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
                    Amount Invested by you
                  </Link>
                </Flex>
                <chakra.span mx={1} fontSize="sm" color="gray.600">
                  {amountInvested}
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
                  {status}
                </chakra.span>
              </Flex>
            </Box>
            <Box>
              {status === 0 && amountInvested > 0 && (
                <>
                  {isReiContractApproved ? (
                    <Button
                      w="full"
                      colorScheme="linkedin"
                      onClick={handleWithdrawInvestment}
                    >
                      handleWithdrawInvestment
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
              {(status === 3 || status === 4) && amountInvested > 0 && (
                <>
                  {isReiContractApproved ? (
                    <Button
                      w="full"
                      colorScheme="linkedin"
                      onClick={handleGetBackInvestmentWithInterest}
                    >
                      handleGetBackInvestmentWithInterest
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
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default InvestedInItem;

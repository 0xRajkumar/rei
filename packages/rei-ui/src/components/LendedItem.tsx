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
function LendedItem({ data, key }: any) {
  const [isApproved, setisApproved] = useState(false);
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

  async function fetchtokendetails(data: any) {
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
  async function handleREIApprove() {
    const approvetx = await USDTContract.approve(
      REIMarketContractAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );
    await approvetx.wait();
    setisApproved(true);
  }

  async function isREIApprovesFORUSDT() {
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
  }
  async function handlerepay() {
    try {
      const repaytx = await REIMarketContract.repay(lendingNumber);
      await repaytx.wait();
    } catch (err) {
      console.log(
        "🚀 ~ file: LendedItem.tsx ~ line 125 ~ handlerepay ~ err",
        err
      );
    }
  }
  async function withdrawLoan() {
    const wltx = await REIMarketContract.withdrawLoan(lendingNumber);
    await wltx.wait();
  }
  useEffect(() => {
    isREIApprovesFORUSDT();
  }, [userAddress]);
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
                tokenId = {tokenDetail?.tokenId} <br />
                status = {status}
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
              {status === 2 && (
                <>
                  {isApproved ? (
                    <Button onClick={handlerepay}>Get Back NFT</Button>
                  ) : (
                    <Button onClick={handleREIApprove}>Approve</Button>
                  )}
                </>
              )}
              {status === 1 && (
                <Button onClick={withdrawLoan}>Withdraw Loan</Button>
              )}
            </Stack>
          </Box>
        </Center>
      )}
    </>
  );
}

export default LendedItem;

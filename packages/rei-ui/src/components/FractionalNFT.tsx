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
  Stack,
  Text,
  useDisclosure,
  chakra,
  Flex,
  Link,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FractionalisedNFTAbi from "../constants/abis/FraactionalisedNFT.json";
import FractionaliserAbi from "../constants/abis/Fractionaliser.json";
import REIMarketAbi from "../constants/abis/REIMarket.json";
import { useAccount, useContract, useSigner } from "wagmi";
import {
  FractionaliserContractAddress,
  REIMarketContractAddress,
} from "../constants/addresses";
import { ethers } from "ethers";
import { GoPrimitiveDot } from "react-icons/go";
import ShowINSName from "./ShowINSName";
function FractionalNFT({ refetch, data, key }: any) {
  const [loanForm, setLoanForm] = useState({
    loanAmount: 0,
    interest: 0,
    time: 0,
  });
  const {
    image,
    tokenId,
    name,
    description,
    attributes: { SurfaceArea, GPSCoordinates, City, Country },
    fractionalisedNftAddress,
    fractionalisedId,
    fractionQuantity,
    NFTContractAddress,
  } = data;

  const {
    isOpen: isApplyFormOpen,
    onOpen: onApplyFormOpen,
    onClose: onApplyFormClose,
  } = useDisclosure();

  const { data: singer } = useSigner();
  const { address: userAddress } = useAccount();
  const [isREIMarketContractApproves, setisREIMarketContractApproves] =
    useState(false);
  const FractionaliserContract = useContract({
    addressOrName: FractionaliserContractAddress,
    contractInterface: FractionaliserAbi,
    signerOrProvider: singer,
  });
  const REIMarketContract = useContract({
    addressOrName: REIMarketContractAddress,
    contractInterface: REIMarketAbi,
    signerOrProvider: singer,
  });
  const toast = useToast();
  async function handleAppproveReiMarket() {
    try {
      const FractionalisedNFTAddress =
        FractionaliserContract.getAddressOfFractionisedId(fractionalisedId);
      const FractionalisedNFTContract = new ethers.Contract(
        FractionalisedNFTAddress,
        FractionalisedNFTAbi,
        singer ?? undefined
      );
      const approvetx = await FractionalisedNFTContract.approve(
        REIMarketContractAddress,
        fractionQuantity
      );
      await approvetx.wait();
      setisREIMarketContractApproves(true);
    } catch (error) {
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: FractionalNFT.tsx ~ line 77 ~ handleAppproveReiMarket ~ error",
        error
      );
    }
  }

  async function isREIMarketApproved() {
    try {
      const FractionalisedNFTAddress =
        FractionaliserContract.getAddressOfFractionisedId(fractionalisedId);
      const FractionalisedNFTContract = new ethers.Contract(
        FractionalisedNFTAddress,
        FractionalisedNFTAbi,
        singer ?? undefined
      );
      const approvesFor = await FractionalisedNFTContract.allowance(
        userAddress,
        REIMarketContractAddress
      );
      if (approvesFor.toString() == fractionQuantity) {
        setisREIMarketContractApproves(true);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: FractionalNFT.tsx ~ line 103 ~ isREIMarketApproved ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
    }
  }
  async function handleApplyForLoan() {
    try {
      const { loanAmount, interest, time } = loanForm;
      if (
        fractionalisedId <= 0 ||
        fractionQuantity <= 0 ||
        loanAmount <= 0 ||
        interest <= 0 ||
        time <= 0
      ) {
        toast({ title: "Put all value", status: "warning" });
        return;
      }
      console.log(
        fractionalisedId,
        fractionQuantity,
        loanAmount,
        interest,
        time
      );
      const applytx = await REIMarketContract.applyForLoan(
        fractionalisedId,
        fractionQuantity,
        loanAmount,
        interest,
        time
      );
      await applytx.wait();
      refetch({});
      onApplyFormClose();
      setLoanForm({ loanAmount: 0, interest: 0, time: 0 });
    } catch (err) {
      setLoanForm({ loanAmount: 0, interest: 0, time: 0 });
      toast({ title: "Error: see in console", status: "error" });
      console.log(
        "🚀 ~ file: FractionalNFT.tsx ~ line 127 ~ handleApplyForLoan ~ err",
        err
      );
    }
  }
  async function handleLoanForm(e: any) {
    try {
      const { name, value } = e.target;
      setLoanForm((preData) => {
        return { ...preData, [name]: value };
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: FractionalNFT.tsx ~ line 163 ~ handleLoanForm ~ error",
        error
      );
      toast({ title: "Error: see in console", status: "error" });
    }
  }
  useEffect(() => {
    isREIMarketApproved();
  }, [userAddress]);

  return (
    <>
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
                  {tokenId}
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
                  Fraction Quantity
                </Link>
              </Flex>
              <chakra.span mx={1} fontSize="sm" color="gray.600">
                {fractionQuantity}
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
          </Box>
          <Box py="4">
            {fractionQuantity > 0 && (
              <>
                {isREIMarketContractApproves ? (
                  <Button
                    width="full"
                    colorScheme="linkedin"
                    onClick={onApplyFormOpen}
                  >
                    Apply For Loan
                  </Button>
                ) : (
                  <Button
                    width="full"
                    colorScheme="linkedin"
                    onClick={handleAppproveReiMarket}
                  >
                    Approve
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={isApplyFormOpen}
        onClose={onApplyFormClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Loan amount</FormLabel>
              <Input
                name="loanAmount"
                type="number"
                onChange={handleLoanForm}
                placeholder="Fraction"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Interest</FormLabel>
              <Input
                name="interest"
                type="number"
                onChange={handleLoanForm}
                placeholder="Interest in percentage"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Time</FormLabel>
              <Input
                name="time"
                type="number"
                onChange={handleLoanForm}
                placeholder="Time"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              w="full"
              colorScheme="linkedin"
              onClick={handleApplyForLoan}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FractionalNFT;

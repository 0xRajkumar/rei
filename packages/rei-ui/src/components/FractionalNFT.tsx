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
} from "@chakra-ui/react";
import React, { useState } from "react";
import FractionalisedNFTAbi from "../constants/abis/FraactionalisedNFT.json";
import FractionaliserAbi from "../constants/abis/Fractionaliser.json";
import REIMarketAbi from "../constants/abis/REIMarket.json";
import { useAccount, useContract, useSigner } from "wagmi";
import {
  FractionaliserContractAddress,
  REIMarketContractAddress,
} from "../constants/addresses";
import { ethers } from "ethers";
function FractionalNFT({ data, key }: any) {
  const [loanForm, setLoanForm] = useState({
    loanAmount: 0,
    interest: 0,
    time: 0,
  });
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

  const {
    isOpen: isApplyFormOpen,
    onOpen: onApplyFormOpen,
    onClose: onApplyFormClose,
  } = useDisclosure();

  const { data: singer } = useSigner();
  const [isREIContractApproves, setIsREIContractApproves] = useState(false);
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
  async function handleAppproveReiMarket() {
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
    setIsREIContractApproves(true);
  }
  async function handleApplyForLoan() {
    const { loanAmount, interest, time } = loanForm;
    if (
      fractionalisedId <= 0 ||
      fractionQuantity <= 0 ||
      loanAmount <= 0 ||
      interest <= 0 ||
      time <= 0
    ) {
      console.log("Invalid Input");
      return;
    }
    console.log(fractionalisedId, fractionQuantity, loanAmount, interest, time);
    const applytx = await REIMarketContract.applyForLoan(
      fractionalisedId,
      fractionQuantity,
      loanAmount,
      interest,
      time
    );
    await applytx.wait();
  }
  async function handleLoanForm(e: any) {
    const { name, value } = e.target;
    console.log(name, value);
    setLoanForm((preData) => {
      return { ...preData, [name]: value };
    });
  }
  return (
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
            src={image}
            alt="Nothing here"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            tokenId = {tokenId}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {description}
          </Heading>
          <Stack direction={"column"} align={"center"}>
            <Text color={"gray.600"}>Country = {Country}</Text>
            <Text color={"gray.600"}> Country = {City}</Text>
            <Text color={"gray.600"}>Country = {GPSCoordinates}</Text>
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
          <>
            {fractionQuantity > 0 && (
              <>
                {isREIContractApproves ? (
                  <Button onClick={onApplyFormOpen}>Apply For Loan</Button>
                ) : (
                  <Button onClick={handleAppproveReiMarket}>Approve</Button>
                )}
              </>
            )}
          </>
        </Stack>
      </Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={isApplyFormOpen}
        onClose={onApplyFormClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
            <Button onClick={handleApplyForLoan}>Apply</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default FractionalNFT;

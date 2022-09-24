import { useEffect, useRef, useState } from "react";
import { Web3Storage } from "web3.storage";
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
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@chakra-ui/react";
import { FaMapMarkedAlt, FaFlag } from "react-icons/fa";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { useAccount, useContract, useSigner } from "wagmi";
import { NFTStorage, File } from "nft.storage";

import {
  GET_PENDING_APPLICATIONS,
  GET_APPROVER_ACCESS,
} from "../graphql/subgraph";
import { ApproverContractAddress } from "../constants/addresses";
const pendingApplication: NextPage = () => {
  /*
  In development we will use in .ENV file
  */
  const key: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkNWIxODg4MGZCRDNlODFmMThjMTgwMTUxRUJhMzU0RERCNzk2MDQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM3NzYwNTYzNTAsIm5hbWUiOiJSRUkifQ.MCkF8eYXgLAgMLVbLwOeabvEUrltjkXD5Vw81RCfsGY";
  const web3storage = new Web3Storage({ token: key });
  const [approval, setapproval] = useState<any>(1);

  const {
    isOpen: isApproveOpen,
    onOpen: onApproveOpen,
    onClose: onApproveClose,
  } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { address: userAddress, isConnected, connector } = useAccount();
  const {
    loading: loadingpendingUsers,
    error: errorpendingUsers,
    data: pendingUsers,
  } = useQuery(GET_PENDING_APPLICATIONS);
  const {
    loading: loadingApproverAccess,
    error: errorApproverAccess,
    data: ApproverAccess,
    refetch: refetchApproverAccess,
  } = useQuery(GET_APPROVER_ACCESS, {
    variables: {
      address: userAddress?.toLocaleLowerCase(),
    },
  });
  useEffect(() => {
    if (userAddress !== undefined) {
      refetchApproverAccess({ address: userAddress.toLocaleLowerCase() });
    }
  }, [userAddress]);
  console.log(
    loadingApproverAccess ? "" : ApproverAccess?.approverAccesses[0]?.bool
  );
  const applications = pendingUsers?.withStatuses[0]?.applications;
  const access = loadingApproverAccess
    ? null
    : ApproverAccess?.approverAccesses[0]?.bool;
  const { data: signer, isError, isLoading } = useSigner();
  const ApproverContract = useContract({
    addressOrName: ApproverContractAddress,
    contractInterface: ApproverAbi,
    signerOrProvider: signer,
  });
  async function handleDecision(
    applicationNumber: Number,
    name: String,
    description: String,
    image: String,
    country: String,
    city: String,
    gpscoordinates: String,
    surfaceArea: Number
  ) {
    if (!(approval === 1 || approval === 2)) return;
    if (
      !applicationNumber ||
      !name ||
      !description ||
      !image ||
      !country ||
      !city ||
      !gpscoordinates ||
      !surfaceArea
    )
      return;
    const attributes = {
      Country: country,
      City: city,
      GPSCoordinates: gpscoordinates,
      SurfaceArea: surfaceArea,
    };
    const nft = { name, description, image, attributes };
    const buffer = Buffer.from(JSON.stringify(nft));
    const files = [new File([buffer], `${applicationNumber}.json`)];
    try {
      const cid = await web3storage.put(files);
      console.log("🚀 ~ file: pendingapplications.tsx ~ line 137 ~ cid", cid);
      await ApproverContract.applicationDecision(
        applicationNumber,
        approval,
        `${cid}/${applicationNumber}.json`
      );
    } catch (err) {
      console.log("🚀 ~ file: pendingapplications.tsx ~ line 128 ~ err", err);
    }
  }
  return (
    <>
      {loadingpendingUsers ? (
        <Box>loadingpendingUsers</Box>
      ) : (
        <>
          <HStack my={"2em"} justify={"center"}>
            <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
              All pending applications
            </Heading>
          </HStack>
          <Center>
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              gap="4"
              justify="center"
              m={"auto"}
              align={"start"}
            >
              {loadingpendingUsers ? (
                <Heading textShadow="2px 2px #0987A0">Loading Data</Heading>
              ) : (
                applications?.map((data: any, index: number) => {
                  const {
                    applicationNumber,
                    name,
                    description,
                    country,
                    city,
                    gpsCoordinates,
                    imageURI,
                    applicant,
                    surfaceAreaInMTRs,
                  } = data;
                  const applicantAddress = applicant.id;
                  return (
                    <>
                      <Center
                        py={"0px"}
                        mt={"0px!important"}
                        border="1px"
                        borderColor="gray.200"
                        key={index}
                      >
                        <Box
                          role={"group"}
                          p={0}
                          maxW={{ base: "330px" }}
                          w={"full"}
                          bg={"white"}
                          boxShadow={"sm"}
                          rounded={"md"}
                          pos={"relative"}
                          zIndex={1}
                        >
                          <Image
                            roundedTop={"lg"}
                            height={"full"}
                            width={"full"}
                            objectFit={"cover"}
                            src={imageURI}
                            alt="Property Image"
                          />

                          <Stack p={6} pt={5} align={"center"}>
                            <Heading
                              fontSize={"2xl"}
                              fontFamily={"body"}
                              fontWeight={500}
                              textTransform={"uppercase"}
                            >
                              {name} with application Number {applicationNumber}
                            </Heading>
                            <Text
                              color={"gray.500"}
                              fontSize={"small"}
                              my={"2em"}
                            >
                              {description}
                              {applicantAddress}
                              Yessssssssssss <br /> {surfaceAreaInMTRs}
                            </Text>
                            <VStack w={"full"} p={"0px"} align={"start"}>
                              <HStack gap={1} justify="start">
                                <FaFlag />
                                <Text color={"gray.600"}>
                                  country: {country}
                                </Text>
                              </HStack>
                              <HStack gap={1} justify="start">
                                <FaMapMarkedAlt />
                                <Text color={"gray.600"}>
                                  Location: {gpsCoordinates}
                                </Text>
                              </HStack>
                            </VStack>
                            {access && (
                              <Button onClick={onApproveOpen}>
                                Do approve{" "}
                              </Button>
                            )}
                          </Stack>
                        </Box>
                      </Center>
                      <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isApproveOpen}
                        onClose={onApproveClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>
                            Do approve {applicationNumber}
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            <FormControl as="fieldset">
                              <FormLabel as="legend">
                                Select what you wanna do
                              </FormLabel>
                              <RadioGroup defaultValue="1">
                                <HStack spacing="24px">
                                  <Radio
                                    onChange={(e: any) => {
                                      setapproval(Number(e.target.value));
                                    }}
                                    value={"1"}
                                  >
                                    Approve
                                  </Radio>
                                  <Radio
                                    onChange={(e: any) => {
                                      setapproval(Number(e.target.value));
                                    }}
                                    value={"2"}
                                  >
                                    Not Approve
                                  </Radio>
                                </HStack>
                              </RadioGroup>
                            </FormControl>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              w={"full"}
                              colorScheme="blue"
                              mr={3}
                              onClick={() => {
                                handleDecision(
                                  applicationNumber,
                                  name,
                                  description,
                                  imageURI,
                                  country,
                                  city,
                                  gpsCoordinates,
                                  surfaceAreaInMTRs
                                );
                              }}
                            >
                              Save
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </>
                  );
                })
              )}
            </Stack>
          </Center>
        </>
      )}
    </>
  );
};

export default pendingApplication;

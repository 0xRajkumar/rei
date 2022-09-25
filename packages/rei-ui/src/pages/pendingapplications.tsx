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
  chakra,
  Flex,
} from "@chakra-ui/react";
import { GoPrimitiveDot } from "react-icons/go";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { useAccount, useContract, useSigner } from "wagmi";
import { NFTStorage, File } from "nft.storage";

import {
  GET_PENDING_APPLICATIONS,
  GET_APPROVER_ACCESS,
} from "../graphql/subgraph";
import { ApproverContractAddress } from "../constants/addresses";
import ApplicationStatus from "../components/ApplicationStatus";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();
  const { address: userAddress, isConnected, connector } = useAccount();
  const {
    loading: loadingpendingUsers,
    error: errorpendingUsers,
    data: pendingUsers,
    refetch: refetchpendingUsers,
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
    try {
      if (!(approval === 1 || approval === 2)) {
        toast({ title: "Not approves", status: "warning" });
        return;
      }
      if (
        !applicationNumber ||
        !name ||
        !description ||
        !image ||
        !country ||
        !city ||
        !gpscoordinates ||
        !surfaceArea
      ) {
        toast({
          title: "Fill all value",
          status: "warning",
        });
        return;
      }
      const attributes = {
        Country: country,
        City: city,
        GPSCoordinates: gpscoordinates,
        SurfaceArea: surfaceArea,
      };
      const nft = { name, description, image, attributes };
      const buffer = Buffer.from(JSON.stringify(nft));
      const files = [new File([buffer], `${applicationNumber}.json`)];
      const cid = await web3storage.put(files);
      console.log("🚀 ~ file: pendingapplications.tsx ~ line 137 ~ cid", cid);
      const tx = await ApproverContract.applicationDecision(
        applicationNumber,
        approval,
        `${cid}/${applicationNumber}.json`
      );
      await tx.wait();
      refetchpendingUsers();
      setapproval(1);
      onApproveClose();
    } catch (err) {
      toast({ title: "Error: See in console", status: "error" });
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
          <Box
            justifyContent="left"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            rowGap="4"
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
                        src={imageURI}
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
                                  Application Number
                                </Link>
                              </Flex>
                              <chakra.span
                                mx={1}
                                fontSize="sm"
                                color="gray.600"
                              >
                                {applicationNumber}
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
                              {country}
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
                              {city}
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
                              {gpsCoordinates}
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
                              {surfaceAreaInMTRs}
                            </chakra.span>
                          </Flex>
                          <Flex alignItems="center">
                            <GoPrimitiveDot height="8" />
                            <Flex alignItems="center" mx="2">
                              <Link fontWeight="bold" color="gray.700">
                                Applicant
                              </Link>
                            </Flex>
                            <chakra.span mx={1} fontSize="sm" color="gray.600">
                              {applicantAddress}
                            </chakra.span>
                          </Flex>
                        </Box>
                        <Box py="4">
                          {access && (
                            <Button
                              colorScheme="linkedin"
                              w="full"
                              onClick={onApproveOpen}
                            >
                              Give Approval
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isApproveOpen}
                        onClose={onApproveClose}
                      >
                        <ModalOverlay bg="blackAlpha.300" />
                        <ModalContent>
                          <ModalHeader>
                            Application {applicationNumber}
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            <FormControl as="fieldset">
                              <FormLabel as="legend">Decision</FormLabel>
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
                              colorScheme="linkedin"
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
                    </Box>
                  </>
                );
              })
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default pendingApplication;

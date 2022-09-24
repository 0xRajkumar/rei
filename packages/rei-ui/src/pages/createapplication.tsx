import { useEffect, ChangeEvent, useState } from "react";
import ApproverAbi from "../constants/abis/Approver.json";
import {
  Center,
  Link,
  Heading,
  Text,
  Divider,
  VStack,
  chakra,
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { GET_USER_APPLICATIONS } from "../graphql/subgraph";
import { useAccount, useContract, useSigner } from "wagmi";
import { ApproverContractAddress } from "../constants/addresses";
import { FaFlag, FaMapMarkedAlt } from "react-icons/fa";
import { Web3Storage } from "web3.storage";
const createapplication: NextPage = () => {
  const { address: userAddress, isConnected, connector } = useAccount();
  const [imageURI, setimageURI] = useState<string | null>(null);
  const [applicationForm, setApplicationForm] = useState<{
    name: string;
    description: string;
    country: string;
    city: string;
    gpsCoordinates: string;
    surfaceAreaInMTRs: number;
  }>({
    name: "",
    description: "",
    country: "",
    city: "",
    gpsCoordinates: "",
    surfaceAreaInMTRs: 0,
  });
  const {
    loading,
    error,
    data: createdByUser,
    refetch,
  } = useQuery(GET_USER_APPLICATIONS, {
    variables: {
      address: userAddress,
    },
  });

  const { data: signer, isError, isLoading } = useSigner();

  const ApproverContract = useContract({
    addressOrName: ApproverContractAddress,
    contractInterface: ApproverAbi,
    signerOrProvider: signer,
  });
  async function handleApplicationForm(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setApplicationForm((preData) => {
      return { ...preData, [name]: value };
    });
  }
  const key: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkNWIxODg4MGZCRDNlODFmMThjMTgwMTUxRUJhMzU0RERCNzk2MDQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM3NzYwNTYzNTAsIm5hbWUiOiJSRUkifQ.MCkF8eYXgLAgMLVbLwOeabvEUrltjkXD5Vw81RCfsGY";
  const web3storage = new Web3Storage({ token: key });
  console.log(applicationForm);

  async function handleImage(e: any) {
    const target = e.target;
    try {
      const file = target.files[0];
      const name =
        applicationForm.name === "" || applicationForm.name === undefined
          ? "default"
          : applicationForm.name;
      const newfile = new File([file], name, {
        type: file.type,
        lastModified: file.lastModified,
      });
      const metadata = new File(
        [JSON.stringify({ name: name })],
        "metadata.json"
      );
      const path = await web3storage.put([newfile, metadata]);
      const url: string = `https://ipfs.io/ipfs/${path}/${name}`;
      setimageURI(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function handleApplicationSubmit() {
    const {
      name,
      description,
      country,
      city,
      gpsCoordinates,
      surfaceAreaInMTRs,
    } = applicationForm;
    if (
      !name ||
      !description ||
      !imageURI ||
      !country ||
      !city ||
      !gpsCoordinates ||
      !surfaceAreaInMTRs
    )
      return;
    if (!isConnected) return;
    try {
      const tx = await ApproverContract.applyForApproval(
        name,
        description,
        imageURI,
        country,
        city,
        gpsCoordinates,
        surfaceAreaInMTRs,
        {
          from: userAddress,
        }
      );
      await tx.wait();
      setApplicationForm({
        name: "",
        description: "",
        country: "",
        city: "",
        gpsCoordinates: "",
        surfaceAreaInMTRs: 0,
      });
      setimageURI("");
      refetch({ address: userAddress?.toLocaleLowerCase() });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userAddress !== undefined) {
      refetch({ address: userAddress.toLocaleLowerCase() });
    }
  }, [userAddress]);
  const applications = loading ? null : createdByUser?.users[0]?.applications;
  return (
    <Box>
      <HStack my={"4"} justify={"center"}>
        <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
          Apply to list your properties
        </Heading>
      </HStack>

      <Tabs mt={"4em"} isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab fontSize={"2xl"}>Create a new application</Tab>
          <Tab fontSize={"2xl"}>All created applications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Box minH={"100vh"} mx="auto" bg={"gray.50"}>
                <Stack
                  spacing={8}
                  w="100%"
                  alignItems="center"
                  mx={"auto"}
                  py={12}
                  px={6}
                >
                  <Stack align={"center"}>
                    <Heading as={"h2"} fontSize={"4xl"} textAlign={"center"}>
                      Create Application
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                      Get your property converted to nft.
                    </Text>
                  </Stack>
                  <Box
                    mx="auto"
                    rounded={"lg"}
                    maxW="2xl"
                    w="100%"
                    bg={"white"}
                    boxShadow={"xl"}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="name"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="description"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="imageURI" isRequired>
                        <FormLabel>ImageURI</FormLabel>
                        <Input
                          borderColor="black"
                          maxW="60"
                          p="1"
                          type="file"
                          onChange={handleImage}
                        />
                      </FormControl>
                      <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="country"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="city"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="gpsCoordinates" isRequired>
                        <FormLabel>GpsCoordinates</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="gpsCoordinates"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="surfaceAreaInMTRs" isRequired>
                        <FormLabel>SurfaceAreaInMTRs</FormLabel>
                        <Input
                          onChange={handleApplicationForm}
                          name="surfaceAreaInMTRs"
                          type="number"
                        />
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          type="button"
                          onClick={handleApplicationSubmit}
                        >
                          Create Application
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Heading as={"h2"} fontSize={"4xl"} textAlign={"center"}>
                {userAddress
                  ? "Your Created Applications"
                  : "Please connect your wallet"}
              </Heading>
              <Stack flexDirection="row" flexWrap="wrap" gap="2">
                {loading ? (
                  <Heading textShadow="2px 2px #0987A0">Loading Data</Heading>
                ) : (
                  applications?.map((data: any, index: number) => {
                    const {
                      applicationNumber,
                      name,
                      description,
                      imageURI,
                      country,
                      city,
                      gpsCoordinates,
                      surfaceAreaInMTRs,
                      applicationStatus,
                    } = data;
                    const status = applicationStatus.id;
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
                                {name} with application Number{" "}
                                {applicationNumber}
                              </Heading>
                              <Text
                                color={"gray.500"}
                                fontSize={"small"}
                                my={"2em"}
                              >
                                {description}
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
                                <HStack gap={1} justify="start">
                                  <FaMapMarkedAlt />
                                  <Text color={"gray.600"}>
                                    surfaceAreaInMTRs: {surfaceAreaInMTRs}
                                  </Text>
                                </HStack>
                                <HStack gap={1} justify="start">
                                  <FaMapMarkedAlt />
                                  <Text color={"gray.600"}>
                                    status: {status}
                                  </Text>
                                </HStack>
                              </VStack>
                            </Stack>
                          </Box>
                        </Center>
                      </>
                    );
                  })
                )}
              </Stack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default createapplication;

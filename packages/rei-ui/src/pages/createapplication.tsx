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
  useToast,
  Container,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { GET_USER_APPLICATIONS } from "../graphql/subgraph";
import { useAccount, useContract, useSigner } from "wagmi";
import { ApproverContractAddress } from "../constants/addresses";
import { GoPrimitiveDot } from "react-icons/go";
import { Web3Storage } from "web3.storage";
import ApplicationStatus from "../components/ApplicationStatus";
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

  const toast = useToast();
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
      toast({ title: "Error: See in console", status: "error" });
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
    ) {
      toast({ title: "Put all value", status: "warning" });
      return;
    }
    if (!isConnected) {
      toast({ title: "Not connected", status: "warning" });
      return;
    }
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
      toast({ title: "Error: See in console", status: "error" });
      setApplicationForm({
        name: "",
        description: "",
        country: "",
        city: "",
        gpsCoordinates: "",
        surfaceAreaInMTRs: 0,
      });
      setimageURI("");
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
    <Container maxW="8xl" py={10}>
      <HStack my={"4"} justify={"center"}>
        <Heading as={"h1"} fontSize={"4xl"} textAlign={"center"}>
          Apply to create your REI NFT
        </Heading>
      </HStack>

      <Tabs mt={"4em"} isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab fontSize={"2xl"}>Create a new application</Tab>
          <Tab fontSize={"2xl"}>See previous application</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Box minH={"100vh"} mx="auto">
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
                          value={applicationForm.name}
                          onChange={handleApplicationForm}
                          name="name"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input
                          value={applicationForm.description}
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
                      {imageURI && (
                        <Image width="48" height="auto" src={imageURI} />
                      )}
                      <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input
                          value={applicationForm.country}
                          onChange={handleApplicationForm}
                          name="country"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          value={applicationForm.city}
                          onChange={handleApplicationForm}
                          name="city"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="gpsCoordinates" isRequired>
                        <FormLabel>GpsCoordinates</FormLabel>
                        <Input
                          value={applicationForm.gpsCoordinates}
                          onChange={handleApplicationForm}
                          name="gpsCoordinates"
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="surfaceAreaInMTRs" isRequired>
                        <FormLabel>SurfaceAreaInMTRs</FormLabel>
                        <Input
                          value={applicationForm.surfaceAreaInMTRs}
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
              <Heading as={"h2"} fontSize={"4xl"} textAlign={"center"} mb="10">
                {userAddress
                  ? "Your Created Applications"
                  : "Please connect your wallet"}
              </Heading>
              <Box
                justifyContent="left"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                rowGap="4"
              >
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
                        <Box
                          mx="auto"
                          rounded="lg"
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

                                <chakra.span
                                  fontSize="xs"
                                  textTransform="uppercase"
                                  color="brand.600"
                                >
                                  <ApplicationStatus status={status} />
                                </chakra.span>
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
                                <chakra.span
                                  mx={1}
                                  fontSize="sm"
                                  color="gray.600"
                                >
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
                                <chakra.span
                                  mx={1}
                                  fontSize="sm"
                                  color="gray.600"
                                >
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
                                <chakra.span
                                  mx={1}
                                  fontSize="sm"
                                  color="gray.600"
                                >
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
                                <chakra.span
                                  mx={1}
                                  fontSize="sm"
                                  color="gray.600"
                                >
                                  {surfaceAreaInMTRs}
                                </chakra.span>
                              </Flex>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    );
                  })
                )}
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default createapplication;

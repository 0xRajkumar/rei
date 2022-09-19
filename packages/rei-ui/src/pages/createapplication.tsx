import { useEffect, ChangeEvent, useState } from "react";
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
const createapplication: NextPage = () => {
  const { address: userAddress, isConnected, connector } = useAccount();

  const [applicationForm, setApplicationForm] = useState<{
    name: string;
    description: string;
    imageURI: string;
    country: string;
    city: string;
    gpsCoordinates: string;
    surfaceAreaInMTRs: number;
  }>({
    name: "",
    description: "",
    imageURI: "",
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
  console.log(applicationForm);

  async function handleApplicationSubmit() {
    const {
      name,
      description,
      imageURI,
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
      // setApplicationForm({
      //   name: "",
      //   description: "",
      //   imageURI: "",
      //   country: "",
      //   city: "",
      //   gpsCoordinates: "",
      //   surfaceAreaInMTRs: 0,
      // });
      refetch({ address: userAddress });
    } catch (err) {
      console.log(err);
    }
  }

  console.log(createdByUser);
  console.log(loading, userAddress);
  console.log(error);
  useEffect(() => {
    if (userAddress !== undefined) {
      refetch({ address: userAddress.toLocaleLowerCase() });
    }
  }, [userAddress]);
  const applications = loading ? null : createdByUser?.users[0]?.applications;
  return (
    <Box>
      <HStack my={"4"} justify={"center"}>
        <Heading as={"h1"}  fontSize={"4xl"} textAlign={"center"}>
          Apply to list your properties
        </Heading>

      </HStack>
       
      <Tabs mt={'4em'} isFitted variant='enclosed'>
        <TabList mb='1em'>
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
                          onChange={handleApplicationForm}
                          name="imageURI"
                          type="text"
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
            <Box minH={"100vh"} mx="auto" bg={"gray.50"} py={12}>
              <Heading as={"h2"}  fontSize={"4xl"} textAlign={"center"}>Your Created Applications</Heading>
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
                      gpsCoordinates,
                      surfaceAreaInMTRs,
                      applicationStatus,
                    } = data;
                    const status = applicationStatus.id;
                    return (
                    <>
                      <Center py={"0px"} mt={"0px"} border='1px' borderColor='gray.200' key={index}>
                      <Box
                        role={"group"}
                        p={6}
                        maxW={"330px"}
                        w={"full"}
                        bg={"white"}
                        boxShadow={"sm"}
                        rounded={"md"}
                        pos={"relative"}
                        zIndex={1}
                      >
                        <Box
                          rounded={"md"}
                          mt={"0px"}
                          pos={"relative"}
                          height={"230px"}
                          _after={{
                            transition: "all .3s ease",
                            content: '""',
                            w: "full",
                            h: "full",
                            pos: "absolute",
                            top: 0,
                            left: 0,
                            backgroundImage: `url(${imageURI})`,
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
                            src={imageURI}
                            alt="Property Image"
                          />
                        </Box>
                        <Stack pt={10} align={"center"}>
                          
                          <Heading
                            fontSize={"2xl"}
                            fontFamily={"body"}
                            fontWeight={500}
                            textTransform={"uppercase"}
                          >
                            {name} with applicationNumber {applicationNumber}
                          </Heading>
                          <Text
                            color={"gray.500"}
                            fontSize={"sm"}
                            my={2}
                            noOfLines={[4, 4, 3]}
                          >
                            {description}
                            
                          </Text>
                          <VStack w={"full"} p={"0px"}  align={"start"}>
                            
                            <HStack gap={1} justify="start">
                            <FaFlag />
                            <Text color={"gray.600"}>country: {country}</Text> 
                            </HStack>
                            <HStack gap={1} justify="start">
                            <FaMapMarkedAlt />
                            <Text color={"gray.600"} >Location: {gpsCoordinates}</Text>
                            </HStack>
                          </VStack>
                        </Stack>
                      </Box>
                    </Center>
                      {/*<Center py={12} key={index}>
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
                              backgroundImage: `url(${imageURI})`,
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
                              src={imageURI}
                              alt="Nothing here"
                            />
                          </Box>
                          <Stack pt={10} align={"center"}>
                            <Text
                              color={"gray.500"}
                              fontSize={"sm"}
                              textTransform={"uppercase"}
                            >
                              {name} with applicationNumber {applicationNumber}
                            </Text>
                            <Heading
                              fontSize={"2xl"}
                              fontFamily={"body"}
                              fontWeight={500}
                            >
                              {description}
                            </Heading>
                            <Stack direction={"column"} align={"center"}>
                              <Text color={"gray.600"}>status = {status}</Text>
                              <Text color={"gray.600"}>country = {country}</Text>
                              <Text color={"gray.600"}>
                                gps Location = {gpsCoordinates}
                              </Text>
                              <Text color={"gray.600"}>
                                surfaceAreaInMTRs = {surfaceAreaInMTRs}
                              </Text>
                            </Stack>
                          </Stack>
                        </Box>
                        </Center> */}
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

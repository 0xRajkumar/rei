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
} from "@chakra-ui/react";
import { FaMapMarkedAlt, FaFlag} from "react-icons/fa";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { GET_PENDING_APPLICATIONS } from "../graphql/subgraph";
const pendingApplication: NextPage = () => {
  const {
    loading,
    error,
    data: pendingUsers,
  } = useQuery(GET_PENDING_APPLICATIONS);
  console.log(
    loading ? "Loading" : pendingUsers?.withStatuses[0].applications[0]
  );
  if (loading) return <p>Loading...</p>;
  const applications = pendingUsers?.withStatuses[0].applications;
  return (
    <Center>
      <Stack flexDirection="row" flexWrap="wrap" gap="4" align={'start'}>
        {loading ? (
          <Heading textShadow="2px 2px #0987A0">Loading Data</Heading>
        ) : (
          applications?.map((data: any, index: number) => {
            const {
              applicationNumber,
              name,
              description,
              country,
              gpsCoordinates,
              imageURI,
              applicant,
            } = data;
            const applicantAddress = applicant.id;
            return (
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
            );
          })
        )}
      </Stack>
    </Center>
  );
};

export default pendingApplication;

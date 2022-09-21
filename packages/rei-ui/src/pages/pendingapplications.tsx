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
import PropertyCards from "../components/cards/PropertyCards";
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
    <>
    <HStack my={"2em"} justify={"center"}>
      <Heading as={"h1"}  fontSize={"4xl"} textAlign={"center"}>
        All pending applications
      </Heading>

    </HStack>
    <Center>
      <Stack flexDirection="row" flexWrap="wrap" gap="4" justify="center" m={"auto"} mb={'2em'} align={'start'}>
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
              <>
              <PropertyCards
                key={index}
                imageURI={imageURI}
                name={name}
                applicationNumber={applicationNumber}
                description={description}
                country={country}
                gpsCoordinates={gpsCoordinates}

              />
              {/* <Center py={"0px"} mt={"0px!important"} border='1px' borderColor='gray.200' key={index}>
                <Box
                  role={"group"}
                  p={0}
                  maxW={{base:"330px"}}
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
              </Center> */}
              
              
              </>
            );
          })
        )}
      </Stack>
    </Center>
    </>
  );
};

export default pendingApplication;

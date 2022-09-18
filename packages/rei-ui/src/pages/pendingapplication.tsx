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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import { GET_PENDING_APPLICATION } from "../graphql/subgraph";
const PendingApplication: NextPage = () => {
  const {
    loading,
    error,
    data: pendingUsers,
  } = useQuery(GET_PENDING_APPLICATION);
  console.log(
    loading ? "Loading" : pendingUsers.withStatuses[0].applications[0]
  );
  if (loading) return <p>Loading...</p>;
  const applications = pendingUsers.withStatuses[0].applications;
  return (
    <Center h="calc(100vh - 131px)">
      <Stack flexDirection="row" flexWrap="wrap" gap="2">
        {loading ? (
          <Heading textShadow="2px 2px #0987A0">Loading Data</Heading>
        ) : (
          applications.map((data: any, index: number) => {
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
              <Center py={12} key={index}>
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
                    <Stack direction={"row"} align={"center"}>
                      <Text color={"gray.600"}>country = {country}</Text>
                      <Text color={"gray.600"}>
                        gps Location = {gpsCoordinates}
                      </Text>
                    </Stack>
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

export default PendingApplication;

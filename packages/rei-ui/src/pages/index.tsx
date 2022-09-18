import { Center, Link, Heading, Text, Divider, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <Center h="calc(100vh - 131px)">
      <VStack>
        <Heading textShadow="2px 2px #0987A0">REI</Heading>
      </VStack>
    </Center>
  );
};

export default Home;

import { Center, Link, Heading, Text, Divider, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import HeroHeader from "../components/header/HeroHeader";
const Home: NextPage = () => {
  return (
    <Center>
      <VStack w="full">
        <HeroHeader/>
      </VStack>
    </Center>
  );
};

export default Home;

import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeroSection from "../components/Home";
import OverviewSection from "../components/OverviewSection";

const Home: NextPage = () => {
  return (
    <Container maxW="8xl" py={10}>
      <HeroSection />
      <OverviewSection />
    </Container>
  );
};

export default Home;

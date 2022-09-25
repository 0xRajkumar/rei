import { Fragment } from "react";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link as CLink,
  Button,
  Icon,
  Flex,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
// Here we have used react-icons package for the icons
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
  return (
    <>
      <Container maxW="8xl" px={{ base: 6, md: 10 }} py={14}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Stack direction="column" spacing={10} justifyContent="center">
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Invest and Lend through
              <chakra.span
                bgGradient="linear(to-br, #228be6, #15aabf)"
                bgClip="text"
              >
                {" "}
                REI NFT's{" "}
              </chakra.span>{" "}
              <br /> without any friction.
            </chakra.h1>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize="lg"
              textAlign="left"
              fontWeight="400"
              maxW="700px"
            >
              Invester can invest in real estate projects and borrower will be
              able to take by converting his real estate in REI NFT's and using
              REI NFT's as collateral.
            </Text>

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 0, sm: 2 }}
              flexWrap="wrap"
            >
              <Button
                h={12}
                px={6}
                bgGradient="linear(to-br, #228be6, #15aabf)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #228be6, #228be6)" }}
                variant="solid"
                size="lg"
                rounded="md"
                fontWeight="bold"
                mb={{ base: 2, sm: 0 }}
              >
                <Link href="/market">
                  <chakra.span> Get started </chakra.span>
                </Link>
              </Button>
              <Flex
                border="1px solid"
                borderColor="gray.700"
                justify="center"
                p={3}
                px={4}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                fontWeight="bold"
                alignItems="center"
                as={CLink}
                href={"https://github.com/0xRajkumar/rei"}
              >
                <Icon as={FaGithub} h={4} w={4} />
                <chakra.span ml={1}> Github</chakra.span>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default HeroSection;

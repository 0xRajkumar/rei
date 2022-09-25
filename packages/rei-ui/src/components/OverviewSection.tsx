import {
  chakra,
  Container,
  Stack,
  HStack,
  VStack,
  Flex,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const overviewList = [
  {
    id: 1,
    label: "Connect with Metamask",
    subLabel: "If you wanna do transaction.",
  },
  {
    id: 2,
    label: "Market",
    subLabel: "If you want to invest go to market.",
  },
  {
    id: 3,
    label: "Create Application",
    subLabel: "Creating Application to create REI NFT.",
  },
  {
    id: 4,
    label: "Apply for loan",
    subLabel:
      "After application verification fractionlise your NFT to apply for loan.",
  },
];

const OverviewSection = () => {
  return (
    <Container maxW="8xl" py={10}>
      <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={2}>
        How it works?
      </chakra.h2>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          spacing={4}
          alignItems="flex-start"
          mb={{ base: 5, md: 0 }}
          maxW="md"
        >
          {overviewList.map((data) => (
            <Box key={data.id}>
              <HStack spacing={2}>
                <Flex
                  fontWeight="bold"
                  boxShadow="md"
                  color="white"
                  bg="blue.400"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  w={10}
                  h={10}
                >
                  {data.id}
                </Flex>
                <Text fontSize="xl">{data.label}</Text>
              </HStack>
              <Text fontSize="md" color="gray.500" ml={12}>
                {data.subLabel}
              </Text>
            </Box>
          ))}
        </VStack>
        <Image
          boxSize={{ base: "auto", md: "lg" }}
          objectFit="contain"
          src="https://img.freepik.com/free-photo/stay-home-concept-wooden-table-side-view-hand-holding-wooden-cube_176474-9516.jpg?w=996&t=st=1664099408~exp=1664100008~hmac=9e643d6d848bb9384d1183507550c0544f4aa606694bc331470f0d6617e43e16"
          rounded="lg"
        />
      </Stack>
    </Container>
  );
};

export default OverviewSection;

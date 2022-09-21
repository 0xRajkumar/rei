import { Box, Center, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { FaFlag, FaMapMarkedAlt } from 'react-icons/fa';

const PropertyCards = (props) => {
    const {
        applicationNumber,
        name,
        description,
        country,
        gpsCoordinates,
        imageURI,
        applicant,
      } = props;

  return (
    <>
    <Center py={"0px"} mt={"0px!important"} border='1px' borderColor='gray.200'>
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
    </Center>
    </>
  )
}

export default PropertyCards
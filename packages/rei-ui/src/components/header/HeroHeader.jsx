import React from 'react'
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
  } from '@chakra-ui/react';

const HeroHeader = () => {
  return (
    <>
    <header className='heroHeader'>
    <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={800}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'} color={'white'}>
            RESTORE THE <br />
            <Text as={'span'} color={'green.400'}>
              BALANCE
            </Text>
          </Heading>
          <Text color={'gray.200'}>
            Offset your carbon footprint to create a greener world.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Get Started
            </Button>
            <Button variant={'link'} colorScheme={'teal'} size={'sm'}>
              Learn more
            </Button>
            
          </Stack>
        </Stack>
      </Container>
      </header>
    </>
  )
}


export default HeroHeader
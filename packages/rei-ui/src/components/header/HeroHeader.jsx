import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';

const HeroHeader = () => {
  return (
    <>
      <Flex
      w={'full'}
      minH={'100vh'}
      backgroundImage={
        'url(/images/homebanner.jpg)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'6xl'} align={'flex-start'} spacing={6} justifyContent="center">
          <Text
          as="h1"
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            textAlign="center"
            fontSize={useBreakpointValue({ base: '2xl', md: '7xl' })}>
               Fractional and frictionless <br/> real-estate investing
          </Text>
          <Text
            bgGradient='linear(to-tl, green.100, yellow.400)'
            bgClip='text'
            textAlign="center"
            m={"1em auto!important"}
            
            fontSize={useBreakpointValue({ base: 'lg', md: '2xl' })}
            fontWeight='extrabold'
          >
            OWNERSHIP REINVENTED
          </Text>
          
          <Stack direction={'row'} m={'1em auto!important'}>
            <Button
              bg={'green.600'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'green.700' }}>
              Get Started
            </Button>
            <Button
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Show me more
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
      
    </>
  )
}


export default HeroHeader
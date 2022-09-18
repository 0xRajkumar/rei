import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcCalculator, FcDonate, FcGlobe } from 'react-icons/fc';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
  }

  const Features = () => {
    return (
        <Box p={{base:4, md:10}}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcCalculator} w={10} h={10} />}
            title={'Calculate your carbon footprint.'}
            text={
              'Use our simple calculator to determine how much CO2 you emit in your daily life activity.'
            }
          />
          <Feature
            icon={<Icon as={FcGlobe} w={10} h={10} />}
            title={'2. Purchase carbon offset products.'}
            text={
              "We offer a range of affordable products and subscription plans designed to offset your impact."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={'3. We’ll fund carbon-reduction projects.'}
            text={
              'We fund greenhouse gas reduction and renewable energy projects to offset your daily carbon footprint.'
            }
          />
        </SimpleGrid>
      </Box>
    );
  };

  const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
      <Stack>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'gray.100'}
          mb={1}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    );
  };

export default Features
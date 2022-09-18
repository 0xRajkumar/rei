import {
    Button,
    Flex,
    HStack,
    Input,
    StackDivider,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  import { FaBars, FaGithub, FaChevronRight } from "react-icons/fa";
  import { IconButton } from "@chakra-ui/react";
  
  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";
  
  import {
    Box,
  
    Text,
  
    Stack,
   
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
  
  } from '@chakra-ui/react';
  
  const Navigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    return (
      <>
        <Button display={{ base: 'block', md: 'none' }} ref={btnRef} colorScheme="green" onClick={onOpen}>
          <FaBars />
        </Button>
  
        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
        </Flex>
  
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Carbon Credit</DrawerHeader>
  
            <DrawerBody>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <Button colorScheme="teal" variant="ghost">
                  Home
                </Button>
                <Button colorScheme="teal" variant="ghost">
                  Marketplace
                </Button>
                <Button colorScheme="teal" variant="ghost">
                  About
                </Button>
                <Button colorScheme="teal" variant="ghost">
                  FAQs
                </Button>
              </VStack>
            </DrawerBody>
  
            <DrawerFooter>
              <HStack>
                <IconButton aria-label="Github" icon={<FaGithub />} />
              </HStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'green.500' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'green.400'} w={5} h={5} as={FaChevronRight} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  
  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Home',
      href: '/',
    },{
      label: 'Marketplace',
      children: [
        {
          label: 'Invest in properties',
          subLabel: 'Become the landlord of the future',
          href: '#',
        },
        {
          label: 'Get funds for your property',
          subLabel: 'Get investment for your dream home',
          href: '#',
        },
      ],
    },
    
    
    {
      label: 'About',
      href: '#',
    },
    {
      label: 'FAQs',
      href: '#',
    },
  ];
  
  export default Navigation;
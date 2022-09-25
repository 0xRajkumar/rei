import {
  Button,
  Flex,
  HStack,
  Input,
  Link as CLink,
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      <Button
        display={{ base: "block", md: "none" }}
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
      >
        <FaBars />
      </Button>

      <Flex display={{ base: "none", md: "flex" }} ml={10}>
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
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <CLink
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <Link href={navItem.href ?? "#"}>{navItem.label}</Link>
              </CLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
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
    <CLink
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Link href={href ?? "/"}>
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.500" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"green.400"} w={5} h={5} as={FaChevronRight} />
          </Flex>
        </Stack>
      </Link>
    </CLink>
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
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/usernfts",
  },
  {
    label: "Market",
    href: "/market",
  },
  {
    label: "Applications",
    children: [
      {
        label: "Pending Applications",
        subLabel: "See pending applications",
        href: "/pendingapplications",
      },
      {
        label: "Create Application",
        subLabel: "Create and see already created applications",
        href: "/createapplication",
      },
    ],
  },
];

export default Navigation;

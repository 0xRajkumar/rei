import React from "react";
import {} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Navigation from "./Navigation";

import DropMenu from "./DropMenu";
import Toasts from "../toasts/Toasts";

import {
  Box,
  Button,
  HStack,
  Heading,
  Text,
  useDisclosure,
  VStack,
  StackDivider,
  Spinner,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { address, isConnected, connector } = useAccount();

  const [isSSR, setIsSSR] = useState(true);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      <HStack
        paddingX={{ base: 2, md: 8 }}
        paddingY="4"
        display="flex"
        justifyContent="space-between"
      >
        <HStack>
          <Image src="/images/rei.png" alt="logo" height="30px" width="30px" />
          <Heading color={"grey.500"} as="h2" size="lg">
            REI
          </Heading>
        </HStack>
        <HStack
          display="flex"
          gap={{ base: 2, md: 4 }}
          flexDirection={{ base: "row", md: "row-reverse" }}
          justifyContent="end"
        >
          {!isSSR && isConnected ? (
            <>
              <DropMenu />
            </>
          ) : (
            <>
              <Button onClick={onOpen}>Connect</Button>
              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Login</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                      Connect your wallet
                    </Text>
                    <div>
                      <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                      >
                        {connectors.map((connector) => (
                          <div key={connector.id}>
                            <Button
                              disabled={!connector.ready}
                              onClick={() => connect({ connector })}
                              w="full"
                              colorScheme="teal"
                              variant="ghost"
                            >
                              {connector.name}
                              {isLoading &&
                                connector.id === pendingConnector?.id && (
                                  <Spinner />
                                )}
                            </Button>
                          </div>
                        ))}
                      </VStack>
                      {error && (
                        <Toasts message={error.message} status="error" />
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
          <Navigation />
        </HStack>
      </HStack>
    </>
  );
};

export default Navbar;

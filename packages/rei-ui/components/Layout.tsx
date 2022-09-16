import { Box, Button, HStack, Heading, Text, Link } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Layout = function ({ children }: { children: React.ReactNode }) {
  const { address, isConnected, connector } = useAccount();
  const [isSSR, setIsSSR] = useState(true);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <Box>
      <HStack
        paddingX="8"
        paddingY="4"
        backgroundColor={"cyan.700"}
        display="flex"
        justifyContent="space-between"
      >
        <Heading color={"white"}>REI</Heading>
        {!isSSR && isConnected ? (
          <Text
            borderRadius={"2xl"}
            bgColor={"cyan.900"}
            px={"3"}
            color={"white"}
          >
            {address?.toString().slice(0, -36)}...
            {address?.toString().substring(38)}
          </Text>
        ) : (
          <Button
            onClick={() => {
              connect();
            }}
          >
            Connect Metamask
          </Button>
        )}
      </HStack>
      {children}
      <HStack
        paddingX="8"
        paddingY="4"
        backgroundColor={"cyan.700"}
        display="flex"
        justifyContent="center"
      >
        <Text color={"white"}>Footer</Text>
      </HStack>
    </Box>
  );
};

export default Layout;

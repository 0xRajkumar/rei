import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  Avatar,
  Flex,
  Text,
  Button,
  Portal,
  useClipboard,
  HStack,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useEnsAvatar } from "wagmi";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import Toasts from "../toasts/Toasts";
import ShowINSName from "../ShowINSName";
const DropMenu = () => {
  const { address, isConnected, connector } = useAccount();
  const { hasCopied, onCopy } = useClipboard(address ?? "");
  const { disconnect } = useDisconnect();
  const { data, error, isLoading, refetch } = useEnsAvatar({
    addressOrName: address,
    enabled: false,
  });

  return (
    <>
      <Menu>
        <MenuButton>
          <HStack bgColor="linkedin.700" pl="2" py="2" pr="3" rounded="full">
            <Avatar
              size={"sm"}
              name="avatar"
              src={
                data ??
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
              }
            />
            <Flex direction="column" color="white">
              <ShowINSName userAddress={address} />
            </Flex>
          </HStack>
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem>
              <Flex mb={2} align="center" justify="space-between" w="full">
                <Text>
                  {address?.toString().slice(0, -36)}...
                  {address?.toString().substring(38)}
                </Text>
                <div onClick={onCopy}>
                  {hasCopied ? (
                    <>
                      <FaCopy /> <Toasts message="Copied" status="success" />
                    </>
                  ) : (
                    <FaRegCopy />
                  )}
                </div>
              </Flex>
            </MenuItem>

            <MenuItem onClick={() => disconnect()}>Logout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
};

export default DropMenu;

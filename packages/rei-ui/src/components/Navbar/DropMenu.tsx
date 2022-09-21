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
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import Toasts from '../toasts/Toasts';
import Link from "next/link";

const DropMenu = () => {
  const { address, isConnected, connector } = useAccount();
  const { hasCopied, onCopy } = useClipboard(address ?? "");

  const { disconnect } = useDisconnect();
  
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar name={`${address?.toString().slice(40, )} ${address?.toString().slice(41, )}`} />
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
                  {hasCopied ? (<><FaCopy /> <Toasts message="Copied"  status='success'/></>) : <FaRegCopy />}
                </div>
              </Flex>
            </MenuItem>
            <Link href="/usernfts">
            <MenuItem>Your NFTs</MenuItem>
            </Link>
            <MenuItem onClick={() => disconnect()}>Logout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
};

export default DropMenu;
import React from "react";
import {
  Flex,
  Heading,
  HStack,
  Text,
  Box,
  VStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import {
  RiLogoutBoxRLine,
  RiUserSettingsLine,
  RiShieldUserLine,
} from "react-icons/ri";
import ConnectButton from "./ConnectButton";

type Props = {
  viewTitle: string;
  onOpenAccountModal: () => void;
  onLogout: () => void;
};

const Header: React.FC<Props> = ({
  viewTitle,
  onOpenAccountModal,
  onLogout,
}) => {
  return (
    <Flex
      as="header"
      w="full"
      h="80px"
      align="center"
      justify="space-between"
      px={8}
      bg="rgba(15, 23, 42, 0.6)"
      backdropFilter="blur(16px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.08)"
      position="sticky"
      top={0}
      zIndex={5}
    >
      <VStack align="flex-start" spacing={0}>
        <Heading size="md" color="white" fontWeight="bold">
          {viewTitle}
        </Heading>
        <Text
          fontSize="xs"
          color="whiteAlpha.500"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          Vaultic Secure Node
        </Text>
      </VStack>

      <HStack spacing={6}>
        <ConnectButton handleOpenModal={onOpenAccountModal} />

        <Menu gutter={12}>
          <MenuButton
            as={Box}
            cursor="pointer"
            borderRadius="full"
            p="2px"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: "blue.400", bg: "whiteAlpha.100" }}
            transition="all 0.2s"
          >
            <Avatar
              size="sm"
              name="Vault Commander"
              src="https://bit.ly/tioluwani-kolawole"
              bg="blue.600"
            />
          </MenuButton>
          <MenuList
            bg="#0F172A"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.4)"
            backdropFilter="blur(20px)"
            py={2}
          >
            <Box px={4} py={3}>
              <Text fontSize="sm" fontWeight="bold" color="white">
                Commander
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500">
                Node Operator #001
              </Text>
            </Box>
            <MenuDivider borderColor="whiteAlpha.100" />
            <MenuItem
              icon={<Icon as={RiShieldUserLine} boxSize={4} />}
              bg="transparent"
              color="whiteAlpha.800"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
              fontSize="sm"
            >
              Security Profile
            </MenuItem>
            <MenuItem
              icon={<Icon as={RiUserSettingsLine} boxSize={4} />}
              bg="transparent"
              color="whiteAlpha.800"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
              fontSize="sm"
            >
              Account Settings
            </MenuItem>
            <MenuDivider borderColor="whiteAlpha.100" />
            <MenuItem
              icon={<Icon as={RiLogoutBoxRLine} boxSize={4} />}
              onClick={onLogout}
              bg="transparent"
              color="red.400"
              _hover={{ bg: "red.500", color: "white" }}
              fontSize="sm"
              fontWeight="medium"
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;

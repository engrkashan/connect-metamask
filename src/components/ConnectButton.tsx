import { Box, Button, Text, HStack, Icon } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { RiWallet3Line } from "react-icons/ri";
import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      bg="rgba(255, 255, 255, 0.03)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p="1"
      transition="all 0.2s"
      _hover={{ borderColor: "blue.500" }}
    >
      <Box px="3">
        <Text color="whiteAlpha.700" fontSize="xs" fontWeight="bold">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="blue.500"
        color="white"
        _hover={{
          bg: "blue.400",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)",
        }}
        _active={{ bg: "blue.600" }}
        borderRadius="lg"
        px={3}
        height="32px"
        ml={2}
      >
        <Text fontSize="xs" fontWeight="black" mr="2">
          {account && `${account.slice(0, 6)}...${account.slice(-4)}`}
        </Text>
        <Box p="0.5" bg="white" borderRadius="full">
          <Identicon />
        </Box>
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      leftIcon={<Icon as={RiWallet3Line} />}
      bg="blue.500"
      color="white"
      fontSize="sm"
      fontWeight="bold"
      borderRadius="xl"
      px={6}
      _hover={{
        bg: "blue.400",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 20px rgba(66, 153, 225, 0.4)",
      }}
      _active={{
        bg: "blue.600",
      }}
    >
      Connect Vault Wallet
    </Button>
  );
}

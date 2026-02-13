import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { RiShieldUserLine, RiHistoryLine, RiWalletLine } from "react-icons/ri";
import Identicon from "./Identicon";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function AccountModal({ isOpen, onClose }: Props) {
  const { account, deactivate, chainId } = useEthers();
  const balance = useEtherBalance(account);
  const toast = useToast();

  function handleDeactivateAccount() {
    deactivate();
    onClose();
    toast({
      title: "Wallet Disconnected",
      description: "You have securely closed your wallet bridge.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast({
        title: "Address Copied",
        status: "success",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(15px)" bg="blackAlpha.700" />
      <ModalContent
        bg="#0F172A"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="3xl"
        p={2}
      >
        <ModalHeader
          color="white"
          px={6}
          pt={6}
          fontSize="xl"
          fontWeight="bold"
        >
          Vault Authentication
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.500" top={6} right={6} />
        <ModalBody pt={2} px={6}>
          <Box
            borderRadius="2xl"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
            mb={6}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <HStack spacing={2}>
                <Icon as={RiWalletLine} color="blue.400" />
                <Text
                  color="whiteAlpha.600"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  MetaMask Secure Bridge
                </Text>
              </HStack>
              <Button
                variant="outline"
                size="xs"
                colorScheme="red"
                borderRadius="lg"
                fontSize="11px"
                px={3}
                onClick={handleDeactivateAccount}
              >
                Disconnect
              </Button>
            </Flex>

            <Flex alignItems="center" mb={6}>
              <Box
                p={1}
                borderRadius="full"
                border="2px solid"
                borderColor="blue.500"
              >
                <Identicon />
              </Box>
              <VStack align="flex-start" ml={3} spacing={0}>
                <Text color="white" fontSize="lg" fontWeight="bold">
                  {account && `${account.slice(0, 10)}...${account.slice(-8)}`}
                </Text>
                <Text color="whiteAlpha.500" fontSize="xs">
                  {balance && parseFloat(formatEther(balance)).toFixed(4)} ETH •{" "}
                  {chainId === 1 ? "Ethereum Mainnet" : "Connected Network"}
                </Text>
              </VStack>
            </Flex>

            <HStack spacing={4}>
              <Button
                variant="ghost"
                color="blue.400"
                fontWeight="bold"
                fontSize="xs"
                leftIcon={<CopyIcon />}
                onClick={handleCopy}
                _hover={{ bg: "whiteAlpha.100" }}
                h="32px"
              >
                Copy Address
              </Button>
              <Link
                href={`https://etherscan.io/address/${account}`}
                isExternal
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  variant="ghost"
                  color="blue.400"
                  fontWeight="bold"
                  fontSize="xs"
                  leftIcon={<ExternalLinkIcon />}
                  _hover={{ bg: "whiteAlpha.100" }}
                  h="32px"
                >
                  View on Explorer
                </Button>
              </Link>
            </HStack>
          </Box>

          <VStack align="stretch" spacing={4}>
            <HStack color="whiteAlpha.700">
              <Icon as={RiHistoryLine} />
              <Text fontSize="sm" fontWeight="medium">
                Recent Transactions
              </Text>
            </HStack>
            <Text
              color="whiteAlpha.400"
              textAlign="center"
              py={4}
              fontSize="xs"
              border="1px dashed"
              borderColor="whiteAlpha.100"
              borderRadius="xl"
            >
              No recent vault activity detected.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter p={6}>
          <Text
            color="whiteAlpha.500"
            fontSize="xs"
            textAlign="center"
            w="full"
          >
            Bridge secured by end-to-end encryption.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

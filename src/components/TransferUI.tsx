import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  useToast,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import {
  RiWallet3Line,
  RiArrowRightUpLine,
  RiCheckboxCircleLine,
  RiShieldCheckLine,
} from "react-icons/ri";

type Props = {
  amount: string;
  onTransferComplete: () => void;
};

export default function TransferUI({ amount, onTransferComplete }: Props) {
  const { account } = useEthers();
  const toast = useToast();
  const [isTransferring, setIsTransferring] = useState(false);
  const [step, setStep] = useState(1); // 1: Ready, 2: Transferring, 3: Complete

  const handleTransfer = () => {
    if (!account) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to initiate transfer.",
        status: "warning",
      });
      return;
    }

    setIsTransferring(true);
    setStep(2);

    // Simulate on-chain settlement
    setTimeout(() => {
      setIsTransferring(false);
      setStep(3);
      toast({
        title: "Transfer Broadcasted",
        description: "Funds are settling on-chain and will reflect shortly.",
        status: "success",
      });

      setTimeout(() => {
        onTransferComplete();
      }, 2000);
    }, 4000);
  };

  return (
    <Box
      w="full"
      p={8}
      bgGradient="linear(to-br, gray.900, blue.900)"
      borderRadius="3xl"
      border="1px solid"
      borderColor="blue.500"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        <HStack justify="space-between">
          <Badge
            colorScheme="blue"
            variant="solid"
            borderRadius="md"
            px={3}
            py={1}
            fontSize="10px"
          >
            Step 2: Deployment
          </Badge>
          {step === 3 && (
            <Icon as={RiCheckboxCircleLine} color="green.400" boxSize={6} />
          )}
        </HStack>

        <VStack align="start" spacing={1}>
          <Text color="whiteAlpha.600" fontSize="xs" fontWeight="bold">
            AVAILABLE FOR DEPLOYMENT
          </Text>
          <Text fontSize="4xl" fontWeight="black" color="white">
            ${Number(amount).toLocaleString()}
          </Text>
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        <Box
          p={4}
          bg="whiteAlpha.50"
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.100"
        >
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Icon as={RiWallet3Line} color="blue.400" />
                <Text fontSize="sm" fontWeight="bold">
                  Destination Wallet
                </Text>
              </HStack>
              {account ? (
                <Badge colorScheme="green" variant="subtle">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </Badge>
              ) : (
                <Badge colorScheme="red" variant="subtle">
                  Disconnected
                </Badge>
              )}
            </HStack>

            {step === 2 ? (
              <Flex align="center" justify="center" direction="column" py={4}>
                <CircularProgress
                  isIndeterminate
                  color="blue.400"
                  size="80px"
                  thickness="8px"
                >
                  <CircularProgressLabel>
                    <Icon as={RiShieldCheckLine} color="blue.400" boxSize={6} />
                  </CircularProgressLabel>
                </CircularProgress>
                <Text mt={4} fontSize="sm" fontWeight="bold" color="blue.400">
                  Settling On-Chain...
                </Text>
                <Text fontSize="2xs" color="whiteAlpha.500" mt={1}>
                  Vaultic Intelligence Node Routing
                </Text>
              </Flex>
            ) : step === 3 ? (
              <VStack py={4}>
                <Text fontSize="lg" fontWeight="black" color="green.400">
                  Transaction Verified
                </Text>
                <Text fontSize="xs" color="whiteAlpha.600">
                  Asset metadata updated. Refreshing treasury...
                </Text>
              </VStack>
            ) : (
              <Button
                rightIcon={<RiArrowRightUpLine />}
                colorScheme="blue"
                size="lg"
                h="64px"
                borderRadius="2xl"
                onClick={handleTransfer}
                isDisabled={!account || parseFloat(amount) <= 0}
                _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                transition="all 0.2s"
              >
                Transfer to Wallet
              </Button>
            )}
          </VStack>
        </Box>

        <Text fontSize="10px" color="whiteAlpha.400" textAlign="center">
          Secure Cross-Chain Protocol • Audited by Vaultic Security
        </Text>
      </VStack>
    </Box>
  );
}

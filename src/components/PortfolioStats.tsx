import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { RiArrowUpSLine, RiGlobalLine, RiWallet3Line } from "react-icons/ri";

export default function PortfolioStats() {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [liveYield, setLiveYield] = useState(8.42);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveYield((prev) => {
        const delta = (Math.random() - 0.5) * 0.01;
        return parseFloat((prev + delta).toFixed(2));
      });
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
      <Box
        p={5}
        bg="whiteAlpha.50"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", borderColor: "blue.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="blue.500" borderRadius="xl">
              <Icon as={RiWallet3Line} color="white" />
            </Box>
            <Text
              fontSize="xs"
              color="whiteAlpha.600"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Vault Balance
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black" color="white">
              {etherBalance
                ? Number(formatEther(etherBalance)).toFixed(4)
                : "0.0000"}{" "}
              ETH
            </StatNumber>
            <StatHelpText color="whiteAlpha.500" fontSize="xs">
              Institutional Tier • Active
            </StatHelpText>
          </Stat>
        </VStack>
      </Box>

      <Box
        p={5}
        bg="whiteAlpha.50"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", borderColor: "green.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="green.500" borderRadius="xl">
              <Icon as={RiGlobalLine} color="white" />
            </Box>
            <Text
              fontSize="xs"
              color="whiteAlpha.600"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Total Deployed
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black" color="white">
              $1,240,000.00
            </StatNumber>
            <StatHelpText color="green.300" fontSize="xs">
              <StatArrow type="increase" />
              1.2% Gain Today
            </StatHelpText>
          </Stat>
        </VStack>
      </Box>

      <Box
        p={5}
        bg="whiteAlpha.50"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor={pulse ? "purple.400" : "whiteAlpha.100"}
        borderRadius="2xl"
        transition="all 0.5s"
        _hover={{ transform: "translateY(-4px)", borderColor: "purple.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="purple.500" borderRadius="xl">
              <Icon as={RiArrowUpSLine} color="white" />
            </Box>
            <Text
              fontSize="xs"
              color="whiteAlpha.600"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Live Yield (APY)
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black" color="purple.300">
              {liveYield}%
            </StatNumber>
            <StatHelpText color="whiteAlpha.500" fontSize="xs">
              Real-time Optimizer Engine
            </StatHelpText>
          </Stat>
        </VStack>
      </Box>
    </SimpleGrid>
  );
}

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
import { FaArrowUp, FaGlobe, FaWallet } from "react-icons/fa";

export default function PortfolioStats() {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
      <Box
        p={5}
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", borderColor: "blue.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="blue.500" borderRadius="xl">
              <Icon as={FaWallet} color="white" />
            </Box>
            <Text fontSize="sm" color="whiteAlpha.600" fontWeight="bold">
              ETH Balance
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black">
              {etherBalance
                ? Number(formatEther(etherBalance)).toFixed(4)
                : "0.0000"}{" "}
              ETH
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              2.3% vs last week
            </StatHelpText>
          </Stat>
        </VStack>
      </Box>

      <Box
        p={5}
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", borderColor: "green.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="green.500" borderRadius="xl">
              <Icon as={FaGlobe} color="white" />
            </Box>
            <Text fontSize="sm" color="whiteAlpha.600" fontWeight="bold">
              Total Deployed
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black">
              $1,240,000.00
            </StatNumber>
            <StatHelpText color="green.300">
              <StatArrow type="increase" />
              Institutional Ready
            </StatHelpText>
          </Stat>
        </VStack>
      </Box>

      <Box
        p={5}
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", borderColor: "purple.500" }}
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={3}>
            <Box p={2} bg="purple.500" borderRadius="xl">
              <Icon as={FaArrowUp} color="white" />
            </Box>
            <Text fontSize="sm" color="whiteAlpha.600" fontWeight="bold">
              Est. Yield (APY)
            </Text>
          </HStack>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="black">
              8.42%
            </StatNumber>
            <StatHelpText>Optimized via Treasury Card</StatHelpText>
          </Stat>
        </VStack>
      </Box>
    </SimpleGrid>
  );
}

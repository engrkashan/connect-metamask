import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowRightLine,
  RiHistoryLine,
  RiFundsLine,
  RiExchangeLine,
  RiShieldFlashLine,
  RiInboxArchiveLine,
} from "react-icons/ri";
import PortfolioStats from "./PortfolioStats";

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "Investment",
    amount: "$1,000,000",
    status: "Success",
    date: "2026-02-07",
  },
  {
    id: 2,
    type: "Yield Harvest",
    amount: "2.4 ETH",
    status: "Success",
    date: "2026-02-05",
  },
  {
    id: 3,
    type: "Vault Sync",
    amount: "--",
    status: "Pending",
    date: "2026-02-04",
  },
];

type Props = {
  onViewChange: (view: string) => void;
  onOptimize: (amount: string) => void;
  purchasedBalance: string;
};

const DashboardOverview: React.FC<Props> = ({
  onViewChange,
  onOptimize,
  purchasedBalance,
}) => {
  const [ethPrice, setEthPrice] = useState(2842.12);

  useEffect(() => {
    const interval = setInterval(() => {
      setEthPrice((prev: number) => {
        const delta = (Math.random() - 0.5) * 2;
        return parseFloat((prev + delta).toFixed(2));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack align="start" spacing={10} animation="fadeIn 0.5s ease-out">
      <VStack align="start" spacing={2}>
        <Heading size="xl" fontWeight="black" letterSpacing="tight">
          Institutional Wealth Overview
        </Heading>
        <Text color="whiteAlpha.600" fontSize="md">
          Real-time treasury visibility and portfolio distribution
        </Text>
      </VStack>

      <PortfolioStats />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
        <Box
          p={6}
          bg="whiteAlpha.50"
          backdropFilter="blur(10px)"
          borderRadius="3xl"
          border="1px solid"
          borderColor="whiteAlpha.100"
          transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
          _hover={{
            transform: "translateY(-5px)",
            borderColor: "blue.400",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Flex justify="space-between" mb={6} align="center">
            <HStack spacing={3}>
              <Icon as={RiHistoryLine} color="blue.400" boxSize={5} />
              <Heading size="sm">Recent Activity</Heading>
            </HStack>
            <Text
              fontSize="xs"
              color="blue.400"
              cursor="pointer"
              _hover={{ textDecor: "underline" }}
              onClick={() => onViewChange("reports")}
            >
              View All
            </Text>
          </Flex>

          <Table variant="unstyled" size="sm">
            <Tbody>
              {RECENT_ACTIVITY.map((act) => (
                <Tr
                  key={act.id}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                  _last={{ borderBottom: "none" }}
                >
                  <Td px={0} py={4}>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="sm">
                        {act.type}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.500">
                        {act.date}
                      </Text>
                    </VStack>
                  </Td>
                  <Td py={4} fontWeight="bold">
                    {act.amount}
                  </Td>
                  <Td py={4} textAlign="right">
                    <Badge
                      colorScheme={
                        act.status === "Success" ? "green" : "orange"
                      }
                      variant="subtle"
                      borderRadius="md"
                      px={2}
                    >
                      {act.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <VStack spacing={8} w="full">
          <Box
            p={6}
            w="full"
            bg="whiteAlpha.50"
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
            _hover={{
              transform: "translateY(-5px)",
              borderColor: "blue.400",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Flex justify="space-between" mb={4} align="center">
              <HStack spacing={3}>
                <Icon as={RiInboxArchiveLine} color="blue.400" boxSize={5} />
                <Heading size="sm">Internal Treasury</Heading>
              </HStack>
              <Badge
                colorScheme="blue"
                variant="solid"
                borderRadius="full"
                px={3}
              >
                Settling
              </Badge>
            </Flex>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="black" color="white">
                ${parseFloat(purchasedBalance).toLocaleString()}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500">
                Assets ready for on-chain deployment
              </Text>
            </VStack>
            {parseFloat(purchasedBalance) > 0 && (
              <Button
                mt={4}
                size="sm"
                colorScheme="blue"
                variant="outline"
                w="full"
                borderRadius="xl"
                onClick={() => onViewChange("invest")}
              >
                Complete Deployment
              </Button>
            )}
          </Box>
          <Box
            p={6}
            w="full"
            bg="whiteAlpha.50"
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <HStack justify="space-between" mb={4}>
              <HStack spacing={3}>
                <Icon as={RiFundsLine} color="blue.400" />
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="whiteAlpha.600"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Market Pulse
                </Text>
              </HStack>
              <Badge
                colorScheme="green"
                variant="subtle"
                borderRadius="full"
                px={3}
                fontSize="10px"
              >
                Live
              </Badge>
            </HStack>
            <SimpleGrid columns={2} spacing={4}>
              <VStack align="start" spacing={0}>
                <Text fontSize="2xs" color="whiteAlpha.500" fontWeight="bold">
                  ETH / USD
                </Text>
                <Text fontSize="md" fontWeight="black" color="white">
                  ${ethPrice.toLocaleString()}
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text fontSize="2xs" color="whiteAlpha.500" fontWeight="bold">
                  GAS PRICE
                </Text>
                <HStack color="green.300">
                  <Icon as={RiExchangeLine} />
                  <Text fontSize="lg" fontWeight="black">
                    12 Gwei
                  </Text>
                </HStack>
              </VStack>
            </SimpleGrid>
          </Box>
          <Box
            p={8}
            w="full"
            bgGradient="linear(to-br, blue.600, blue.900)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="blue.400"
            position="relative"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 12px 48px rgba(66, 153, 225, 0.4)",
            }}
          >
            <VStack
              align="start"
              spacing={6}
              h="full"
              justify="center"
              position="relative"
              zIndex={1}
            >
              <Heading size="md" color="white">
                Treasury Deployment Ready
              </Heading>
              <Text color="whiteAlpha.800" fontSize="sm" maxW="300px">
                Strategic $1M optimization slot available. Secure institutional
                yield now.
              </Text>
              <Button
                rightIcon={<RiArrowRightLine />}
                bg="white"
                color="blue.600"
                _hover={{ bg: "blue.50", transform: "translateX(4px)" }}
                borderRadius="xl"
                fontWeight="black"
                size="lg"
                onClick={() => onOptimize("1000000")}
              >
                Optimize Now
              </Button>
            </VStack>

            <Icon
              as={RiShieldFlashLine}
              position="absolute"
              right="-5%"
              bottom="-5%"
              boxSize="180px"
              opacity="0.1"
              transform="rotate(-15deg)"
            />
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

export default DashboardOverview;

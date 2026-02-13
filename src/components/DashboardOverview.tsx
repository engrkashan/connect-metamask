import React from "react";
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
import { FaArrowRight, FaHistory } from "react-icons/fa";
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
};

const DashboardOverview: React.FC<Props> = ({ onViewChange }) => {
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
        >
          <Flex justify="space-between" mb={6} align="center">
            <HStack spacing={3}>
              <Icon as={FaHistory} color="blue.400" />
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

        <Box
          p={8}
          bgGradient="linear(to-br, blue.600, blue.900)"
          borderRadius="3xl"
          border="1px solid"
          borderColor="blue.400"
          position="relative"
          overflow="hidden"
        >
          <VStack align="start" spacing={6} h="full" justify="center">
            <Heading size="md" color="white">
              Secure High-Yield Deployment
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm" maxW="300px">
              Your treasury card is ready for a $1,000,000 deployment. Optimize
              your idle capital now.
            </Text>
            <Button
              rightIcon={<FaArrowRight />}
              colorScheme="whiteAlpha"
              variant="solid"
              bg="white"
              color="blue.600"
              borderRadius="xl"
              fontWeight="black"
            >
              Optimize Now
            </Button>
          </VStack>

          <Icon
            as={FaArrowRight}
            position="absolute"
            right="-10%"
            bottom="-10%"
            boxSize="200px"
            opacity="0.1"
            transform="rotate(-45deg)"
          />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default DashboardOverview;

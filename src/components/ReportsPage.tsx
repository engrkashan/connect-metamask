import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { RiSearchLine, RiFileList3Line, RiDownload2Line } from "react-icons/ri";

const REPORTS_DATA = [
  {
    id: "#VAU-001",
    type: "Investment",
    date: "2026-02-07 14:30",
    amount: "$1,000,000",
    status: "Completed",
    method: "Institutional Wire",
  },
  {
    id: "#VAU-002",
    type: "Yield Harvest",
    date: "2026-02-05 09:15",
    amount: "2.4 ETH",
    status: "Completed",
    method: "Smart Contract",
  },
  {
    id: "#VAU-003",
    type: "Vault Sync",
    date: "2026-02-04 18:20",
    amount: "--",
    status: "Pending",
    method: "Automated",
  },
  {
    id: "#VAU-004",
    type: "Withdrawal",
    date: "2026-02-01 11:05",
    amount: "$250,000",
    status: "Completed",
    method: "External Wallet",
  },
  {
    id: "#VAU-005",
    type: "Portfolio Rebalance",
    date: "2026-01-28 16:40",
    amount: "--",
    status: "Failed",
    method: "Flash Loan",
  },
  {
    id: "#VAU-006",
    type: "Investment",
    date: "2026-01-25 10:00",
    amount: "$500,000",
    status: "Completed",
    method: "Institutional Wire",
  },
];

const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = REPORTS_DATA.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <VStack spacing={8} w="full" align="stretch" py={4}>
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        p={8}
        borderRadius="3xl"
        border="1px solid rgba(255, 255, 255, 0.08)"
      >
        <Flex justify="space-between" align="center" mb={8}>
          <HStack spacing={4}>
            <Icon as={RiFileList3Line} color="blue.400" boxSize={6} />
            <Heading size="md" color="white">
              Activity Ledger
            </Heading>
          </HStack>
          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <RiSearchLine color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search ledger..."
                bg="whiteAlpha.50"
                border="none"
                _focus={{ bg: "whiteAlpha.100" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Box
              cursor="pointer"
              p={2}
              borderRadius="lg"
              _hover={{ bg: "whiteAlpha.100" }}
            >
              <Icon as={RiDownload2Line} color="whiteAlpha.600" boxSize={5} />
            </Box>
          </HStack>
        </Flex>

        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr borderBottom="2px solid rgba(255, 255, 255, 0.05)">
              <Th color="whiteAlpha.400" border="none">
                Operation ID
              </Th>
              <Th color="whiteAlpha.400" border="none">
                Type
              </Th>
              <Th color="whiteAlpha.400" border="none">
                Method
              </Th>
              <Th color="whiteAlpha.400" border="none">
                Date & Time
              </Th>
              <Th color="whiteAlpha.400" border="none">
                Value
              </Th>
              <Th color="whiteAlpha.400" border="none" isNumeric>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((row) => (
              <Tr
                key={row.id}
                _hover={{ bg: "whiteAlpha.50" }}
                transition="all 0.2s"
                borderBottom="1px solid rgba(255, 255, 255, 0.03)"
              >
                <Td borderColor="transparent">
                  <Text color="blue.400" fontSize="sm" fontWeight="bold">
                    {row.id}
                  </Text>
                </Td>
                <Td borderColor="transparent">
                  <Text color="white" fontSize="sm">
                    {row.type}
                  </Text>
                </Td>
                <Td borderColor="transparent">
                  <Text
                    color="whiteAlpha.600"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {row.method}
                  </Text>
                </Td>
                <Td borderColor="transparent">
                  <Text color="whiteAlpha.600" fontSize="xs">
                    {row.date}
                  </Text>
                </Td>
                <Td borderColor="transparent">
                  <Text color="white" fontSize="sm" fontWeight="bold">
                    {row.amount}
                  </Text>
                </Td>
                <Td borderColor="transparent" isNumeric>
                  <Badge
                    colorScheme={
                      row.status === "Completed"
                        ? "green"
                        : row.status === "Pending"
                          ? "orange"
                          : "red"
                    }
                    variant="subtle"
                    px={3}
                    borderRadius="full"
                    textTransform="uppercase"
                    fontSize="10px"
                  >
                    {row.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default ReportsPage;

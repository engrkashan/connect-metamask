import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaChevronRight,
  FaLock,
  FaRegBuilding,
  FaUniversity,
  FaWallet,
} from "react-icons/fa";
import StripeCorporateCheckout from "./StripeCorporateCheckout";
import TransakOnramp from "./TransakOnramp";

export default function InvestPage() {
  const [amount, setAmount] = useState("");
  const toast = useToast();
  const [isBankLinking, setIsBankLinking] = useState(false);
  const [isBankLinked, setIsBankLinked] = useState(false);

  const PRESETS_INSTITUTIONAL = ["50000", "250000", "500000", "1000000"];

  const handleBankLink = () => {
    setIsBankLinking(true);
    setTimeout(() => {
      setIsBankLinking(false);
      setIsBankLinked(true);
      toast({
        title: "Bank Sync Successful",
        status: "success",
        duration: 3000,
      });
    }, 2000);
  };

  const handleBankConfirm = () => {
    toast({
      title: "Processing Deposit",
      description: `$${amount} is being synced.`,
      status: "info",
    });
  };

  return (
    <VStack align="start" spacing={8} animation="fadeIn 0.5s ease-out">
      <VStack align="start" spacing={2}>
        <Breadcrumb
          spacing="8px"
          separator={<FaChevronRight color="gray.500" fontSize="10px" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink color="blue.400" fontSize="xs" fontWeight="bold">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="whiteAlpha.600" fontSize="xs">
              Deployment Center
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading size="lg" fontWeight="black" letterSpacing="tight">
          Institutional Deployment
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm">
          Select your capital source for direct asset allocation
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
        <Box gridColumn={{ lg: "span 2" }}>
          <Box
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            p={8}
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList mb={8} bg="blackAlpha.300" p={1.5} borderRadius="2xl">
                <Tab px={6}>Corporate Card</Tab>
                <Tab px={6}>Direct Bank Pull</Tab>
                <Tab px={6}>Retail Card</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <VStack spacing={8} align="stretch">
                    <VStack align="start" spacing={4}>
                      <FormControl>
                        <FormLabel
                          color="whiteAlpha.500"
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                        >
                          Capital Amount (USD)
                        </FormLabel>
                        <Input
                          placeholder="1,000,000.00"
                          type="number"
                          h="72px"
                          fontSize="3xl"
                          bg="blackAlpha.400"
                          borderColor="whiteAlpha.200"
                          borderRadius="2xl"
                          fontWeight="black"
                          color="blue.300"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </FormControl>
                      <SimpleGrid columns={4} spacing={3} w="full">
                        {PRESETS_INSTITUTIONAL.map((p) => (
                          <Button
                            key={p}
                            variant="outline"
                            size="sm"
                            borderRadius="xl"
                            onClick={() => setAmount(p)}
                            borderColor="whiteAlpha.200"
                            color="white"
                            _hover={{ bg: "whiteAlpha.100" }}
                          >
                            ${Number(p).toLocaleString()}
                          </Button>
                        ))}
                      </SimpleGrid>
                    </VStack>

                    <StripeCorporateCheckout
                      amount={amount}
                      onSuccess={() => {}}
                    />
                  </VStack>
                </TabPanel>

                <TabPanel p={0}>
                  <VStack spacing={8} align="stretch">
                    <FormControl>
                      <FormLabel
                        color="whiteAlpha.500"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        Instant Bank Deployment
                      </FormLabel>
                      <Input
                        placeholder="500,000.00"
                        h="72px"
                        fontSize="3xl"
                        bg="blackAlpha.400"
                        borderRadius="2xl"
                        fontWeight="black"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </FormControl>

                    {!isBankLinked ? (
                      <Button
                        leftIcon={<FaLock />}
                        colorScheme="blue"
                        size="lg"
                        h="80px"
                        borderRadius="3xl"
                        fontSize="lg"
                        fontWeight="bold"
                        onClick={handleBankLink}
                        isLoading={isBankLinking}
                      >
                        Connect Treasury Account
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<FaUniversity />}
                        colorScheme="green"
                        size="lg"
                        h="80px"
                        borderRadius="3xl"
                        fontSize="lg"
                        fontWeight="black"
                        onClick={handleBankConfirm}
                      >
                        Verify & Confirm Pull
                      </Button>
                    )}
                  </VStack>
                </TabPanel>

                <TabPanel p={0}>
                  <VStack spacing={6} align="stretch">
                    <Input
                      placeholder="Amount in USD"
                      h="64px"
                      bg="blackAlpha.400"
                      borderRadius="xl"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <TransakOnramp amount={amount} onSuccess={() => {}} />
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        <VStack spacing={6}>
          <Box
            p={6}
            bg="blue.900"
            borderRadius="3xl"
            border="1px solid"
            borderColor="blue.700"
            w="full"
          >
            <VStack align="start" spacing={4}>
              <Badge colorScheme="blue" p={1} borderRadius="md" variant="solid">
                <Icon as={FaRegBuilding} mr={2} /> Institutional Support
              </Badge>
              <Text fontSize="sm" fontWeight="bold">
                Direct Concierge Service
              </Text>
              <Text fontSize="xs" color="blue.100" lineHeight="tall">
                For transactions exceeding $5M, please contact our institutional
                desk for specialized custody and liquidity routing.
              </Text>
              <Button
                w="full"
                variant="outline"
                size="sm"
                colorScheme="blue"
                borderRadius="xl"
              >
                Contact Partner Desk
              </Button>
            </VStack>
          </Box>

          <Box
            p={6}
            bg="whiteAlpha.50"
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            w="full"
          >
            <VStack align="start" spacing={4}>
              <HStack>
                <Icon as={FaWallet} color="whiteAlpha.600" />
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="whiteAlpha.600"
                  textTransform="uppercase"
                >
                  Live Market Info
                </Text>
              </HStack>
              <VStack align="stretch" w="full" spacing={3}>
                <Flex justify="space-between">
                  <Text fontSize="xs">ETH / USD</Text>
                  <Text fontSize="xs" fontWeight="bold">
                    $2,842.12
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs">Gas (Gwei)</Text>
                  <Text fontSize="xs" fontWeight="bold" color="green.300">
                    12 Gwei
                  </Text>
                </Flex>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
}

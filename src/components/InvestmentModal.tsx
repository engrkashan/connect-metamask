import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useToast,
  HStack,
  Box,
  SimpleGrid,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useEthers, useSendTransaction } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaEthereum,
  FaInfoCircle,
  FaRegBuilding,
  FaUniversity,
  FaLock,
} from "react-icons/fa";
import TransakOnramp from "./TransakOnramp";
import StripeCorporateCheckout from "./StripeCorporateCheckout";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DESTINATION_ADDRESS = "0x0000000000000000000000000000000000000000";

const PRESETS_USD = ["100", "500", "1000", "5000"];
const PRESETS_ETH = ["0.05", "0.1", "0.5", "1.0"];
const PRESETS_INSTITUTIONAL = ["50000", "250000", "500000", "1000000"];

export default function InvestmentModal({ isOpen, onClose }: Props) {
  const { account } = useEthers();
  const { sendTransaction, state } = useSendTransaction();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [isBankLinking, setIsBankLinking] = useState(false);
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [directType, setDirectType] = useState(0); // 0: Card, 1: Bank

  const handleInvestETH = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount of ETH.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendTransaction({
        to: DESTINATION_ADDRESS,
        value: utils.parseEther(amount),
      });
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  const simulateBankLink = () => {
    setIsBankLinking(true);
    setTimeout(() => {
      setIsBankLinking(false);
      setIsBankLinked(true);
      toast({
        title: "Bank Account Linked",
        description:
          "Your corporate account is now ready for direct high-value deployment.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  const handleDirectDeployment = () => {
    toast({
      title: "Processing Institutional Deployment",
      description: "Pulling liquidity from linked account. ETA: 2-3 Minutes.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    setTimeout(() => {
      toast({
        title: "Deployment Successful",
        description: `$${amount} successfully deployed to vault.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }, 3000);
  };

  useEffect(() => {
    if (state.status === "Success") {
      toast({
        title: "Investment Successful",
        description: `Successfully sent ${amount} ETH.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      // Reset form
      setName("");
      setEmail("");
      setAmount("");
    } else if (state.status === "Exception" || state.status === "Fail") {
      toast({
        title: "Transaction Failed",
        description:
          state.errorMessage || "An error occurred during the transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [state, toast, onClose, amount]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay
        backdropFilter="blur(16px) saturate(180%)"
        bg="blackAlpha.700"
      />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="whiteAlpha.200"
        borderRadius="3xl"
        color="white"
        p={4}
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.8)"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-20%"
          left="-10%"
          width="140%"
          height="50%"
          bgGradient="radial(circle, blue.900 0%, transparent 70%)"
          opacity="0.4"
          zIndex="0"
          pointerEvents="none"
        />

        <ModalHeader
          zIndex="1"
          px={4}
          pt={6}
          pb={2}
          fontSize="3xl"
          fontWeight="extrabold"
          textAlign="center"
          letterSpacing="tight"
        >
          Wealth Portal
          <Text fontSize="sm" color="whiteAlpha.600" fontWeight="medium" mt={1}>
            Embedded Institutional Infrastructure
          </Text>
        </ModalHeader>
        <ModalCloseButton
          top={6}
          right={6}
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
            bg: "whiteAlpha.100",
          }}
        />
        <ModalBody zIndex="1" pt={4} px={4}>
          <Tabs
            isFitted
            variant="unstyled"
            onChange={(index) => {
              setPaymentMethod(index);
              setAmount("");
            }}
          >
            <TabList
              mb="2em"
              bg="whiteAlpha.50"
              borderRadius="2xl"
              p={1.5}
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Tab
                borderRadius="xl"
                color="whiteAlpha.600"
                transition="all 0.3s"
                _selected={{ color: "white", bg: "blue.600", boxShadow: "lg" }}
              >
                <Icon as={FaEthereum} mr={2} /> Native
              </Tab>
              <Tab
                borderRadius="xl"
                color="whiteAlpha.600"
                transition="all 0.3s"
                _selected={{ color: "white", bg: "blue.600", boxShadow: "lg" }}
              >
                <Icon as={FaCreditCard} mr={2} /> Retail
              </Tab>
              <Tab
                borderRadius="xl"
                color="whiteAlpha.600"
                transition="all 0.3s"
                _selected={{ color: "white", bg: "blue.600", boxShadow: "lg" }}
              >
                <Icon as={FaRegBuilding} mr={2} /> Direct ($1M+)
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <VStack spacing={4}>
                    <FormControl id="name">
                      <FormLabel
                        color="whiteAlpha.500"
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        ml={1}
                      >
                        Full Name
                      </FormLabel>
                      <Input
                        placeholder="John Doe"
                        bg="whiteAlpha.50"
                        h="56px"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                        borderRadius="xl"
                        _hover={{ borderColor: "whiteAlpha.300" }}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px #4299e1",
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl id="amount" isRequired>
                      <FormLabel
                        color="whiteAlpha.500"
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        ml={1}
                      >
                        Deployment Amount (ETH)
                      </FormLabel>
                      <Input
                        placeholder="0.00"
                        type="number"
                        bg="whiteAlpha.50"
                        h="56px"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                        borderRadius="xl"
                        _hover={{ borderColor: "whiteAlpha.300" }}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px #4299e1",
                        }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fontSize="lg"
                        fontWeight="bold"
                      />
                    </FormControl>

                    <SimpleGrid columns={4} spacing={3} width="full">
                      {PRESETS_ETH.map((p) => (
                        <Button
                          key={p}
                          variant="ghost"
                          size="sm"
                          bg="whiteAlpha.50"
                          _hover={{ bg: "whiteAlpha.200" }}
                          onClick={() => setAmount(p)}
                          borderRadius="lg"
                          fontSize="xs"
                        >
                          {p} ETH
                        </Button>
                      ))}
                    </SimpleGrid>
                  </VStack>

                  <Box
                    p={4}
                    bg="rgba(144, 205, 244, 0.1)"
                    borderRadius="2xl"
                    border="1px dashed"
                    borderColor="blue.700"
                  >
                    <HStack spacing={3}>
                      <Icon as={FaInfoCircle} color="blue.400" />
                      <Text fontSize="xs" color="blue.100">
                        Funds will be securely transmitted from your connected
                        wallet:
                        <Text
                          as="span"
                          fontWeight="bold"
                          color="blue.300"
                          ml={1}
                        >
                          {account?.slice(0, 6)}...{account?.slice(-4)}
                        </Text>
                      </Text>
                    </HStack>
                  </Box>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    h="64px"
                    width="full"
                    borderRadius="2xl"
                    onClick={handleInvestETH}
                    isLoading={state.status === "Mining"}
                    loadingText="Processing Transaction..."
                    fontSize="md"
                    fontWeight="extraBold"
                    boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.39)"
                  >
                    Authorize Investment
                  </Button>
                </VStack>
              </TabPanel>

              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <FormControl id="amount-card" isRequired>
                    <FormLabel
                      color="whiteAlpha.500"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      ml={1}
                    >
                      Amount in USD
                    </FormLabel>
                    <Input
                      placeholder="0.00"
                      type="number"
                      bg="whiteAlpha.50"
                      h="56px"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      borderRadius="xl"
                      _hover={{ borderColor: "whiteAlpha.300" }}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px #4299e1",
                      }}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fontSize="lg"
                      fontWeight="bold"
                    />
                  </FormControl>

                  <SimpleGrid columns={4} spacing={3} width="full" mb={2}>
                    {PRESETS_USD.map((p) => (
                      <Button
                        key={p}
                        variant="ghost"
                        size="sm"
                        bg="whiteAlpha.50"
                        _hover={{ bg: "whiteAlpha.200" }}
                        onClick={() => setAmount(p)}
                        borderRadius="lg"
                        fontSize="xs"
                      >
                        ${p}
                      </Button>
                    ))}
                  </SimpleGrid>

                  <TransakOnramp amount={amount} onSuccess={onClose} />
                </VStack>
              </TabPanel>

              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <Box
                    p={5}
                    bg="rgba(144, 205, 244, 0.1)"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="blue.700"
                  >
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Badge colorScheme="blue" p={1} borderRadius="md">
                          <Icon as={FaRegBuilding} />
                        </Badge>
                        <Text fontWeight="bold" fontSize="sm">
                          Direct Institutional Gateway
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="blue.100">
                        High-limit deployments ($1M+) via Stripe Corporate Card
                        or Direct Bank Link.
                      </Text>
                    </VStack>
                  </Box>

                  <Tabs
                    isFitted
                    variant="soft-rounded"
                    colorScheme="blue"
                    onChange={(idx) => setDirectType(idx)}
                  >
                    <TabList mb={4} bg="whiteAlpha.50" p={1} borderRadius="2xl">
                      <Tab fontSize="xs">Corporate Card</Tab>
                      <Tab fontSize="xs">Direct Bank Link</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel p={0}>
                        <VStack spacing={6}>
                          <FormControl id="amount-direct-card" isRequired>
                            <FormLabel
                              color="whiteAlpha.500"
                              fontSize="xs"
                              fontWeight="bold"
                            >
                              Card Deployment (USD)
                            </FormLabel>
                            <Input
                              placeholder="1,000,000.00"
                              type="number"
                              bg="whiteAlpha.50"
                              h="56px"
                              borderRadius="xl"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              fontSize="2xl"
                              fontWeight="extrabold"
                            />
                          </FormControl>
                          <SimpleGrid columns={4} spacing={2} width="full">
                            {PRESETS_INSTITUTIONAL.map((p) => (
                              <Button
                                key={p}
                                size="xs"
                                onClick={() => setAmount(p)}
                                variant="outline"
                              >
                                ${Number(p).toLocaleString()}
                              </Button>
                            ))}
                          </SimpleGrid>
                          <StripeCorporateCheckout
                            amount={amount}
                            onSuccess={onClose}
                          />
                        </VStack>
                      </TabPanel>

                      <TabPanel p={0}>
                        <VStack spacing={6}>
                          <FormControl id="amount-direct-bank" isRequired>
                            <FormLabel
                              color="whiteAlpha.500"
                              fontSize="xs"
                              fontWeight="bold"
                            >
                              Bank Deployment (USD)
                            </FormLabel>
                            <Input
                              placeholder="1,000,000.00"
                              type="number"
                              bg="whiteAlpha.50"
                              h="56px"
                              borderRadius="xl"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              fontSize="2xl"
                              fontWeight="extrabold"
                            />
                          </FormControl>
                          {!isBankLinked ? (
                            <Button
                              leftIcon={<FaLock />}
                              colorScheme="blue"
                              size="lg"
                              h="64px"
                              width="full"
                              borderRadius="2xl"
                              onClick={simulateBankLink}
                              isLoading={isBankLinking}
                            >
                              Link Bank Account
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              size="lg"
                              h="64px"
                              width="full"
                              borderRadius="2xl"
                              onClick={handleDirectDeployment}
                              leftIcon={<FaUniversity />}
                            >
                              Confirm Direct Deposit
                            </Button>
                          )}
                        </VStack>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>

                  <Text
                    fontSize="10px"
                    color="whiteAlpha.400"
                    textAlign="center"
                    px={4}
                  >
                    Institutional processing powered by Stripe Treasury & Circle
                    Enterprise.
                  </Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

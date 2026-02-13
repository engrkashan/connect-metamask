import React from "react";
import { Transak } from "@transak/ui-js-sdk";
import { Button, VStack, Text, Box, Icon, HStack } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { FaShieldAlt } from "react-icons/fa";

type Props = {
  amount: string;
  onSuccess: () => void;
};

export default function TransakOnramp({ amount, onSuccess }: Props) {
  const { account } = useEthers();

  const openTransak = () => {
    const queryParams = new URLSearchParams({
      apiKey: "70a649d2-7c39-498c-9018-877478051877",
      walletAddress: account || "",
      fiatCurrency: "USD",
      defaultCryptoCurrency: "ETH",
      network: "ethereum",
      fiatAmount: amount || "100",
      themeColor: "3182ce",
    }).toString();

    const transak = new Transak({
      widgetUrl: `https://staging-global.transak.com?${queryParams}`,
      themeColor: "3182ce",
      widgetHeight: "650px",
      widgetWidth: "450px",
    });

    transak.init();

    Transak.on(
      Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
      (orderData: Record<string, unknown>) => {
        console.log("Order Data:", orderData);
        transak.close();
        onSuccess();
      },
    );
  };

  return (
    <VStack spacing={4} width="full">
      <Box
        width="full"
        bg="whiteAlpha.50"
        p={5}
        borderRadius="2xl"
        border="1px solid"
        borderColor="whiteAlpha.100"
        textAlign="left"
      >
        <HStack mb={2}>
          <Icon as={FaShieldAlt} color="green.400" />
          <Text fontSize="sm" fontWeight="bold" color="white">
            Secure Payment Gateway
          </Text>
        </HStack>
        <Text fontSize="xs" color="whiteAlpha.600" lineHeight="tall">
          Institutional-grade protection. Funds are delivered directly to your
          connected wealth portal address upon confirmation.
        </Text>
      </Box>

      <Button
        colorScheme="blue"
        size="lg"
        h="64px"
        width="full"
        borderRadius="2xl"
        onClick={openTransak}
        isDisabled={!account || !amount}
        fontSize="md"
        fontWeight="bold"
        boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.2)"
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "0 6px 20px 0 rgba(0, 118, 255, 0.3)",
        }}
        _active={{ transform: "translateY(0)" }}
        transition="all 0.2s"
      >
        Deploy with Card/Transfer
      </Button>

      <Text fontSize="10px" color="whiteAlpha.400" textAlign="center">
        Powered by Transak • Global Compliance & Security Standards
      </Text>
    </VStack>
  );
}

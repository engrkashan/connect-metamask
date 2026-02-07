import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  VStack,
  Box,
  Text,
  useToast,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaShieldAlt, FaRegCreditCard } from "react-icons/fa";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "rgba(255, 255, 255, 0.3)",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

type Props = {
  amount: string;
  onSuccess: () => void;
};

export default function StripeCorporateCheckout({ amount, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsProcessing(true);

    // Simulate Corporate Card verification and high-limit pre-auth
    setTimeout(async () => {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          toast({
            title: "Verification Error",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsProcessing(false);
        } else {
          console.log("[Corporate PaymentMethod]", paymentMethod);
          // Simulate institutional processing time
          setTimeout(() => {
            setIsProcessing(false);
            toast({
              title: "Institutional Sync Complete",
              description: `Successfully cleared $${Number(amount).toLocaleString()} via Corporate Treasury Card.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            onSuccess();
          }, 2500);
        }
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <VStack spacing={6} align="stretch">
        <Box
          width="full"
          bg="whiteAlpha.50"
          p={5}
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <HStack mb={4} justify="space-between">
            <HStack>
              <Icon as={FaRegCreditCard} color="blue.400" />
              <Text fontSize="sm" fontWeight="bold">
                Corporate Card Info
              </Text>
            </HStack>
            <Badge colorScheme="blue" variant="subtle">
              High-Limit
            </Badge>
          </HStack>

          <Box
            p={3}
            bg="blackAlpha.300"
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
        </Box>

        <HStack spacing={3} p={2}>
          <Icon as={FaShieldAlt} color="green.400" />
          <Text fontSize="10px" color="whiteAlpha.500" lineHeight="short">
            Secured by Stripe Corporate Infrastructure. Primary beneficial owner
            data is encrypted and handled according to PCI-DSS Level 1
            standards.
          </Text>
        </HStack>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          h="64px"
          width="full"
          borderRadius="2xl"
          isLoading={isProcessing || !stripe}
          loadingText="Verifying Treasury Limits..."
          fontSize="md"
          fontWeight="black"
          boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.4)"
        >
          Authorize ${Number(amount).toLocaleString() || "0"} Deployment
        </Button>
      </VStack>
    </form>
  );
}

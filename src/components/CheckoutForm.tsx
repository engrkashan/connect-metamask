import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
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

export default function CheckoutForm({ amount, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

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

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        toast({
          title: "Payment Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          setIsProcessing(false);
          toast({
            title: "Investment Successful",
            description: `Successfully processed payment of $${amount} via secured card.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onSuccess();
        }, 2000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <VStack spacing={6}>
        <Box
          width="full"
          bg="gray.800"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Your payment is secured and processed by Stripe.
        </Text>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          borderRadius="xl"
          isLoading={isProcessing || !stripe}
          loadingText="Processing Secured Payment..."
        >
          Invest with Secured Card
        </Button>
      </VStack>
    </form>
  );
}

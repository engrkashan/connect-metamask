import {
  ChakraProvider,
  useDisclosure,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import theme from "./theme";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./components/DashboardOverview";
import InvestPage from "./components/InvestPage";
import "@fontsource/inter";

// Mock public key for demo
const stripePromise = loadStripe(
  "pk_test_51IqV6yAn7m3G5vB2b6f7h8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z",
);

function App() {
  const { account } = useEthers();
  const [currentView, setCurrentView] = useState("overview");
  const {
    isOpen: isAccountOpen,
    onOpen: onAccountOpen,
    onClose: onAccountClose,
  } = useDisclosure();

  const renderContent = () => {
    if (!account) {
      return (
        <VStack h="80vh" justify="center" spacing={8}>
          <Heading color="white" size="2xl" fontWeight="black">
            Wealth Portal
          </Heading>
          <Text color="whiteAlpha.600" maxW="400px" textAlign="center">
            Connect your institutional wallet to access the secure treasury
            dashboard and deployment center.
          </Text>
          <ConnectButton handleOpenModal={onAccountOpen} />
        </VStack>
      );
    }

    switch (currentView) {
      case "overview":
        return <DashboardOverview />;
      case "invest":
        return <InvestPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <DashboardLayout
          currentView={currentView}
          onViewChange={setCurrentView}
        >
          <Box pt={account ? 10 : 0}>
            {account && (
              <HStack justify="flex-end" mb={8}>
                <ConnectButton handleOpenModal={onAccountOpen} />
              </HStack>
            )}
            {renderContent()}
          </Box>
        </DashboardLayout>

        <AccountModal isOpen={isAccountOpen} onClose={onAccountClose} />
      </Elements>
    </ChakraProvider>
  );
}

export default App;

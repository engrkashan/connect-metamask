import {
  ChakraProvider,
  useDisclosure,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import InvestmentModal from "./components/InvestmentModal";
import "@fontsource/inter";

function App() {
  const { account } = useEthers();
  const {
    isOpen: isAccountOpen,
    onOpen: onAccountOpen,
    onClose: onAccountClose,
  } = useDisclosure();
  const {
    isOpen: isInvestOpen,
    onOpen: onInvestOpen,
    onClose: onInvestClose,
  } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <VStack spacing={8}>
          <Box>
            <ConnectButton handleOpenModal={onAccountOpen} />
          </Box>

          {account && (
            <Button
              colorScheme="blue"
              size="lg"
              onClick={onInvestOpen}
              px={8}
              borderRadius="xl"
              boxShadow="lg"
              _hover={{ transform: "scale(1.05)" }}
              _active={{ transform: "scale(0.95)" }}
            >
              Invest
            </Button>
          )}
        </VStack>

        <AccountModal isOpen={isAccountOpen} onClose={onAccountClose} />
        <InvestmentModal isOpen={isInvestOpen} onClose={onInvestClose} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;

import {
  ChakraProvider,
  useDisclosure,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import theme from "./theme";
import AccountModal from "./components/AccountModal";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./components/DashboardOverview";
import InvestPage from "./components/InvestPage";
import SettingsPage from "./components/SettingsPage";
import ReportsPage from "./components/ReportsPage";
import Login from "./components/Login";
import "@fontsource/inter";

// Mock public key for demo
const stripePromise = loadStripe(
  "pk_test_51IqV6yAn7m3G5vB2b6f7h8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z",
);

function App() {
  const [currentView, setCurrentView] = useState("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deploymentAmount, setDeploymentAmount] = useState("");

  const {
    isOpen: isAccountOpen,
    onOpen: onAccountOpen,
    onClose: onAccountClose,
  } = useDisclosure();

  // Check session on mount
  useEffect(() => {
    const session = localStorage.getItem("vaultic_session");
    if (session === "authorized") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("vaultic_session", "authorized");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("vaultic_session");
  };

  const handleOptimize = (amount: string) => {
    setDeploymentAmount(amount);
    setCurrentView("invest");
  };

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <SlideFade
            in={currentView === "overview"}
            offsetY="20px"
            key="overview"
          >
            <DashboardOverview
              onViewChange={setCurrentView}
              onOptimize={handleOptimize}
            />
          </SlideFade>
        );
      case "invest":
        return (
          <SlideFade in={currentView === "invest"} offsetY="20px" key="invest">
            <InvestPage
              initialAmount={deploymentAmount}
              onAmountChange={setDeploymentAmount}
            />
          </SlideFade>
        );
      case "reports":
        return (
          <SlideFade
            in={currentView === "reports"}
            offsetY="20px"
            key="reports"
          >
            <ReportsPage />
          </SlideFade>
        );
      case "settings":
        return (
          <SlideFade
            in={currentView === "settings"}
            offsetY="20px"
            key="settings"
          >
            <SettingsPage />
          </SlideFade>
        );
      default:
        return (
          <SlideFade in={true} offsetY="20px" key="default">
            <DashboardOverview
              onViewChange={setCurrentView}
              onOptimize={handleOptimize}
            />
          </SlideFade>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <ChakraProvider theme={theme}>
        <Login onLogin={handleLoginSuccess} />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <DashboardLayout
          currentView={currentView}
          onViewChange={setCurrentView}
          onOpenAccountModal={onAccountOpen}
          onLogout={handleLogout}
        >
          <Box>{renderContent()}</Box>
        </DashboardLayout>

        <AccountModal isOpen={isAccountOpen} onClose={onAccountClose} />
      </Elements>
    </ChakraProvider>
  );
}

export default App;

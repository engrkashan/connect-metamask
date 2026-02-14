import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenAccountModal: () => void;
  onLogout: () => void;
};

const viewTitles: Record<string, string> = {
  overview: "Command Center",
  invest: "Vault Operations",
  reports: "Intelligence Briefs",
  settings: "Node Configuration",
};

export default function DashboardLayout({
  children,
  currentView,
  onViewChange,
  onOpenAccountModal,
  onLogout,
}: Props) {
  return (
    <Flex bg="#020817" minH="100vh" color="white" overflow="hidden">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />

      <Box
        flex="1"
        ml="80px"
        transition="all 0.3s"
        minH="100vh"
        position="relative"
      >
        <Header
          viewTitle={viewTitles[currentView] || "Vaultic"}
          onOpenAccountModal={onOpenAccountModal}
          onLogout={onLogout}
        />

        <Box p={8} position="relative">
          {/* Background Decorative Element */}
          <Box
            position="absolute"
            top="-15%"
            right="-10%"
            width="800px"
            height="800px"
            bgGradient="radial(blue.800 0%, transparent 75%)"
            opacity="0.3"
            zIndex="0"
            pointerEvents="none"
          />

          <Box
            position="absolute"
            bottom="-10%"
            left="-5%"
            width="500px"
            height="500px"
            bgGradient="radial(purple.900 0%, transparent 70%)"
            opacity="0.1"
            zIndex="0"
            pointerEvents="none"
          />

          <Box position="relative" zIndex="1" maxW="1200px" mx="auto">
            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

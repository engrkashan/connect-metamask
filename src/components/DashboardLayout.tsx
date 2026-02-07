import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
};

export default function DashboardLayout({
  children,
  currentView,
  onViewChange,
}: Props) {
  return (
    <Flex bg="gray.900" minH="100vh" color="white" overflow="hidden">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />

      <Box
        flex="1"
        ml="80px"
        p={8}
        transition="all 0.3s"
        bgGradient="linear(to-br, gray.900, blue.900)"
        minH="100vh"
        position="relative"
      >
        {/* Background Decorative Element */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          width="60%"
          height="60%"
          bgGradient="radial(blue.800 0%, transparent 70%)"
          opacity="0.3"
          zIndex="0"
          pointerEvents="none"
        />

        <Box position="relative" zIndex="1" maxW="1200px" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

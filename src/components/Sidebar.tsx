import { Box, Flex, Icon, Tooltip, VStack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiFundsLine,
  RiFileList3Line,
  RiSettings4Line,
  RiShieldFlashFill,
} from "react-icons/ri";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <Tooltip label={label} placement="right" hasArrow>
      <Box
        onClick={onClick}
        cursor="pointer"
        p={4}
        borderRadius="xl"
        bg={isActive ? "blue.600" : "transparent"}
        color={isActive ? "white" : "whiteAlpha.600"}
        transition="all 0.2s"
        boxShadow={isActive ? "0 4px 12px rgba(37, 99, 235, 0.4)" : "none"}
        _hover={{
          bg: isActive ? "blue.700" : "whiteAlpha.100",
          color: "white",
        }}
      >
        <Icon as={icon} boxSize={5} />
      </Box>
    </Tooltip>
  );
};

type Props = {
  currentView: string;
  onViewChange: (view: string) => void;
};

export default function Sidebar({ currentView, onViewChange }: Props) {
  return (
    <Flex
      direction="column"
      w="80px"
      h="100vh"
      bg="#0F172A"
      backdropFilter="blur(20px)"
      borderRight="1px solid"
      borderColor="whiteAlpha.100"
      py={6}
      align="center"
      justify="space-between"
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
    >
      <VStack spacing={8} align="center">
        <Box
          color="blue.400"
          mb={4}
          cursor="pointer"
          onClick={() => onViewChange("overview")}
        >
          <Icon
            as={RiShieldFlashFill}
            boxSize={8}
            filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
          />
        </Box>

        <VStack spacing={4}>
          <NavItem
            icon={RiDashboardLine}
            label="Overview"
            isActive={currentView === "overview"}
            onClick={() => onViewChange("overview")}
          />
          <NavItem
            icon={RiFundsLine}
            label="Invest"
            isActive={currentView === "invest"}
            onClick={() => onViewChange("invest")}
          />
          <NavItem
            icon={RiFileList3Line}
            label="Reports"
            isActive={currentView === "reports"}
            onClick={() => onViewChange("reports")}
          />
        </VStack>
      </VStack>

      <Box pb={4}>
        <NavItem
          icon={RiSettings4Line}
          label="Settings"
          isActive={currentView === "settings"}
          onClick={() => onViewChange("settings")}
        />
      </Box>
    </Flex>
  );
}

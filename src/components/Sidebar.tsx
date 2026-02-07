import { VStack, Icon, Text, Box, Flex, Tooltip } from "@chakra-ui/react";
import { FaChartLine, FaWallet, FaFileAlt, FaCog, FaGem } from "react-icons/fa";

type NavItemProps = {
  icon: any;
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
      bg="blackAlpha.400"
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
        <Box color="blue.400" mb={4}>
          <Icon as={FaGem} boxSize={8} />
        </Box>

        <VStack spacing={4}>
          <NavItem
            icon={FaChartLine}
            label="Overview"
            isActive={currentView === "overview"}
            onClick={() => onViewChange("overview")}
          />
          <NavItem
            icon={FaWallet}
            label="Invest"
            isActive={currentView === "invest"}
            onClick={() => onViewChange("invest")}
          />
          <NavItem
            icon={FaFileAlt}
            label="Reports"
            isActive={currentView === "reports"}
            onClick={() => onViewChange("reports")}
          />
        </VStack>
      </VStack>

      <Box>
        <NavItem
          icon={FaCog}
          label="Settings"
          isActive={currentView === "settings"}
          onClick={() => onViewChange("settings")}
        />
      </Box>
    </Flex>
  );
}

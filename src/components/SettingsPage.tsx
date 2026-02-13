import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  HStack,
  Icon,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiUserSmileLine,
  RiShieldKeyholeLine,
  RiGlobalLine,
  RiPaletteLine,
} from "react-icons/ri";
import ProfileEditModal from "./ProfileEditModal";

const SettingsSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <Box
    bg="rgba(255, 255, 255, 0.03)"
    p={6}
    borderRadius="2xl"
    border="1px solid rgba(255, 255, 255, 0.08)"
    w="full"
  >
    <HStack spacing={3} mb={6}>
      <Icon as={icon} color="blue.400" boxSize={5} />
      <Heading size="sm" color="white">
        {title}
      </Heading>
    </HStack>
    <VStack spacing={6} align="stretch">
      {children}
    </VStack>
  </Box>
);

const SettingItem = ({
  label,
  description,
  control,
}: {
  label: string;
  description: string;
  control: React.ReactNode;
}) => (
  <Flex justify="space-between" align="center">
    <VStack align="flex-start" spacing={0}>
      <Text color="white" fontWeight="medium" fontSize="sm">
        {label}
      </Text>
      <Text color="whiteAlpha.500" fontSize="xs">
        {description}
      </Text>
    </VStack>
    {control}
  </Flex>
);

const SettingsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState({
    name: "Vault Commander",
    email: "commander@vaultic.io",
  });

  const handleSaveProfile = (name: string, email: string) => {
    setProfile({ name, email });
  };

  return (
    <VStack spacing={8} w="full" align="stretch" py={4}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <SettingsSection title="Profile Overview" icon={RiUserSmileLine}>
          <SettingItem
            label="Display Name"
            description={profile.name}
            control={
              <Button
                size="xs"
                variant="ghost"
                colorScheme="blue"
                onClick={onOpen}
              >
                Edit
              </Button>
            }
          />
          <SettingItem
            label="Email Address"
            description={profile.email}
            control={
              <Button
                size="xs"
                variant="ghost"
                colorScheme="blue"
                onClick={onOpen}
              >
                Change
              </Button>
            }
          />
        </SettingsSection>

        <SettingsSection title="General Preferences" icon={RiPaletteLine}>
          <SettingItem
            label="High Contrast"
            description="Improve visibility of UI elements"
            control={<Switch colorScheme="blue" size="sm" />}
          />
          <SettingItem
            label="Compact Mode"
            description="Reduce spacing in dashboard lists"
            control={<Switch colorScheme="blue" size="sm" isChecked />}
          />
        </SettingsSection>

        <SettingsSection title="Security Operations" icon={RiShieldKeyholeLine}>
          <SettingItem
            label="Biometric Lockdown"
            description="Require fingerprint for transactions"
            control={<Switch colorScheme="blue" size="sm" />}
          />
          <SettingItem
            label="Session Persistence"
            description="Stay logged in for 30 days"
            control={<Switch colorScheme="blue" size="sm" isChecked />}
          />
        </SettingsSection>

        <SettingsSection title="Localization" icon={RiGlobalLine}>
          <SettingItem
            label="Base Currency"
            description="USD ($)"
            control={
              <Button size="xs" variant="ghost" colorScheme="blue">
                USD
              </Button>
            }
          />
          <SettingItem
            label="Network Priority"
            description="Ethereum Mainnet"
            control={
              <Button size="xs" variant="ghost" colorScheme="blue">
                Switch
              </Button>
            }
          />
        </SettingsSection>
      </SimpleGrid>

      <Box
        p={6}
        bg="rgba(255, 0, 0, 0.05)"
        borderRadius="2xl"
        border="1px solid rgba(255, 0, 0, 0.1)"
      >
        <HStack justify="space-between">
          <VStack align="flex-start" spacing={0}>
            <Text color="red.400" fontWeight="bold">
              Danger Zone
            </Text>
            <Text color="whiteAlpha.500" fontSize="sm">
              Permanent actions regarding your Vaultic node.
            </Text>
          </VStack>
          <Button colorScheme="red" variant="outline" size="sm">
            Purge All Data
          </Button>
        </HStack>
      </Box>

      <ProfileEditModal
        isOpen={isOpen}
        onClose={onClose}
        initialName={profile.name}
        initialEmail={profile.email}
        onSave={handleSaveProfile}
      />
    </VStack>
  );
};

export default SettingsPage;

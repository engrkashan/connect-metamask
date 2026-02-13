import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialEmail: string;
  onSave: (name: string, email: string) => void;
};

const ProfileEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialName,
  initialEmail,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSave(name, email);
      setIsLoading(false);
      onClose();
      toast({
        title: "Profile Updated",
        description: "Your credentials have been securely stored.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
      <ModalContent
        bg="#0F172A"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="2xl"
        p={4}
      >
        <ModalHeader color="white" fontWeight="bold">
          Update Vault Profile
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.500" />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="whiteAlpha.600" fontSize="xs" fontWeight="bold">
                DISPLAY NAME
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="whiteAlpha.50"
                border="none"
                color="white"
                _focus={{ bg: "whiteAlpha.100" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="whiteAlpha.600" fontSize="xs" fontWeight="bold">
                EMAIL ADDRESS
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="whiteAlpha.50"
                border="none"
                color="white"
                _focus={{ bg: "whiteAlpha.100" }}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button
            variant="ghost"
            color="whiteAlpha.600"
            onClick={onClose}
            _hover={{ bg: "whiteAlpha.100" }}
          >
            Cancel
          </Button>
          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.400" }}
            isLoading={isLoading}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;

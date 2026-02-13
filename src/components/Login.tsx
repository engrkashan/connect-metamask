import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { RiShieldFlashLine } from "react-icons/ri";

type Props = {
  onLogin: () => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onLogin();
      toast({
        title: "Access Authorized",
        description: "Welcome back, Commander.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#0F172A"
      position="relative"
      overflow="hidden"
    >
      {/* Background Glows */}
      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        w="600px"
        h="600px"
        bg="rgba(59, 130, 246, 0.15)"
        filter="blur(120px)"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="-5%"
        w="400px"
        h="400px"
        bg="rgba(147, 51, 234, 0.1)"
        filter="blur(100px)"
        borderRadius="full"
      />

      <VStack
        spacing={8}
        w="full"
        maxW="md"
        p={10}
        bg="rgba(255, 255, 255, 0.03)"
        backdropFilter="blur(20px)"
        borderRadius="3xl"
        border="1px solid rgba(255, 255, 255, 0.08)"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        zIndex={1}
      >
        <VStack spacing={2} textAlign="center">
          <Box
            p={4}
            bg="rgba(59, 130, 246, 0.1)"
            borderRadius="2xl"
            border="1px solid rgba(59, 130, 246, 0.2)"
            mb={2}
          >
            <Icon as={RiShieldFlashLine} w={10} h={10} color="blue.400" />
          </Box>
          <Heading
            color="white"
            size="xl"
            fontWeight="bold"
            letterSpacing="tight"
          >
            Vaultic
          </Heading>
          <Text color="whiteAlpha.600" fontSize="sm">
            Enter your credentials to access the command center.
          </Text>
        </VStack>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel
                color="whiteAlpha.700"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                Identifier
              </FormLabel>
              <Input
                type="email"
                placeholder="demo@vaultic.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="white"
                _hover={{ border: "1px solid rgba(59, 130, 246, 0.4)" }}
                _focus={{
                  border: "1px solid #3B82F6",
                  boxShadow: "0 0 0 1px #3B82F6",
                }}
                h="50px"
                borderRadius="xl"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel
                color="whiteAlpha.700"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                Keycode
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  color="white"
                  _focus={{
                    border: "1px solid #3B82F6",
                    boxShadow: "0 0 0 1px #3B82F6",
                  }}
                  h="50px"
                  borderRadius="xl"
                />
                <InputRightElement h="50px">
                  <IconButton
                    variant="ghost"
                    color="whiteAlpha.400"
                    _hover={{ color: "white" }}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              w="full"
              h="50px"
              bg="blue.500"
              color="white"
              borderRadius="xl"
              fontWeight="bold"
              fontSize="md"
              _hover={{ bg: "blue.400", transform: "translateY(-1px)" }}
              _active={{ bg: "blue.600", transform: "translateY(0)" }}
              isLoading={isLoading}
              loadingText="Authenticating"
              transition="all 0.2s"
              mt={4}
            >
              Authorize Access
            </Button>
          </VStack>
        </form>

        <Text color="whiteAlpha.400" fontSize="xs" textAlign="center">
          Protected by end-to-end encryption. <br />
          Contact support to request access.
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;

import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import useRedirect from "../../utils/helpers/redirect";

export default function Simple(props) {
  const { openConfigDrawer, currentUser, signOut } = props;
  let history = useRedirect();

  return (
    <>
      <Box bg={useColorModeValue("#4b32c3", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box fontSize="28px" fontWeight={700} color="white">
              Playground
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box>
                <Link to="/prettier">
                  <Text color="white" fontSize="22px" fontWeight="bold">
                    Prettier
                  </Text>
                </Link>
              </Box>
              <Box>
                <Link to="/linter">
                  <Text color="white" fontSize="22px" fontWeight="bold">
                    Linter
                  </Text>
                </Link>
              </Box>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {currentUser ? (
              <Button onClick={signOut}>Log out</Button>
            ) : (
              <Button onClick={() => history.push("/login")}>Login</Button>
            )}
            <Button ml="10px" onClick={openConfigDrawer}>
              Open Config Menu
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

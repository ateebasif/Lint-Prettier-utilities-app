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
  useDisclosure,
  Text,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

function SettingsModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState("");

  return (
    <div>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} isCentered={true} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rule Definition Editor Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Language</Text>
            <RadioGroup mt="8px" onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1">Javascript</Radio>
                <Radio value="2">TypeScript</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              ok
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SettingsModal;

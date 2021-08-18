import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";

function ConfigDrawer(props) {
  const { children, isOpen, onClose, useConfigFile, handleChangeConfigs } =
    props;

  const btnRef = React.useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Configurations</DrawerHeader>

          <DrawerBody>
            <Flex alignItems={"center"}>
              {useConfigFile ? (
                <Button onClick={handleChangeConfigs}>USE UI</Button>
              ) : (
                <Button onClick={handleChangeConfigs}>
                  USE JSON CONFIG FILE
                </Button>
              )}
            </Flex>

            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default ConfigDrawer;

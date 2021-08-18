import React, { useState } from "react";
import { Resizable } from "re-resizable";
import parser from "prettier/parser-typescript";
import _extend from "lodash/extend";
import _get from "lodash/get";
import { Box, useDisclosure } from "@chakra-ui/react";
import TextareaAutosize from "react-autosize-textarea";

import TopBar from "../TopBar";
import JsonConfigsEditor from "./JsonConfigsEditor";
import MonacoEditor from "./MonacoEditor";
import PrettierEditor from "./PrettierEditor";
import Drawer from "../Drawer";
import PrettierConfigMenu from "./PrettierConfigMenu";

import PRETTIER_CONFIG from "../../utils/constants/prettierConfig";
import {
  RESIZE_STYLE,
  ENABLE_RESIZE,
} from "../../utils/constants/resizeAbleConfig";
import CodeFormater from "../../utils/helpers/prettierCodeFormater";
import createSnapShot from "../../utils/firebase/createSnapshot";
import { signOut } from "../../utils/firebase/loginLogout";
import GetSnapShots from "../hooks/GetSnapShots";

import styles from "../../styles/Editor.module.css";

function CodeEditor() {
  const [codeValue, setCodeValue] = useState("");
  const [formatedCode, setFormatedCode] = useState("");
  const [codeFormatFunc, setcodeFormatFunc] = useState("");
  const [useConfigFile, setUseConfigFile] = useState(false);
  const [prettierConfig, setPrettierConfig] = useState(PRETTIER_CONFIG);
  const [jsonConfig, setJsonConfig] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const collectionName = "prettierSnapShot";
  const { currentUser, codeSnapShots } = GetSnapShots(collectionName);

  const onCodeChange = (value) => {
    setCodeValue(value);
  };

  const handleJsonConfig = (value) => {
    setJsonConfig(value);
  };

  const onCodeFormat = async () => {
    codeFormatFunc.updateOptions({ readOnly: false });

    if (useConfigFile) {
      // Format With JSON
      const confingObj = eval(jsonConfig);
      const extendedConfig = _extend(confingObj[0], { plugins: [parser] });
      const formatRes = CodeFormater(codeValue, extendedConfig);
      setFormatedCode(formatRes);
    } else {
      // Format With UI Buttons
      const extendedConfig = _extend(prettierConfig, { plugins: [parser] });
      const formatRes = CodeFormater(codeValue, extendedConfig);
      setFormatedCode(formatRes);
    }

    if (currentUser) {
      await createSnapShot(codeValue, currentUser, collectionName);
    }
  };

  const handleChangeConfigs = () => {
    setUseConfigFile(!useConfigFile);

    if (!useConfigFile) {
      delete prettierConfig.plugins;
      const config = JSON.stringify([prettierConfig]);
      setJsonConfig(config);
    }

    if (useConfigFile) {
      const confingObj = eval(jsonConfig);
      const extendedConfig = _extend(confingObj[0], { plugins: [parser] });
      setPrettierConfig(extendedConfig);
    }
  };

  return (
    <div>
      <TopBar
        openConfigDrawer={onOpen}
        currentUser={currentUser}
        signOut={signOut}
      />
      <div className={_get(styles, "container", "")}>
        {/* Snap shots */}
        <Box className={_get(styles, "snapShots", "")}>
          {codeSnapShots.map((item, index) => (
            <TextareaAutosize
              key={Date.now() + Math.random()}
              disabled
              className={_get(styles, "textarea", "")}
              defaultValue={_get(item, "code", "")}
            />
          ))}
        </Box>

        <Resizable
          style={RESIZE_STYLE}
          defaultSize={{
            width: "35%",
            height: "100%",
          }}
          enable={ENABLE_RESIZE}
        >
          <MonacoEditor
            onCodeChange={onCodeChange}
            onCodeFormat={onCodeFormat}
          />
        </Resizable>

        <div className={_get(styles, "rightContainer", "")}>
          <PrettierEditor
            codeValue={formatedCode}
            setcodeFormatFunc={setcodeFormatFunc}
          />
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        {...{ isOpen, onOpen, onClose }}
        useConfigFile={useConfigFile}
        handleChangeConfigs={handleChangeConfigs}
      >
        {useConfigFile ? (
          <Box>
            <JsonConfigsEditor
              jsonConfigs={jsonConfig}
              handleJsonConfig={handleJsonConfig}
            />
          </Box>
        ) : (
          <Box>
            <PrettierConfigMenu
              prettierConfig={prettierConfig}
              setPrettierConfig={setPrettierConfig}
            />
          </Box>
        )}
      </Drawer>
    </div>
  );
}

export default CodeEditor;

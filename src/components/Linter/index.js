import React, { useState } from "react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _extend from "lodash/extend";
import axios from "axios";
import { Resizable } from "re-resizable";
import { Text, Box, useDisclosure } from "@chakra-ui/react";
import TextareaAutosize from "react-autosize-textarea";

import LinterConfigMenu from "./LinterConfigMenu";
import FormattedCodeResult from "./FormatetdResult";
import MonacoEditor from "./MonacoEditor";
import TopBar from "../TopBar";
import Drawer from "../Drawer";
import JsonConfigsEditor from "../Prettier/JsonConfigsEditor";

import { signOut } from "../../utils/firebase/loginLogout";
import createSnapShot from "../../utils/firebase/createSnapshot";
import {
  RESIZE_STYLE,
  ENABLE_RESIZE,
} from "../../utils/constants/resizeAbleConfig";
import {
  LINTER_CONFIG,
  ES_Lint_Config_Obj,
} from "../../utils/constants/linterConfig";
import GetSnapShots from "../hooks/GetSnapShots";

import styles from "../../styles/Editor.module.css";

function Linter() {
  const [codeValue, setCodeValue] = useState("");
  const [lintMessages, setLintMessages] = useState([]);
  const [prettyRes, setPrettyRes] = useState("");
  const [codeFormatFunc, setcodeFormatFunc] = useState("");
  const [jsonConfig, setJsonConfig] = useState(
    JSON.stringify([ES_Lint_Config_Obj])
  );
  const [useConfigFile, setUseConfigFile] = useState(true);
  const [linterConfig, setLinterConfig] = useState(LINTER_CONFIG);
  const [configObj, setConfigObj] = useState(ES_Lint_Config_Obj);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const collectionName = "lintSnapShot";
  const { currentUser, codeSnapShots } = GetSnapShots(collectionName);

  const onCodeLint = async () => {
    codeFormatFunc.updateOptions({ readOnly: false });
    let res;

    if (!useConfigFile) {
      // "through ui";

      res = await axios.post("http://localhost:3001/linter", {
        code: codeValue,
        EsLintRules: JSON.stringify([configObj]),
      });
    } else {
      // "through ui Json";
      res = await axios.post("http://localhost:3001/linter", {
        code: codeValue,
        EsLintRules: jsonConfig,
      });
    }

    setLintMessages(_get(res, "data.verifyAndFix.messages", []));
    setPrettyRes(_get(res, "data.verifyAndFix.output", ""));

    if (currentUser) {
      await createSnapShot(codeValue, currentUser, collectionName);
    }
  };

  const onCodeChange = (value) => {
    setCodeValue(value);
  };

  const handleJsonConfig = (value) => {
    setJsonConfig(value);
  };

  const handleChangeConfigs = () => {
    setUseConfigFile(!useConfigFile);

    if (!useConfigFile) {
      // "in ui";
      setJsonConfig(JSON.stringify([configObj]));
    }

    if (useConfigFile) {
      //"in json file";

      const confingObj = eval(jsonConfig);
      const extendedObj = confingObj[0];

      Object.entries(confingObj[0]).map((item) => {
        const key = item[0];
        const value = item[1];

        if (key in configObj) {
          if (
            value === 1 ||
            value === 2 ||
            value === "error" ||
            value === "warn"
          ) {
            _extend(extendedObj, { ...extendedObj, [key]: true });
          }

          if (value === 0 || value === "none") {
            _extend(extendedObj, { ...extendedObj, [key]: false });
          }
        }
      });

      setLinterConfig(extendedObj);
      setJsonConfig(JSON.stringify(eval(jsonConfig)));
      const updatedJson = eval(jsonConfig);
      setConfigObj(updatedJson[0]);
    }
  };

  return (
    <>
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
            isLint={true}
            onCodeLint={onCodeLint}
          />
        </Resizable>

        <div className={_get(styles, "lintRightContainer", "")}>
          <FormattedCodeResult
            codeValue={prettyRes}
            setcodeFormatFunc={setcodeFormatFunc}
          />

          {!_get(lintMessages, "length", 0) > 0 && (
            <div className={_get(styles, "lintContainer", "")}>
              <div className={_get(styles, "lintFree", "")}>
                <Text>Lint-free!</Text>
              </div>
            </div>
          )}

          <div className={_get(styles, "lintContainer", "")}>
            {lintMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  _get(msg, "severity", 0) === 1
                    ? _get(styles, "lintWarnings", "")
                    : _get(styles, "lintErrors", "")
                }
              >
                <Text>
                  {_get(msg, "line", "")}:{_get(msg, "column", "")} -{" "}
                  {_get(msg, "message", "")} (
                  <span> {_get(msg, "ruleId", "")} </span>)
                </Text>
              </div>
            ))}
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
              <LinterConfigMenu
                linterConfig={linterConfig}
                setLinterConfig={setLinterConfig}
                configObj={configObj}
                setConfigObj={setConfigObj}
              />
            </Box>
          )}
        </Drawer>
      </div>
    </>
  );
}

export default Linter;

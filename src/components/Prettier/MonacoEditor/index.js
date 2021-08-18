import React, { useState } from "react";
import { Box, IconButton, Button } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import MonacoEditor from "@lsky/react-monaco-editor";

import SettingsModal from "../SettingsModal";
import styles from "../../../styles/Editor.module.css";

function MonacoCodeEditor(props) {
  const { onCodeChange, onCodeFormat } = props;

  const [monaco, setMonaco] = useState("");
  const [editor, setEditor] = useState("");

  return (
    <Box height="100%">
      <Box className={styles.headingContainer}>
        <Button height="34px" pb="3px" onClick={() => onCodeFormat(editor)}>
          FormatCode
        </Button>

        <Box>
          <SettingsModal>
            <IconButton
              height="34px"
              variant="outline"
              aria-label="Send email"
              icon={<SettingsIcon color="#81848b" />}
            />
          </SettingsModal>
        </Box>
      </Box>

      {/* <Editor */}
      <MonacoEditor
        id="editor"
        height={825}
        defaultLanguage="javascript"
        language="javascript"
        onChange={onCodeChange}
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          formatOnPaste: false,
        }}
        editorDidMount={(editor, monaco) => {
          setMonaco(monaco);
          setEditor(editor);
        }}
      />
    </Box>
  );
}

export default MonacoCodeEditor;

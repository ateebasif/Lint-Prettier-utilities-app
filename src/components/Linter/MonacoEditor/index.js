import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import MonacoEditor from "@lsky/react-monaco-editor";

import styles from "../../../styles/Editor.module.css";

function MonacoCodeEditor(props) {
  const { onCodeChange, onCodeFormat, isLint, onCodeLint } = props;

  const [monaco, setMonaco] = useState("");
  const [editor, setEditor] = useState("");

  return (
    <Box height="100%">
      <Box className={styles.headingContainer}>
        <Button
          height="34px"
          pb="3px"
          onClick={() => (isLint ? onCodeLint() : onCodeFormat(editor))}
        >
          {isLint ? "LintCode" : "FormatCode"}
        </Button>
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

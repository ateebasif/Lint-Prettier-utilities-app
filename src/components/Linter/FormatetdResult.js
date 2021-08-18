import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MonacoEditor from "@lsky/react-monaco-editor";

function CodePrettier(props) {
  const { codeValue, setcodeFormatFunc } = props;

  return (
    <div>
      <Box height="50px" pt="12px">
        <Text>Fixed Code!</Text>
      </Box>
      <MonacoEditor
        language="javascript"
        height={500}
        value={codeValue}
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          formatOnPaste: false,
          formatOnType: false,
        }}
        editorDidMount={(editor, monaco) => {
          editor.updateOptions({ readOnly: true });
          setcodeFormatFunc(editor);
        }}
      />
    </div>
  );
}
export default CodePrettier;

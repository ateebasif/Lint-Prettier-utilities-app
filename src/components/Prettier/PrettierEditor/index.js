import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MonacoEditor from "@lsky/react-monaco-editor";

function CodePrettier(props) {
  const { codeValue, setcodeFormatFunc } = props;

  return (
    <div>
      <Box height="50px">
        <Text>Beautified!</Text>
      </Box>
      <MonacoEditor
        language="javascript"
        height={825}
        value={codeValue}
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
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

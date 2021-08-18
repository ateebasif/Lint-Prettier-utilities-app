import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MonacoEditor from "@lsky/react-monaco-editor";

function JsonConfigs(props) {
  const { handleJsonConfig, jsonConfigs } = props;

  return (
    <div>
      <Box height="50px" display="flex" alignItems={"center"} pl="38px">
        <Text>JSCONFIG!</Text>
      </Box>
      <MonacoEditor
        id="editor"
        height={825}
        value={jsonConfigs}
        language="json"
        onChange={handleJsonConfig}
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          formatOnPaste: true,
          formatOnType: true,
        }}
        editorDidMount={(editor) => {
          setTimeout(function () {
            editor.getAction("editor.action.formatDocument").run();
          }, 200);
        }}
      />
    </div>
  );
}

export default JsonConfigs;

import prettier from "prettier/standalone";
import parser from "prettier/parser-typescript";

function formatCode(code, prettierConfig) {
  try {
    const formatedCode = prettier.format(code, prettierConfig);

    // console.log("format", formatedCode);
    return formatedCode;
  } catch (err) {
    console.log("error", err);
  }
}

export default formatCode;

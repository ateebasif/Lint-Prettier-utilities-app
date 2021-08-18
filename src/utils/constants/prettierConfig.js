import parser from "prettier/parser-typescript";

const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  tabWidth: 4,
  printWidth: 60,
  endOfLine: "lf",
  arrowParens: "always",
  parser: "typescript",
  plugins: [parser],
  bracketSpacing: true,
  jsxBracketSameLine: false,
  insertPragma: false,
  requirePragma: false,
};

export default prettierConfig;

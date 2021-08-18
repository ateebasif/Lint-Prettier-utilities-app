import React from "react";
import { Box, Text, Stack, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import _get from "lodash/get";

import styles from "../../../styles/ConfigMenu.module.css";

function PrettierConfigMenu(props) {
  const { prettierConfig, setPrettierConfig } = props;

  return (
    <div>
      <Box padding="12px">
        <Box padding="10px 0px">
          <Text fontSize="18px" lineHeight="27px">
            JavaScript Options
          </Text>
        </Box>
        <Stack>
          <Text fontSize="13px" fontWeight={700}>
            Beautifiers*
          </Text>

          {/* Beautifiers */}
          <Box display="flex" flexDirection="row" alignItems="center">
            <select className={_get(styles, "selectOption", "")}>
              <option value="Prettier">Prettier</option>
            </select>

            <Box pl="12px">
              <IconButton
                colorScheme="red"
                height="34px"
                borderRadius="2"
                width="120px"
                icon={<CloseIcon />}
              />
            </Box>
          </Box>
        </Stack>

        {/* Pragma Insert*/}
        <Stack>
          <Box pt="10px" display="flex" alignItems={"center"}>
            <input
              type="checkbox"
              defaultChecked={_get(prettierConfig, "insertPragma", "")}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  insertPragma: _get(e, "target.checked", false),
                })
              }
            />
            <Text pl="6px" fontSize="13px" fontWeight={700}>
              Pragma Insert
            </Text>
          </Box>
          <Text fontSize="13px">
            Insert a marker at the top of a file specifying the file has been
            beautified
          </Text>
        </Stack>

        {/* Pragma Require*/}
        <Stack>
          <Box pt="10px" display="flex" alignItems={"center"}>
            <input
              type="checkbox"
              defaultChecked={_get(prettierConfig, "requirePragma", false)}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  requirePragma: _get(e, "target.checked", false),
                })
              }
            />
            <Text pl="6px" fontSize="13px" fontWeight={700}>
              Pragma Require
            </Text>
          </Box>
          <Text fontSize="13px">
            Restrict beautifying files to only those with a pragma at the top
          </Text>
        </Stack>

        {/* Indent Size */}
        <Stack>
          <Box pt="10px" display="flex" flexDirection="column">
            <Text fontSize="13px" fontWeight={700} pb="6px">
              Indent Size*
            </Text>
            <input
              className={_get(styles, "input", "")}
              placeholder="TabWidth"
              width="80px"
              size="sm"
              defaultValue={prettierConfig.tabWidth}
              type="number"
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  tabWidth: Number(_get(e, "target.value", 0)),
                })
              }
            />
          </Box>
          <Text fontSize="13px">Indentation size/length</Text>
        </Stack>
        {/* Arrow Parens */}
        <Stack>
          <Box pt="10px" display="flex" flexDirection="column">
            <Text fontSize="13px" fontWeight={700} pb="6px">
              Arrow Parens
            </Text>
            <select
              className={_get(styles, "selectOption", "")}
              defaultValue={_get(prettierConfig, "arrowParens", "")}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  arrowParens: _get(e, "target.value", ""),
                })
              }
            >
              <option value="always">always</option>
              <option value="avoid">avoid</option>
            </select>
          </Box>
          <Text fontSize="13px">
            Require parenthesis in arrow function arguments
          </Text>
        </Stack>

        {/* Object Curly Spacing */}
        <Stack>
          <Box pt="10px" display="flex" alignItems={"center"}>
            <input
              type="checkbox"
              defaultChecked={_get(prettierConfig, "bracketSpacing", false)}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  bracketSpacing: _get(e, "target.checked", false),
                })
              }
            />
            <Text pl="6px" fontSize="13px" fontWeight={700}>
              Object Curly Spacing
            </Text>
          </Box>
          <Text fontSize="13px">
            Inserts a space before/after brackets for object literals,
            destructuring assignments, and import/export specifiers
          </Text>
        </Stack>

        {/* JSX Brackets*/}
        <Stack>
          <Box pt="10px" display="flex" alignItems={"center"}>
            <input
              type="checkbox"
              defaultChecked={_get(prettierConfig, "jsxBracketSameLine", false)}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  jsxBracketSameLine: _get(e, "target.checked", false),
                })
              }
            />
            <Text pl="6px" fontSize="13px" fontWeight={700}>
              JSX Brackets
            </Text>
          </Box>
          <Text fontSize="13px">
            Put the {`>`} of a multi-line JSX element at the end of the last
            line
          </Text>
        </Stack>

        {/* Trailing Comma */}
        <Stack>
          <Box pt="10px" display="flex" flexDirection="column">
            <Text fontSize="13px" fontWeight={700} pb="6px">
              Trailing Comma
            </Text>
            <select
              className={_get(styles, "selectOption", "")}
              defaultValue={_get(prettierConfig, "trailingComma", "")}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  trailingComma: _get(e, "target.value", ""),
                })
              }
            >
              <option value="es5">es5</option>
              <option value="none">none</option>
              <option value="all">all</option>
            </select>
          </Box>
        </Stack>

        {/* End With Semicolon */}
        <Stack>
          <Box pt="10px" display="flex" alignItems={"center"}>
            <input
              type="checkbox"
              defaultChecked={_get(prettierConfig, "semi", false)}
              onChange={(e) =>
                setPrettierConfig({
                  ...prettierConfig,
                  semi: _get(e, "target.checked", false),
                })
              }
            />
            <Text pl="6px" fontSize="13px" fontWeight={700}>
              End With Semicolon
            </Text>
          </Box>
          <Text fontSize="13px">
            Insert a semicolon at the end of statements
          </Text>
        </Stack>

        {/* Quotes */}
        <Stack>
          <Box pt="10px" display="flex" flexDirection="column">
            <Text fontSize="13px" fontWeight={700} pb="6px">
              Quotes
            </Text>
            <select
              className={_get(styles, "selectOption", "")}
              defaultValue={_get(prettierConfig, "singleQuote", false)}
              onChange={(e) => {
                setPrettierConfig({
                  ...prettierConfig,
                  singleQuote:
                    _get(e, "target.value", "") === "true" ? true : false,
                });
              }}
            >
              <option value={true}>Single</option>
              <option value={false}>Double</option>
            </select>
          </Box>
          <Text fontSize="13px">
            Convert the quote characters delimiting strings from either double
            or single quotes to the other.
          </Text>
        </Stack>

        <Stack pl="6px">
          <Text>PrintWidth</Text>
          <input
            className={_get(styles, "input", "")}
            placeholder="PrintWidth"
            width="80px"
            size="sm"
            type="number"
            defaultValue={_get(prettierConfig, "printWidth", "")}
            onChange={(e) =>
              setPrettierConfig({
                ...prettierConfig,
                printWidth: Number(_get(e, "target.value", 0)),
              })
            }
          />
        </Stack>
      </Box>
    </div>
  );
}

export default PrettierConfigMenu;

import React from "react";
import _get from "lodash/get";
import _extend from "lodash/extend";
import _map from "lodash/map";
import { Box, Text } from "@chakra-ui/react";

import styles from "../../../styles/LinterConfigMenu.module.css";

function LinterConfigMenu(props) {
  const { linterConfig, setLinterConfig, configObj, setConfigObj } = props;

  const handleOnClick = (key, value) => {
    if (!value) {
      const extendedObj = _extend(configObj, { ...configObj, [key]: 2 });
      setConfigObj(extendedObj);
    } else {
      const newObj = configObj;
      setConfigObj({ ...newObj, [key]: 0 });
    }

    setLinterConfig({ ...linterConfig, [key]: !linterConfig[key] });
  };

  const handleOnChange = () => {};

  return (
    <div>
      <Box padding="12px">
        <Box padding="10px 0px">
          <Text>Linter Config Menu</Text>
        </Box>

        <div className={_get(styles, "configWrapper", "")}>
          {_map(Object.entries(linterConfig), (item) => (
            <Box key={item[0]} className={_get(styles, "inputWrapper", "")}>
              <Box
                className={_get(styles, "inputBox", "")}
                onClick={() => handleOnClick(item[0], item[1])}
              >
                <input
                  className={styles.input}
                  type="checkbox"
                  checked={item[1]}
                  onChange={handleOnChange}
                />
                <Text pl="6px" fontSize="13px" fontWeight={700}>
                  {item[0]}
                </Text>
              </Box>
            </Box>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default LinterConfigMenu;

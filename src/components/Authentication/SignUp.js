import React, { useState } from "react";
import _get from "lodash/get";
import _extend from "lodash/extend";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

import CreateUser from "../../utils/firebase/sign_up_user";
import styles from "../../styles/SignUp.module.css";
import useRedirect from "../../utils/helpers/redirect";

function SignUp() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signUpResponse, setSignUpResponse] = useState("");

  let history = useRedirect();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    const res = await CreateUser(email, password);

    if (res === true) history.push("/prettier");
    setSignUpResponse(res);
  };

  const handleOnChange = (e) => {
    const targetInput = _get(e, "target.name", "");
    const targetInputValue = _get(e, "target.value", "");
    const values = credentials;

    const updatedInputValues = _extend(values, {
      ...values,
      [targetInput]: targetInputValue,
    });

    setCredentials(updatedInputValues);
  };

  const onLogin = () => history.push("login");

  return (
    <div className={_get(styles, "container", "")}>
      <form className={_get(styles, "form", "")} onSubmit={handleOnSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
        </FormControl>

        <FormControl mt="10px" id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            onChange={handleOnChange}
            placeholder="Password"
          />
        </FormControl>

        <Box mt="15px">
          <Text display="flex" className={_get(styles, "anchorText", "")}>
            Already have an account?
            <span onClick={onLogin}>Click to Login</span>
          </Text>
        </Box>

        <Box mt="10px" mb="6px">
          {signUpResponse && <Text color="red">{signUpResponse}</Text>}{" "}
        </Box>

        <Button mt="8px" width="100%" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;

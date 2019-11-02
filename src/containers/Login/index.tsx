import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { loggedin } from "../../actions/auth";
import { push } from "connected-react-router";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  FormControlProps
} from "react-bootstrap";
import "./Login.css";

import { Auth } from "aws-amplify";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logginin, setLogginin] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleChange(event: FormEvent<FormControlProps & FormControl>) {
    const { name, value } = event.target as HTMLInputElement;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLogginin(true);
    try {
      await Auth.signIn(email, password);
      dispatch(loggedin);
      setLogginin(false);
      dispatch(push("/"));
    } catch (e) {
      setLogginin(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            name="email"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!validateForm() || logginin}
          type="submit"
        >
          {logginin ? "Logging in ..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;

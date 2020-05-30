import React, { useState, useContext, useEffect } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import { auth } from "firebase/app";

import logo from "../assets/logo/logo.svg";
import { AuthContext } from "../utils";
import { Container, Logar, Logo, Center, Main } from "./style";

export default function Login(props: RouteChildrenProps<any>) {
  const { history, location } = props;
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { from } = isAuthenticated
    ? {
        from: { pathname: "/" },
      }
    : {
        from: { pathname: "/login" },
      };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      history.replace(from);
    }
  }, [authLoading, isAuthenticated, from, history]);

  async function login() {
    try {
      await auth().signInWithEmailAndPassword(email, senha);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container>
      <Main>
        <Center>
          <Logo src={logo} alt="logo" />
        </Center>
        <Center>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </Center>
        <Center>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormGroup>
        </Center>
        <Center>
          <Button onClick={login}>Entrar</Button>
        </Center>
      </Main>
    </Container>
  );
}

import React, { useState } from "react";
import { firestore } from "firebase/app";
import { auth } from "../../firebase";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { Container, Containerperfil, Title } from "../style";

type Props = {
  id: string;
};
export default function Resposta({ id }: Props) {
  const [activeTab, setActiveTab] = useState("1");
  const [selected, setSelected] = useState(activeTab);
  const [retorno, setRetorno] = useState("");
  const [valor, setValor] = useState("");
  const user = auth.currentUser;

  async function enviar() {
    if (retorno) {
      await firestore()
        .collection("casos")
        .doc(id)
        .update({ retorno, valor: +valor, status: 2, resp: user?.uid });

      alert("Enviado");
    } else {
      alert("Não enviado, insira uma resposta");
    }
  }

  const toggle = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setSelected(tab);
    }
  };
  return (
    <Container>
      <Containerperfil>
        <Nav tab>
          <NavItem>
            <NavLink
              style={{
                backgroundColor: selected === "1" ? "#0c6eb8" : "#f1f1f1",
                color: selected === "1" ? "white" : "black"
              }}
              onClick={() => {
                toggle("1");
              }}
            >
              Atender Caso
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{
                backgroundColor: selected === "2" ? "#CC1010" : "#f1f1f1",
                color: selected === "2" ? "white" : "black"
              }}
              onClick={() => {
                toggle("2");
              }}
            >
              Recusar Caso
            </NavLink>
          </NavItem>
        </Nav>
        <Title>Informe os principais processos do caso ao cliente</Title>
        <Input
          onChange={e => setRetorno(e.target.value)}
          value={retorno}
          style={{ marginBottom: "15px" }}
          type="textarea"
          rows="6"
        />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <InputGroup style={{ marginBottom: "15px", width: "20%" }}>
              <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
              <Input
                onChange={e => setValor(e.target.value)}
                value={valor}
                placeholder="Valor"
                min={0}
                max={10000}
                type="number"
                step="1"
              />
              <InputGroupAddon addonType="prepend">.00</InputGroupAddon>
            </InputGroup>
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2"></TabPane>
        </TabContent>
        <Button onClick={enviar} color="success">
          Confirmar
        </Button>
      </Containerperfil>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import Actionbar from "./Actionbar/Actionbar";
import Infouser from "./Infouser/Infouser";
import Historia from "./Historia/Historia";
import Interacao from "./interacao";
import Resposta from "./Resposta/Resposta";

import { Container } from "./style";
import { useFirestoreDoc } from "../utils";

type Params = {
  id: string;
};

export default function CasoDetalhes(props: RouteComponentProps<Params>) {
  const params = props.match.params;
  const [caso] = useFirestoreDoc<Caso>("casos", params.id);
  const [verificado, setVerificado] = useState(false);
  const [finalizar, setFinalizar] = useState(true);
  const userResp = caso?.resp || "";
  const [user] = useFirestoreDoc<Usuarios>("usuarios", userResp);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (caso?.status === 1) {
      setVerificado(!verificado);
    }
    if (caso?.status === 3) {
      setFinalizar(false);
    }
  }, [caso?.status]);

  return (
    <Row>
      <Col md={4}>
        <Infouser id={params.id} />
      </Col>
      <Col md={8}>
        <Nav tabs className="mb-3">
          <NavItem style={{ width: "50%" }}>
            <NavLink
              className="text-center"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: activeTab === "1" ? "#ffffff" : "#666666",
                background: activeTab === "1" ? "#ef8157" : "#ffffff",
              }}
              onClick={() => {
                toggleTab("1");
              }}
            >
              Histórico Médico
            </NavLink>
          </NavItem>
          <NavItem style={{ width: "50%" }}>
            <NavLink
              className="text-center"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: activeTab === "2" ? "#ffffff" : "#666666",
                background: activeTab === "2" ? "#51cbce" : "#ffffff",
              }}
              onClick={() => {
                toggleTab("2");
              }}
            >
              Informações Pessoais
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Interacao id={params.id} />
          </TabPane>
          <TabPane tabId="2"></TabPane>
        </TabContent>
      </Col>
    </Row>
  );
}

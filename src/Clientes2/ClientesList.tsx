import React from "react";
import { Row, Col } from "reactstrap";

import { ContainerItem, TitleList, RouterLink } from "./style";
import { useFirestore } from "../utils";

export default function Clientes() {
  const [clientes] = useFirestore<Clientes>("clientes");

  return (
    <div>
      <TitleList>
        <Row>
          <Col sm="4">Nome do Cliente</Col>
          <Col sm="3">Email</Col>
          <Col sm="4">Telefone</Col>
          {/* <Col sm="2">Status</Col> */}
        </Row>
      </TitleList>

      {clientes.map(clientes => (
        <RouterLink key={clientes.key} to={`/clientes/${clientes.key}`}>
          <ContainerItem>
            <Row>
              <Col sm="4">{clientes.nome}</Col>
              <Col sm="3">{clientes.email}</Col>
              <Col sm="4">{clientes.telefone}</Col>
              {/* <Col sm="2">
               <BadgeStatus status={clientes.status} /> 
              Online
            </Col> */}
            </Row>
          </ContainerItem>
        </RouterLink>
      ))}
    </div>
  );
}

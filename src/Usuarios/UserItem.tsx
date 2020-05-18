import React from "react";
import { Row, Col } from "reactstrap";
import Foto from "../../src/assets/profile-user.png";

import { ContainerItem, TitleList, RouterLink, MiniFoto } from "./style";
import { useFirestore } from "../utils";

export default function Usuarios() {
  const [usuarios] = useFirestore<Usuarios>("usuarios");

  return (
    <div>
      <TitleList>
        <Row>
          <Col sm="1"></Col>
          <Col sm="2">Nº Matricula</Col>
          <Col sm="3">Nome do Usuário</Col>
          <Col sm="3">Contrato</Col>
          <Col sm="3">Local/QG</Col>
          {/* <Col sm="2">Status</Col> */}
        </Row>
      </TitleList>

      {usuarios.map(usuarios => (
        <RouterLink key={usuarios.key} to={`/usuarios/${usuarios.key}`}>
          <ContainerItem>
            <Row className={"d-flex align-items-center"}>
              <Col sm="1">
                <MiniFoto src={usuarios.avatar || Foto} />
              </Col>
              <Col sm="2">{usuarios.matricula}</Col>
              <Col sm="3">{usuarios.nome}</Col>
              <Col sm="3">{usuarios.contrato}</Col>
              <Col sm="3">{usuarios.localqg}</Col>
              {/* <Col sm="2">
               <BadgeStatus status={usuarios.status} /> 
              Online
            </Col> */}
            </Row>
          </ContainerItem>
        </RouterLink>
      ))}
    </div>
  );
}

import React from "react";
import { Row, Col, Button } from "reactstrap";
import Foto from "../../../src/assets/profile-user.png";
import { useFirestoreDoc, useFirestoreRef } from "../../utils";
import { Link } from "react-router-dom";

import {
  Container,
  ContainerInicio,
  Center,
  FotoPerfil,
  NomeUser,
  DisplayName
} from "../style";

export default function UserInfo({ id }: { id: string }) {
  const [caso] = useFirestoreDoc<Caso>("casos", id);
  const [cliente] = useFirestoreRef<Clientes>(caso?.usuario);
  const avatar = cliente?.avatar || Foto;

  return (
    <Container>
      <ContainerInicio>
        <Row className={"d-flex align-items-center"}>
          <Col md="6">
            <Row>
              <FotoPerfil className={"image-fluid"} src={avatar} />
              <Center>
                <NomeUser>
                  {cliente && cliente.nome}
                  <br />
                  <DisplayName>{cliente && cliente.display_name}</DisplayName>
                </NomeUser>
              </Center>
            </Row>
          </Col>
          <Col md="6" className={"d-flex justify-content-end"}>
            <Link to={`/clientes/${cliente?.uid}`}>
              <Button style={{ marginRight: "10px" }} color="info">
                Perfil do cliente
              </Button>
            </Link>
            <Button color="success">Chat do caso</Button>
          </Col>
        </Row>
      </ContainerInicio>
    </Container>
  );
}

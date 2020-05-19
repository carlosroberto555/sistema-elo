import React from "react";
import { Row, Col } from "reactstrap";
import { useFirestoreDoc } from "../utils";
import Foto from "../../src/assets/profile-user.png";
import {
  Container,
  Containerperfil,
  FotoPerfil,
  NomeUser,
  DisplayName,
  Center
} from "./style";

interface Props {
  id: string;
}
export default function Inicio({ id }: Props) {
  const [cliente] = useFirestoreDoc<Clientes>("clientes", id);

  const avatar = (cliente && cliente.avatar) || Foto;
  return (
    <Container>
      <Containerperfil style={{ padding: 50 }}>
        <Row className={"d-flex align-items-center"}>
          <Col md="6">
            <Row>
              <FotoPerfil src={avatar} />
              <Center>
                <NomeUser>
                  {cliente && cliente.nome}
                  <br />
                  <DisplayName>{cliente && cliente.display_name}</DisplayName>
                </NomeUser>
              </Center>
            </Row>
          </Col>
        </Row>
      </Containerperfil>
    </Container>
  );
}

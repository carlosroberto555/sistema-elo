import React from "react";
import Foto from "../../../src/assets/profile-user.png";
import { useFirestoreDoc, useFirestoreRef } from "../../utils";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, CardBody } from "reactstrap";

import {
  Container,
  ContainerInicio,
  Center,
  FotoPerfil,
  NomeUser,
  DisplayName,
} from "../style";

export default function UserInfo({ id }: { id: string }) {
  const [cliente] = useFirestoreDoc<Clientes>("clientes", id);
  const avatar = cliente?.avatar || Foto;

  return (
    <Card>
      <CardBody>
        <Center>
          <FotoPerfil className={"image-fluid"} src={avatar} />
        </Center>
        <Center>
          <NomeUser>{cliente && cliente.nome}</NomeUser>
        </Center>
        <Center>
          <DisplayName>{cliente && cliente.email}</DisplayName>
        </Center>
      </CardBody>
      <hr />
      {/* <CardBody>
        <Center>
          <Link to={`/clientes/${cliente?.key}`}>
            <Button style={{ marginRight: "10px" }} color="info">
              Nova Consulta
            </Button>
          </Link>
        </Center>
      </CardBody> */}
    </Card>
  );
}

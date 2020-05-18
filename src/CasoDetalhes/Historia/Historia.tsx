import React from "react";
import { Row, Col } from "reactstrap";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DescriptionIcon from "@material-ui/icons/Description";
import { Link } from "react-router-dom";
import { useFirestoreDoc } from "../../utils";
import PostFiles from "./PostFiles";

import { Container, Containerperfil, Title, Campocolor } from "../style";

export default function CasoDetalhes({ id }: { id: string }) {
  const [caso] = useFirestoreDoc<Caso>("casos", id);

  return (
    <Container>
      <Row form>
        <Col md="8" sm="12">
          <Containerperfil>
            <Title>
              <DescriptionIcon /> História
            </Title>
            <Campocolor>{caso?.descricao}</Campocolor>
          </Containerperfil>
        </Col>
        <Col md="4" sm="12">
          <Containerperfil>
            <Title>
              <MenuBookIcon /> Arquivos
            </Title>
            <Campocolor>
              {caso?.docs && <PostFiles file={caso.docs} />}
            </Campocolor>
          </Containerperfil>
        </Col>
      </Row>
    </Container>
  );
}

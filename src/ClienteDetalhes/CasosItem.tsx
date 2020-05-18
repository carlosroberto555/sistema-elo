import React from "react";
import { Row, Col, Button } from "reactstrap";
import BadgeStatus from "../components/BadgeStatus";

import { Container, ContainerItem, TitleList, RouterLink } from "./style";
import { useFirestore } from "../utils";

interface Props {
  id: string;
}

export default function Casos({ id }: Props) {
  const [casos] = useFirestore<Caso>("casos");
  function current(caso: Caso) {
    if (id === caso.uid) {
      return true;
    }
  }

  return (
    <Container>
      <TitleList>
        <Row>
          <Col md="2">Nº Caso</Col>
          <Col md="4">Tipo de recurso</Col>
          <Col md="2">Status</Col>
        </Row>
      </TitleList>
      {casos.filter(current).map(caso => (
        <RouterLink key={caso.key} to={`/casos/${caso.key}`}>
          <ContainerItem>
            <Row className="d-flex align-items-center">
              <Col md="2">{caso.numero}</Col>
              <Col md="4">{caso.tipo}</Col>
              <Col md="2">
                <BadgeStatus status={caso.status} />
              </Col>
              <Col md="4" className="d-flex justify-content-end">
                <Button color="success">Chat</Button>
              </Col>
            </Row>
          </ContainerItem>
        </RouterLink>
      ))}
    </Container>
  );
}

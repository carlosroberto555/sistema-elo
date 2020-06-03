import React from "react";
import Cadastrar from "./Cadastrar";
import { Row, Col } from "reactstrap";

import { Container } from "./style";

export default function Inicio() {
  return (
    <Container>
      <Row>
        <Col md="6">
          <Cadastrar />
        </Col>
        <Col md="6"></Col>
      </Row>
    </Container>
  );
}

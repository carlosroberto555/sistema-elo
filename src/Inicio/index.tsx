import React from "react";
import { Row, Col } from "reactstrap";
import { Container, Cubo } from "./style";

export default function Inicio() {
  return (
    <Container>
      <Row>
        <Col>
          <Cubo />
        </Col>
        <Col>
          <Cubo />
        </Col>
        <Col>
          <Cubo />
        </Col>
      </Row>
    </Container>
  );
}

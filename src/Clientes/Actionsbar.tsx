import React from "react";
import { Row, Col } from "reactstrap";
import Cadastrar from "./Cadastrar";

import { Container } from "./style";

type Props = {
  filter: number;
  onChangeFilter: (x: number) => void;
};

export default function Inicio({ filter, onChangeFilter }: Props) {
  return (
    <Container>
      <Row>
        <Col sm="6">
          <Cadastrar />
        </Col>
        <Col sm="6"></Col>
      </Row>
    </Container>
  );
}

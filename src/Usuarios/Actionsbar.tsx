import React, { useState } from "react";
import Cadastrar from "./Cadastrar";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Container, Search } from "./style";

export default function Inicio() {
  const [dropdown, setDropdown] = useState(false);
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

import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Container, Search } from "./style";

export default function Inicio() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Container>
      <Row>
        <Col sm="6"></Col>
        <Col sm="6">
          <Row>
            <Col sm="auto">
              <Search placeholder="Procurar..." />
            </Col>
            <Col sm="3">
              <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                <DropdownToggle caret>Filtro</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Aberto</DropdownItem>
                  <DropdownItem>Em Progresso</DropdownItem>
                  <DropdownItem>Finalizado</DropdownItem>
                  <DropdownItem>Pag. Pendente</DropdownItem>
                  <DropdownItem>Caso Negado</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col sm="3"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

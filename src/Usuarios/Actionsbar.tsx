import React, { useState } from "react";
import Cadastrar from "./Cadastrar";
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
        <Col md="6">
          <Cadastrar />
        </Col>
        <Col md="6">
          <Row>
            <Col md="auto">
              <Search placeholder="Procurar..." />
            </Col>
            <Col md="3">
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
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

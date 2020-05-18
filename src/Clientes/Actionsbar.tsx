import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Cadastrar from "./Cadastrar";

import { Container, Search } from "./style";
import { getStatus } from "../components/BadgeStatus";

type Props = {
  filter: number;
  onChangeFilter: (x: number) => void;
};

export default function Inicio({ filter, onChangeFilter }: Props) {
  const [dropdown, setDropdown] = useState(false);

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

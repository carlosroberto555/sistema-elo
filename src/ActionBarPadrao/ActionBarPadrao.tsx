import React, { useState } from "react";
// import SearchIcon from "@material-ui/icons/Search";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useFirestoreDoc } from "../utils";
import Foto from "../../src/assets/profile-user.png";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Container, Photo, NomeUser, Matricula, RouterLink } from "./style";
import { auth } from "firebase/app";

export default function ActionBarPadrao() {
  const [notify, setNotify] = useState(false);
  const currentUser = auth().currentUser;
  const [user] = useFirestoreDoc<Usuarios>(
    "usuarios",
    currentUser ? currentUser.uid : ""
  );
  const avatar = (user && user.avatar) || Foto;

  return (
    <Container>
      <Row>
        <Col sm="6">
          <h3>Resolve Direito</h3>
        </Col>
        <Col sm="6">
          <Row>
            <Col md="4"></Col>
            <Col sm="2">
              <Dropdown isOpen={notify} toggle={() => setNotify(!notify)}>
                <DropdownToggle
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <NotificationsActiveIcon style={{ color: "#4a4a4a" }} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Notificação 1</DropdownItem>
                  <DropdownItem>Notificação 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md="6">
              <RouterLink to="/perfil">
                <Row>
                  <Photo src={avatar} />
                  <NomeUser>
                    {user && user.nome} <br />
                    <Matricula>#IPN05</Matricula>
                  </NomeUser>
                </Row>
              </RouterLink>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
}

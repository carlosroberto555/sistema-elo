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
  DropdownItem,
} from "reactstrap";
import { Container, Photo, NomeUser, Matricula, RouterLink } from "./style";
import { auth } from "firebase/app";

export default function ActionBarPadrao() {
  const [notify, setNotify] = useState(false);
  const uid = auth().currentUser?.uid;
  const [user] = useFirestoreDoc<Usuarios>("usuarios", uid as string);
  const avatar = (user && user.avatar) || Foto;

  return (
    <Container>
      <Row>
        <Col sm="6">
          <h3>Clinica ELO</h3>
        </Col>
        <Col sm="6">
          <Row>
            <Col md="4"></Col>
            <Col sm="2"></Col>
            <Col md="6">
              <RouterLink to="/perfil">
                <Row>
                  <Photo src={avatar} />
                  <NomeUser>
                    {user && user.nome} <br />
                    <Matricula> {user && user.email} </Matricula>
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

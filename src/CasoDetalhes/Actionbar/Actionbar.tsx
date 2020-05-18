import React from "react";
// import SearchIcon from "@material-ui/icons/Search";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { Row, Col, Button } from "reactstrap";
import { useFirestoreDoc } from "../../utils";
import BadgeStatus from "../../components/BadgeStatus";

import { Container, CasoTitle } from "../style";

type Props = {
  id: string;
  finalizar: boolean;
};

export default function Inicio({ id, finalizar }: Props) {
  const [caso, snap] = useFirestoreDoc<Caso>("casos", id);

  function encerrado(status: number) {
    snap && snap.ref.update({ status });
  }

  return (
    <Container>
      <Row className={"d-flex align-items-center"}>
        <Col sm="3">
          <CasoTitle>Caso Nº: {caso?.numero}</CasoTitle>
        </Col>
        <Col>
          <CasoTitle>{caso?.tipo}</CasoTitle>
        </Col>
        <Col md="auto" className={"d-flex justify-content-end"}>
          <BadgeStatus status={caso?.status || 0} />
        </Col>
        <Col sm="auto" className={"d-flex justify-content-end"}>
          <Button
            disabled={finalizar}
            color="danger"
            onClick={() => encerrado(5)}
          >
            Finalizar caso
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

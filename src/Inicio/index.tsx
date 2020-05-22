import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Container, Cubo } from "./style";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useFirestore } from "../utils";

export default function Inicio() {
  const [consulta] = useFirestore<Consultas>("consultas");
  const localizer = momentLocalizer(moment);
  console.log(consulta);
  return (
    <Container>
      <Calendar localizer={localizer} events={consulta} />
    </Container>
  );
}

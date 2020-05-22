import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Container, Cubo } from "./style";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useFirestore } from "../utils";

export default function Inicio() {
  const [consulta, setConsulta] = useState([
    {
      id: 1,
      title: "consulta 01",
      start: moment("22-05-2020 08:00:00", "DD-MM-YYYY hh:mm:ss"),
      end: moment("23-05-2020 08:30:00", "DD-MM-YYYY hh:mm:ss"),
    },
  ]);
  const localizer = momentLocalizer(moment);
  console.log(consulta);
  return (
    <Container>
      <Calendar
        localizer={localizer}
        events={consulta}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
      />
    </Container>
  );
}

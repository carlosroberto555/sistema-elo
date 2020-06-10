import React from "react";
import { Container } from "./style";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { useFirestore } from "../utils";
import NovaConsulta from "./NovaConsulta";

export default function Inicio() {
  const [agenda] = useFirestore<Consultas>("agenda");
  const localizer = momentLocalizer(moment);
  console.log(agenda);
  return (
    <Container>
      <NovaConsulta />
      <Calendar
        localizer={localizer}
        events={agenda}
        startAccessor="start"
        endAccessor="end"
      />
    </Container>
  );
}

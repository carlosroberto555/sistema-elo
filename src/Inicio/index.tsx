import React, { useMemo } from "react";
import { Container } from "./style";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import { useFirestore } from "../utils";
import NovaConsulta from "./NovaConsulta";
import { firestore } from "firebase";

type FormatListFunction<T> = (s: firestore.QueryDocumentSnapshot) => T;

const formatDoc: FormatListFunction<Consulta> = (snap) => {
  const consulta = snap.data() as Consulta;

  return {
    ...consulta,
    start: new Date(consulta.start),
    end: new Date(consulta.end),
  };
};

export default function Inicio() {
  const [agenda] = useFirestore<Consulta>("agenda", formatDoc);
  const localizer = momentLocalizer(moment);

  // const events = useMemo<Consultas>(() => {
  //   return agenda.map((consulta) => {
  //     return {
  //       ...consulta,
  //       start: new Date(consulta.start),
  //       end: new Date(consulta.end),
  //     };
  //   });
  // }, [agenda]);

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

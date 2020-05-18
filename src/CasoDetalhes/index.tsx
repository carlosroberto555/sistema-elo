import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import Actionbar from "./Actionbar/Actionbar";
import Infouser from "./Infouser/Infouser";
import Historia from "./Historia/Historia";
import Interacao from "./interacao";
import Resposta from "./Resposta/Resposta";

import { Container } from "./style";
import { useFirestoreDoc } from "../utils";

type Params = {
  id: string;
};

export default function CasoDetalhes(props: RouteComponentProps<Params>) {
  const params = props.match.params;
  const [caso] = useFirestoreDoc<Caso>("casos", params.id);
  const [verificado, setVerificado] = useState(false);
  const [finalizar, setFinalizar] = useState(true);
  const userResp = caso?.resp || "";
  const [user] = useFirestoreDoc<Usuarios>("usuarios", userResp);

  useEffect(() => {
    if (caso?.status === 1) {
      setVerificado(!verificado);
    }
    if (caso?.status === 3) {
      setFinalizar(false);
    }
  }, [caso?.status]);

  return (
    <div>
      <Actionbar id={params.id} finalizar={finalizar} />
      <Infouser id={params.id} />
      <Historia id={params.id} />
      {verificado ? <Resposta id={params.id} /> : <Interacao id={params.id} />}
      <Container>Em atendimento por: {user?.nome}</Container>
    </div>
  );
}

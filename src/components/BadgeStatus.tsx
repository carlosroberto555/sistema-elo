import React from "react";
import { Row } from "reactstrap";
import { ColorStatus, Center } from "../Clientes/style";

export function getStatus(status: number) {
  switch (status) {
    case 0:
      return ["Todos", "#ff0000"];

    case 1:
      return ["Em Análise", "#ded41b"];

    case 2:
      return ["Pag. Pendente", "#d6a609"];

    case 3:
      return ["Em Progresso", "#0a0791"];

    case 4:
      return ["Caso Negado", "#e63030"];

    case 5:
      return ["Finalizado", "#e31b1b"];

    case 6:
      return ["Aberto", "#4056F4"];

    default:
      return [];
  }
}

type Props = {
  status: number;
  style?: object;
};

export default function BadgeStatus(props: Props) {
  const { status, ...rest } = props;
  const [nome, backgroundColor] = getStatus(props.status);
  return (
    <div {...rest}>
      <Row>
        <Center>
          <ColorStatus style={{ backgroundColor }} />
          {nome}
        </Center>
      </Row>
    </div>
  );
}

// Em analise - Amarelo
// Em Progresso - azul
// Pag. pendente -
// Caso negado - vermelho
// Finalizado - verde

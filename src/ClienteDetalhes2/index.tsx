import React from "react";
import Inicio from "./Inicio";
import ClienteItem from "./ClienteItem";
import CasosItem from "./CasosItem";
import { RouteComponentProps } from "react-router-dom";

// import { Container } from './styles';
type Params = {
  id: string;
};
export default function ClienteDetalhes(props: RouteComponentProps<Params>) {
  const { history } = props;
  const params = props.match.params;
  console.log(params);
  return (
    <div>
      <Inicio id={params.id} />
      <ClienteItem onGoBack={() => history.goBack()} id={params.id} />
      <CasosItem id={params.id} />
    </div>
  );
}

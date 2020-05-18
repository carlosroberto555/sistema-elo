import React from "react";
import UsersItem from "./UsersItem";
import { RouteComponentProps } from "react-router-dom";

// import { Container } from './styles';
type Params = {
  id: string;
};
export default function Usuarios(props: RouteComponentProps<Params>) {
  const { history } = props;
  const params = props.match.params;
  console.log(params);
  return (
    <div>
      <UsersItem onGoBack={() => history.goBack()} id={params.id} />
    </div>
  );
}

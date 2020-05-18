import React from "react";
import Actionsbar from "./Actionsbar";
import ClientesList from "./ClientesList";
// import { Container } from './styles';

export default function Inicio() {
  return (
    <div>
      <Actionsbar />
      <ClientesList />
    </div>
  );
}

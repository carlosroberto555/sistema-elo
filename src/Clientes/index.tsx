import React, { useState } from "react";
import Actionsbar from "./Actionsbar";
import ClientesItem from "./ClientesItem";
// import { Container } from './styles';

export default function Inicio() {
  const [filter, setFilter] = useState(0);
  return (
    <div>
      <Actionsbar filter={filter} onChangeFilter={setFilter} />
      <ClientesItem filter={filter} />
    </div>
  );
}

import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Foto from "../assets/profile-user.png";

import { FotoPerfil } from "./style";
import { useFirestore } from "../utils";

type Props = {
  filter: number;
};

export default function Clientes({ filter }: Props) {
  const [clientes] = useFirestore<Clientes>("clientes");

  function bloqueado(cliente: Clientes) {
    if (cliente.status !== 0) {
      return true;
    }
  }
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>telefone</th>
          <th className="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.filter(bloqueado).map((cliente) => (
          <tr key={cliente.key}>
            <th style={{ verticalAlign: "middle" }}>
              <FotoPerfil src={cliente.avatar || Foto} className="mr-2" />{" "}
              {cliente.nome}
            </th>
            <th style={{ verticalAlign: "middle" }}>{cliente.email}</th>
            <th style={{ verticalAlign: "middle" }}>{cliente.telefone}</th>

            <th style={{ verticalAlign: "middle" }} className="text-right">
              <Link to={`/clientes/${cliente.key}`}>
                <Button color="info">Detalhes</Button>
              </Link>
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

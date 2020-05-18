import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import BadgeStatus from "../components/BadgeStatus";
import { Link } from "react-router-dom";

import { ContainerItem, TitleList, RouterLink } from "./style";
import { useFirestore } from "../utils";

type Props = {
  filter: number;
};

export default function Clientes({ filter }: Props) {
  const [clientes] = useFirestore<Clientes>("clientes");

  function filtro(caso: Caso) {
    if (filter === 0 || caso.status === filter) {
      return true;
    }
  }

  return (
    <div>
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
          {clientes.map((cliente) => (
            <tr key={cliente.uid}>
              <th>{cliente.nome}</th>
              <th>{cliente.email}</th>
              <th>{cliente.numero}</th>
              <th className="text-right">
                <Link to={`/clientes/${cliente.uid}`}>
                  <Button color="info">Detalhes</Button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

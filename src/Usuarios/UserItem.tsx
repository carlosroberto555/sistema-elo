import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import { useFirestore } from "../utils";

export default function UserItem() {
  const [usuarios] = useFirestore<Usuarios>("usuarios");

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>telefone</th>
            <th>Acesso</th>
            <th className="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.key}>
              <th>{user.nome}</th>
              <th>{user.email}</th>
              <th>{user.telefone}</th>
              <th>{user.acesso}</th>
              <th className="text-right">
                <Link to={`/usuarios/${user.key}`}>
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

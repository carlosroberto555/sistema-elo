import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Foto from "../assets/profile-user.png";

import { useFirestore } from "../utils";
import { FotoPerfil } from "./style";

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
            <th>Status</th>
            <th className="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.key}>
              <th style={{ verticalAlign: "middle" }}>
                <FotoPerfil src={user.avatar || Foto} className="mr-2" />
                {user.nome}
              </th>
              <th style={{ verticalAlign: "middle" }}>{user.email}</th>
              <th style={{ verticalAlign: "middle" }}>{user.telefone}</th>
              <th style={{ verticalAlign: "middle" }}>{user.status}</th>
              <th style={{ verticalAlign: "middle" }} className="text-right">
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

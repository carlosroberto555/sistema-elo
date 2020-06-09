import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { auth } from "firebase";

export default function ModalSenha() {
  const [newPassword, setNewPassword] = useState("");
  const [password01, setPassword01] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [modal, setModal] = useState(false);

  function toggle() {
    setModal(!modal);
    setNewPassword("");
    setPassword01("");
  }

  useEffect(() => {
    if (newPassword !== "" && newPassword === password01) {
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  }, [newPassword, password01]);

  async function NovaSenha() {
    const user = await auth().currentUser;
    user &&
      user
        .updatePassword(newPassword)
        .then(function() {
          setModal(false);
          setNewPassword("");
        })
        .catch(function(error) {
          alert(error);
        });
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Trocar Senha
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Definir nova senha</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">Nova senha</Label>
            <Input
              type="password"
              name="senhaAtual"
              value={password01}
              onChange={(e) => setPassword01(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Confirme sua nova Senha</Label>
            <Input
              type="password"
              name="novaSenha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cacelar
          </Button>{" "}
          <Button disabled={confirm} color="success" onClick={NovaSenha}>
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

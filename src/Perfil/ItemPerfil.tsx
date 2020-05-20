import React, { useState } from "react";
import { Row, Col, Input, Label, FormGroup, Button } from "reactstrap";
import Foto from "../../src/assets/profile-user.png";
import { useFirestoreDoc } from "../utils";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { Container, Containerperfil, FotoPerfil, Center } from "./style";
import { InputType } from "reactstrap/lib/Input";
import { firestore, auth } from "firebase/app";

type Snapshot = firestore.DocumentSnapshot;

interface FieldProps extends FieldRenderProps<string> {
  label: string;
  delete: void;
}
function FieldInput({ label, input, meta, ...rest }: FieldProps) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...input} {...rest} type={input.type as InputType} />
    </FormGroup>
  );
}
const required = (value?: string) => (value ? undefined : "Campo obrigatório");

interface Props {
  id: string;
  onGoBack: () => void;
}

export default function ItemPerfil({ id, onGoBack }: Props) {
  const [editar, setEditar] = useState(false);
  const currentUser = auth().currentUser;
  const [user] = useFirestoreDoc<Usuarios>(
    "usuarios",
    currentUser ? currentUser.uid : ""
  );

  const avatar = (user && user.avatar) || Foto;

  return (
    <Form
      onSubmit={async (values) => {
        await firestore()
          .collection("usuarios")
          .doc(currentUser ? currentUser.uid : "")
          .update(values);
        if (currentUser) {
          currentUser.updateProfile({
            displayName: values.nome,
          });
        }
        setEditar(false);
      }}
      initialValues={user}
      render={({ handleSubmit, submitting }) => (
        <Container>
          <Containerperfil>
            <Center>
              <Row from>
                <Col>
                  <FotoPerfil src={avatar} />
                </Col>
                <Col>
                  <Field
                    disabled={!editar}
                    name="login"
                    label="Email de Login"
                    placeholder="Login"
                    component={FieldInput}
                  />
                </Col>
                <Col>
                  <Field
                    disabled={!editar}
                    type="password"
                    name="senha"
                    label="Senha"
                    placeholder="Senha"
                    component={FieldInput}
                  />
                </Col>
              </Row>
            </Center>
            <hr />
            <Row>
              <Col md={12}>
                <Row form>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="nome"
                      label="Nome"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="telefone"
                      label="Telefone"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                  <Col md={8}>
                    <Field
                      disabled={!editar}
                      name="email"
                      label="Email"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={4}>
                    <Field
                      disabled={!editar}
                      type="select"
                      name="status"
                      label="Status"
                      component={FieldInput}
                    >
                      <option>Ativo</option>
                      <option>Bloqueado</option>
                    </Field>
                  </Col>
                  <Col md={8}>
                    <Field
                      disabled={!editar}
                      name="cpf"
                      label="CPF"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={4}>
                    <Field
                      disabled={!editar}
                      type="select"
                      name="acesso"
                      label="Tipo de Acesso"
                      component={FieldInput}
                    >
                      <option>Master</option>
                      <option>Atendimento</option>
                      <option>Médico</option>
                    </Field>
                  </Col>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="crm"
                      label="CRM"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="especialidade"
                      label="Especialidade"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            {editar ? (
              <Row>
                <Col>
                  <Button
                    style={{ marginRight: 10 }}
                    color="success"
                    disabled={submitting}
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
                  <Button onClick={() => setEditar(false)}>Cancelar</Button>
                </Col>
              </Row>
            ) : (
              <Button color="primary" onClick={() => setEditar(true)}>
                Editar
              </Button>
            )}
          </Containerperfil>
        </Container>
      )}
    />
  );
}

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
      onSubmit={async values => {
        await firestore()
          .collection("usuarios")
          .doc(currentUser ? currentUser.uid : "")
          .update(values);
        if (currentUser) {
          currentUser.updateProfile({
            displayName: values.nome
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
              <Col
                md={6}
                style={{ borderRight: "1px solid rgba(0, 0, 0, .1)" }}
              >
                <Row form>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="nome"
                      label="Nome"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="email"
                      label="Email"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="telefone"
                      label="Telefone"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="date"
                      disabled={!editar}
                      name="nascimento"
                      label="Data de Nascimento"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="10">
                    <Field
                      disabled={!editar}
                      name="endereco"
                      label="Endereco"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md="2">
                    <Field
                      disabled={!editar}
                      name="numero"
                      label="Numero"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md={3}>
                    <Field
                      disabled={!editar}
                      name="bairro"
                      label="Bairro"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={4}>
                    <Field
                      disabled={!editar}
                      name="cidade"
                      label="Cidade"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      disabled={!editar}
                      name="estado"
                      label="Estado"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={3}>
                    <Field
                      disabled={!editar}
                      name="cep"
                      label="CEP"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row form>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="matricula"
                      label="Matricula"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="select"
                      disabled={!editar}
                      name="contrato"
                      label="Contrato"
                      component={FieldInput}
                    >
                      <option>Atual: {user && user.contrato}</option>
                      <hr />
                      <option>Efetivo</option>
                      <option>Temporário</option>
                    </Field>
                  </Col>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="funcao"
                      label="Funcao"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="select"
                      disabled={!editar}
                      name="localqg"
                      label="Local/QG"
                      component={FieldInput}
                    >
                      <option>Atual: {user && user.localqg}</option>
                      <hr />
                      <option>Ipatinga - Bom Retiro</option>
                      <option>Belo Horizonte</option>
                    </Field>
                  </Col>
                </Row>
                <Row form>
                  <Col md="8">
                    <Field
                      disabled={!editar}
                      name="emailpro"
                      label="email @resovedireito"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md="4">
                    <Field
                      type="select"
                      disabled={!editar}
                      name="acesso"
                      label="Nivel de Acesso"
                      component={FieldInput}
                    >
                      <option>Atual: {user && user.acesso}</option>
                      <hr />
                      <option>Analista</option>
                      <option>Financeiro</option>
                      <option>Master</option>
                      <option>Sem Acesso</option>
                    </Field>
                  </Col>
                </Row>
                <Field
                  type="textarea"
                  disabled={!editar}
                  name="infoextra"
                  label="Informações Extra"
                  component={FieldInput}
                />
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

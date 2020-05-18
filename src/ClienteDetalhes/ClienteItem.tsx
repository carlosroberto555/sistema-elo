import React, { useState } from "react";
import { Row, Col, Input, Label, FormGroup } from "reactstrap";
import { useFirestoreDoc } from "../utils";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { Container, Containerperfil } from "./style";
import { InputType } from "reactstrap/lib/Input";
import { firestore } from "firebase/app";

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

export default function ClienteItem({ id, onGoBack }: Props) {
  const [editar, setEditar] = useState(false);
  const [cliente] = useFirestoreDoc<Clientes>("clientes", id);

  return (
    <Form
      onSubmit={async values => {
        await firestore()
          .collection("clientes")
          .doc(id)
          .update(values);
        setEditar(false);
      }}
      initialValues={cliente}
      render={({ handleSubmit, submitting }) => (
        <Container>
          <Containerperfil>
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
                      name="display_name"
                      label="Responde Por"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <Field
                      disabled={!editar}
                      name="email"
                      label="Email"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="date"
                      disabled={!editar}
                      name="dt_nascimento"
                      label="Data de Nascimento"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <Field
                      disabled={!editar}
                      name="telefone"
                      label="Telefone"
                      component={FieldInput}
                    />
                  </Col>
                  <Col md="6">
                    <Field
                      disabled={!editar}
                      name="cpf"
                      label="CPF"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
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
                <Row form>
                  <Col md={12}>
                    <Field
                      disabled={!editar}
                      name="profissao"
                      label="Profissão"
                      component={FieldInput}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Containerperfil>
        </Container>
      )}
    />
  );
}

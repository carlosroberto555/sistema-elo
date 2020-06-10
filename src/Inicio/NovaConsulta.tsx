import React, { useState } from "react";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { InputType } from "reactstrap/lib/Input";
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
import { firestore } from "firebase/app";

interface Props extends FieldRenderProps<string> {
  label: string;
}
function FieldInput({ label, input, meta, ...rest }: Props) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...input} {...rest} type={input.type as InputType} />
      {meta.error && meta.touched && (
        <span style={{ color: "#9e3131" }}>{meta.error}</span>
      )}
    </FormGroup>
  );
}
const required = (value?: string) => (value ? undefined : "Campo obrigatório");

export default function NovaConsulta({ dados }: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  interface NewDate {
    title: string;
    start: Date;
    end: Date;
  }
  return (
    <div>
      <Button style={{ marginBottom: 15 }} color="primary" onClick={toggle}>
        Nova consulta
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={async (values) => {
              firestore()
                .collection("agenda")
                .add(values);

              setModal(!modal);
            }}
            render={({ handleSubmit, form }) => (
              <div>
                <Field
                  name="title"
                  label="Titulo"
                  component={FieldInput}
                  validade={required}
                />
                <Field
                  name="start"
                  label="Inicio da colsulta"
                  component={FieldInput}
                  validade={required}
                />
                <Field
                  name="end"
                  label="Fim da consulta"
                  component={FieldInput}
                  validade={required}
                />
                <ModalFooter>
                  <Button color="danger" onClick={toggle}>
                    Cancelar
                  </Button>{" "}
                  <Button color="success" onClick={handleSubmit}>
                    Criar Consulta
                  </Button>
                </ModalFooter>
              </div>
            )}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

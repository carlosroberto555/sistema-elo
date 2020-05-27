import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Foto from "../assets/profile-user.png";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { firestore, storage } from "firebase/app";
import { tempAuth } from "../firebase";
import { MD5 } from "object-hash";

import { Center, FotoPerfil, AddImg } from "./style";
import { InputType } from "reactstrap/lib/Input";
import FirebaseStorageUpload from "../FirebaseStorageUpload";
import formatString from "format-string-by-pattern";
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

const mask = {
  telefone: "(99) 99999-9999",
  cpf: "999.999.999-99",
  cep: "99999-999",
};

export default function Cadastrar() {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [imgPreview, setImgPreview] = useState();

  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImgPreview(e.target.files[0]);
    }
  }

  async function cadastrarUsuario(values: Clientes) {
    const hash = MD5(values);

    if (imgPreview) {
      const snap = await storage()
        .ref("/profile/" + hash + ".jpg")
        .put(imgPreview as any);
      values.avatar = await snap.ref.getDownloadURL();
    }

    await firestore()
      .collection("clientes")
      .doc(hash)
      .set(values);

    toggleAll();
  }

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  return (
    <Form
      onSubmit={cadastrarUsuario}
      render={({ handleSubmit, submitting, form }) => (
        <div>
          <Button color="primary" onClick={toggle}>
            <AddIcon /> Novo Cliente
          </Button>
          <Modal style={{ minWidth: "80%" }} isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Adicionar novo Cliente</ModalHeader>
            <ModalBody>
              <Row>
                {/* ======================== LADO 01 ================= */}
                <Col
                  md={6}
                  style={{ borderRight: "1px solid rgba(0, 0, 0, .2)" }}
                >
                  <Center>
                    <Label for="input-file">
                      <FotoPerfil
                        src={
                          imgPreview ? URL.createObjectURL(imgPreview) : Foto
                        }
                      />
                    </Label>
                    <AddImg
                      id="input-file"
                      type="file"
                      onChange={onChangeImage}
                    />
                  </Center>
                  <Row form>
                    <Col md={8}>
                      <Field
                        type="name"
                        name="nome"
                        label="Nome"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
                        type="select"
                        name="sexo"
                        label="Sexo"
                        component={FieldInput}
                      >
                        <option>Masculino</option>
                        <option>Feminino</option>
                      </Field>
                    </Col>
                    <Col md={5}>
                      <Field
                        type="date"
                        name="nascimento"
                        label="Data de Nasc."
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={7}>
                      <Field
                        type="select"
                        name="estadocivil"
                        label="Estado Civil"
                        component={FieldInput}
                      >
                        <option>Solteiro(a)</option>
                        <option>Casado(a)</option>
                        <option>Divorciado(a)</option>
                        <option>Viuvo(a)</option>
                      </Field>
                    </Col>
                    <Col md={6}>
                      <Field name="rg" label="RG" component={FieldInput} />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="cpf"
                        label="CPF"
                        component={FieldInput}
                        parse={formatString(mask.cpf)}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="tel"
                        name="telefone"
                        label="Celular"
                        component={FieldInput}
                        validate={required}
                        parse={formatString(mask.telefone)}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="email"
                        name="email"
                        label="Email"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                  </Row>
                </Col>

                {/* ======================== LADO 02 ================= */}
                <Col md={6} style={{ marginTop: "1.25rem" }}>
                  <Row form>
                    <Col md={12}>
                      <Field
                        name="profissao"
                        label="Profissão"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={5}>
                      <Field
                        name="plano"
                        label="Plano"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={7}>
                      <Field
                        name="numplano"
                        label="Numero do Plano"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={8}>
                      <Field
                        name="endereco"
                        label="Endereço/Rua"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
                        name="cep"
                        label="CEP"
                        component={FieldInput}
                        parse={formatString(mask.cep)}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
                        name="numero"
                        label="Numero"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={8}>
                      <Field
                        name="bairro"
                        label="Bairro"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="cidade"
                        label="Cidade"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="estado"
                        label="Estado"
                        component={FieldInput}
                      />
                    </Col>

                    <Col md={12}>
                      <Field
                        name="complemento"
                        label="Complemento"
                        component={FieldInput}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <br />
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
              >
                <ModalHeader>Confirme sua ação!</ModalHeader>
                <ModalBody>
                  Tem certeza que deseja adicionar o Cliente com estas
                  informações?
                </ModalBody>
                <ModalFooter>
                  <Button type="button" color="danger" onClick={toggleNested}>
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    color="success"
                    onClick={handleSubmit}
                    onChange={form.reset}
                  >
                    {submitting ? "Enviando..." : "Confirmar"}
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="danger" onClick={toggle}>
                Cancelar
              </Button>
              <Button
                type="button"
                color="success"
                disabled={submitting}
                onClick={toggleNested}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    />
  );
}

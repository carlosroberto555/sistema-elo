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
import formatString from "format-string-by-pattern";
import { firestore } from "firebase/app";
import { tempAuth } from "../firebase";

import { Center, FotoPerfil, AddImg } from "./style";
import { InputType } from "reactstrap/lib/Input";
import FirebaseStorageUpload from "../FirebaseStorageUpload";

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

interface CadastroFormInputs {
  login: string;
  senha: string;
  nome: string;
  uid: string;
}

export default function Usuarios() {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [imgPreview, setImgPreview] = useState();

  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      //@ts-ignore
      setImgPreview(e.target.files[0]);
    }
  }

  async function cadastrarUsuario(values: CadastroFormInputs) {
    const { senha, ...rest } = values;

    const data = await tempAuth.createUserWithEmailAndPassword(
      rest.login,
      senha
    );

    if (data && data.user) {
      await data.user.updateProfile({ displayName: rest.nome });
      const uid = data.user.uid;

      await firestore()
        .collection("usuarios")
        .doc(uid)
        .set(rest);

      if (imgPreview) {
        await new FirebaseStorageUpload("/profile", imgPreview)
          .start(uid + ".jpg")
          .onProgress(console.log);
      }
    }

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
            <AddIcon /> Novo usuário
          </Button>
          <Modal style={{ minWidth: "80%" }} isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Adicionar novo Usuário</ModalHeader>
            <ModalBody>
              <Center>
                <Row from>
                  <Col>
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
                  </Col>
                  <Col>
                    <Field
                      inline={true}
                      name="login"
                      label="Email de Login"
                      placeholder="Login"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="password"
                      name="senha"
                      label="Senha"
                      placeholder="Senha"
                      component={FieldInput}
                      validate={required}
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
                        name="nome"
                        label="Nome"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="telefone"
                        label="Telefone"
                        component={FieldInput}
                        validate={required}
                        parse={formatString(mask.telefone)}
                      />
                    </Col>
                    <Col md={8}>
                      <Field
                        name="email"
                        label="Email"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
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
                        name="cpf"
                        label="CPF"
                        component={FieldInput}
                        parse={formatString(mask.cpf)}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
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
                      <Field name="crm" label="CRM" component={FieldInput} />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="especialidade"
                        label="Especialidade"
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
                  Tem certeza que deseja adicionar o usuário com estas
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

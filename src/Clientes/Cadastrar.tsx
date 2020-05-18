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
  Col
} from "reactstrap";
import { Form, Field, FieldRenderProps } from "react-final-form";
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

        // storage()
        //   .ref("/profile/" + uid + ".jpg")
        //   .put(imgPreview)
        //   .on(storage.TaskEvent.STATE_CHANGED, snap => {
        //     const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        //     setImageProgress(+progress.toFixed(0));
        //     if (snap.state === storage.TaskState.SUCCESS) {
        //       snap.ref.getDownloadURL().then(url => {
        //         data.user &&
        //           data.user.updateProfile({
        //             displayName: rest.nome,
        //             photoURL: url
        //           });
        //       });
        //     }
        //   });
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
            <ModalHeader toggle={toggle}>Adicionar novo usuário</ModalHeader>
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
                <Col
                  md={6}
                  style={{ borderRight: "1px solid rgba(0, 0, 0, .1)" }}
                >
                  <Row form>
                    <Col md={6}>
                      <Field
                        name="nome"
                        label="Nome"
                        placeholder="Nome"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="email"
                        label="Email"
                        placeholder="Email"
                        component={FieldInput}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <Field
                        name="telefone"
                        label="Telefone"
                        placeholder="Telefone"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="date"
                        name="nascimento"
                        label="Data de Nascimento"
                        component={FieldInput}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={10}>
                      <Field
                        name="endereco"
                        label="Endereço"
                        placeholder="Endereço/Rua"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={2}>
                      <Field
                        name="numero"
                        label="Numero"
                        placeholder="Nº"
                        component={FieldInput}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={3}>
                      <Field
                        name="bairro"
                        label="Bairro"
                        placeholder="Bairro"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
                        name="cidade"
                        label="Cidade"
                        placeholder="Cidade"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={2}>
                      <Field
                        name="estado"
                        label="Estado"
                        placeholder="Estado"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={3}>
                      <Field
                        name="cep"
                        label="CEP"
                        placeholder="CEP"
                        component={FieldInput}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row form>
                    <Col md={6}>
                      <Field
                        name="matricula"
                        label="Matricula"
                        placeholder="Matricula"
                        component={FieldInput}
                        validate={required}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="select"
                        name="contrato"
                        label="Contrato"
                        placeholder="Contrato"
                        component={FieldInput}
                        validate={required}
                      >
                        <option>Contrato</option>
                        <option value="efetivo">Efetivo</option>
                        <option value="temporario">Temporário</option>
                      </Field>
                    </Col>
                    <Col md={6}>
                      <Field
                        name="funcao"
                        label="Função"
                        placeholder="Função"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="select"
                        name="localqg"
                        label="Local/QG"
                        placeholder="Local/QG"
                        component={FieldInput}
                        validate={required}
                      >
                        <option>Local / QG</option>
                        <option value="qg-ipatinga">
                          Ipatinga - Bom Retiro
                        </option>
                        <option value="qh-bh">Belo Horizonte</option>
                      </Field>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8">
                      <Field
                        name="emailpro"
                        label="Email @resolvedireito"
                        placeholder="Email @resolvedireito"
                        component={FieldInput}
                      />
                    </Col>
                    <Col md="4">
                      <Field
                        type="select"
                        name="acesso"
                        label="Nivel de Acesso"
                        placeholder="Acesso"
                        component={FieldInput}
                        validate={required}
                      >
                        <option>Acesso</option>
                        <option value="analista">Analista</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="master">Master</option>
                        <option value="nenhum">Sem Acesso</option>
                      </Field>
                    </Col>
                  </Row>
                  <Field
                    type="textarea"
                    name="infoextra"
                    label="Informações Extra"
                    placeholder="Informações Extra"
                    component={FieldInput}
                  />
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

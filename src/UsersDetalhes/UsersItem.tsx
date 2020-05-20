import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Foto from "../../src/assets/profile-user.png";
import { useFirestoreDoc } from "../utils";
import { Form, Field, FieldRenderProps } from "react-final-form";
import {
  Container,
  Containerperfil,
  FotoPerfil,
  Center,
  AddImg,
} from "./style";
import { InputType } from "reactstrap/lib/Input";
import { firestore, storage } from "firebase/app";

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

export default function Perfil({ id, onGoBack }: Props) {
  const [editar, setEditar] = useState(false);
  const [user] = useFirestoreDoc<Usuarios>("usuarios", id);
  const [modal, setModal] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  // const [storageImage, setStorageImage] = useState();

  const avatar = imgPreview
    ? URL.createObjectURL(imgPreview)
    : (user && user.avatar) || Foto;

  // useEffect(() => {
  //   try {
  //     storage()
  //       .ref("/profile")
  //       .child(id + ".jpg")
  //       .getDownloadURL()
  //       .then(url => setStorageImage(url));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      //@ts-ignore
      setImgPreview(e.target.files[0]);
    }
  }

  const toggle = () => setModal(!modal);
  async function apagar() {
    await firestore()
      .collection("usuarios")
      .doc(id)
      .delete();
    onGoBack();
  }

  return (
    <Form
      onSubmit={async (values) => {
        if (imgPreview) {
          const snap = await storage()
            .ref("/profile/" + id + ".jpg")
            .put(imgPreview as any);
          values.avatar = await snap.ref.getDownloadURL();
        }

        await firestore()
          .collection("usuarios")
          .doc(id)
          .update(values);

        setEditar(false);
      }}
      initialValues={user}
      render={({ handleSubmit, submitting }) => (
        <Container>
          <Containerperfil>
            <Center>
              <Row form>
                <Col>
                  <Label for="input-file">
                    <FotoPerfil src={avatar} />
                  </Label>
                  <AddImg
                    id="input-file"
                    type="file"
                    onChange={onChangeImage}
                    disabled={!editar}
                  />
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
                    {submitting ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button onClick={() => setEditar(false)}>Cancelar</Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    onClick={toggle}
                    color="danger"
                    style={{ position: "absolute", right: 15 }}
                  >
                    Excluir
                  </Button>
                </Col>
              </Row>
            ) : (
              <Button color="primary" onClick={() => setEditar(true)}>
                Editar
              </Button>
            )}
          </Containerperfil>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Deletar usuário {user && user.nome}
            </ModalHeader>
            <ModalBody>
              Tem certeza que deseja DELETAR o usuário {user && user.nome}?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggle}>
                Cancelar
              </Button>{" "}
              <Button color="success" onClick={apagar}>
                Confirmar
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      )}
    />
  );
}

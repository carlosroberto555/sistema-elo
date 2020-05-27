import React, { useState } from "react";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { useFirestoreDoc } from "../../utils";
import { firestore, storage } from "firebase/app";
import formatString from "format-string-by-pattern";
import { Center, FotoPerfil, AddImg } from "../style";
import Foto from "../../../src/assets/profile-user.png";
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { InputType } from "reactstrap/lib/Input";

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
interface props {
  id: string;
  onGoBack: () => void;
}
export default function TabDados({ id, onGoBack }: props) {
  const [editar, setEditar] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dados] = useFirestoreDoc<Clientes>("clientes", id);
  const toggle = () => setModalDelete(!modalDelete);
  const [imgPreview, setImgPreview] = useState();

  const avatar = imgPreview
    ? URL.createObjectURL(imgPreview)
    : (dados && dados.avatar) || Foto;

  async function deletarUsuario() {
    await firestore()
      .collection("clientes")
      .doc(id)
      .delete();
    toggle();
    onGoBack();
  }
  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      //@ts-ignore
      setImgPreview(e.target.files[0]);
    }
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
          .collection("clientes")
          .doc(id)
          .update(values);
        setEditar(false);
      }}
      initialValues={dados}
      render={({ handleSubmit, submitting, form }) => (
        <>
          <Card style={{ marginBottom: 15 }}>
            <CardBody>
              <Center>
                <Label for="input-file">
                  <FotoPerfil src={avatar} />
                </Label>
                <AddImg
                  id="input-file"
                  type="file"
                  onChange={onChangeImage}
                  disabled={!editar}
                />
              </Center>
              <Row form>
                <Col md="8">
                  <Field
                    name="nome"
                    label="Nome"
                    component={FieldInput}
                    disabled={!editar}
                    validate={required}
                  />
                </Col>
                <Col md="4">
                  <Field
                    type="select"
                    name="sexo"
                    label="Sexo"
                    component={FieldInput}
                    disabled={!editar}
                  >
                    <option>Masculino</option>
                    <option>Feminino</option>
                  </Field>
                </Col>
              </Row>
              <Row form>
                <Col md="3">
                  <Field
                    type="date"
                    name="nascimento"
                    label="Data de nascimento"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="5">
                  <Field
                    name="cpf"
                    label="CPF"
                    component={FieldInput}
                    disabled={!editar}
                    parse={formatString(mask.cpf)}
                  />
                </Col>
                <Col md="4">
                  <Field
                    name="rg"
                    label="RG"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card style={{ marginBottom: 15 }}>
            <CardBody>
              <Row form>
                <Col md="5">
                  <Field
                    name="estadocivil"
                    label="Estado civil"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="7">
                  <Field
                    name="profissao"
                    label="Profissão"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="5">
                  <Field
                    type="tel"
                    name="telefone"
                    label="Telefone"
                    component={FieldInput}
                    disabled={!editar}
                    validate={required}
                    parse={formatString(mask.telefone)}
                  />
                </Col>
                <Col md="7">
                  <Field
                    name="email"
                    label="Email"
                    component={FieldInput}
                    disabled={!editar}
                    validate={required}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="4">
                  <Field
                    name="plano"
                    label="Plano de saúde"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="8">
                  <Field
                    name="numplano"
                    label="Numero do plano"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card style={{ marginBottom: 15 }}>
            <CardBody>
              <Row form>
                <Col md="6">
                  <Field
                    name="endereco"
                    label="Endereço/Rua"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="2">
                  <Field
                    name="numero"
                    label="Numero"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="4">
                  <Field
                    name="cep"
                    label="CEP"
                    component={FieldInput}
                    disabled={!editar}
                    parse={formatString(mask.cep)}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="4">
                  <Field
                    name="bairro"
                    label="Bairro"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="5">
                  <Field
                    name="cidade"
                    label="Cidade"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
                <Col md="3">
                  <Field
                    name="estado"
                    label="Estado"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12">
                  <Field
                    name="complemento"
                    label="Complemento"
                    component={FieldInput}
                    disabled={!editar}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Center>
            {editar ? (
              <>
                <Button
                  className="mr-2"
                  color="warning"
                  onClick={() => setEditar(false)}
                >
                  Cancelar
                </Button>
                <Button color="success" onClick={handleSubmit}>
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="mr-2"
                  color="danger"
                  onClick={() => setModalDelete(true)}
                >
                  Apagar
                </Button>
                <Button color="primary" onClick={() => setEditar(true)}>
                  Editar
                </Button>
              </>
            )}
          </Center>
          <Modal isOpen={modalDelete} toggle={toggle}>
            <ModalHeader className="bg-danger text-white" toggle={toggle}>
              Apagar Cliente {dados && dados.nome}?
            </ModalHeader>
            <ModalBody>
              <p>
                Tem certeza que deseja <strong>DELETAR</strong> o usuário{" "}
                <strong>{dados && dados.nome}</strong> do sistema?
              </p>
              <p>
                Ao confirmar todos os dados deste usuário seram deletados e não
                poderar ser revertido
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Cancelar
              </Button>{" "}
              <Button color="danger" onClick={deletarUsuario}>
                Confirmar
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    />
  );
}

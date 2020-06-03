import React, { useState, useEffect } from "react";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { firestore, auth, storage } from "firebase/app";
import moment from "moment";
import "moment/locale/pt-br";
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";
import PostFiles from "./PostFiles";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Button,
  Card,
  CardBody,
  Collapse,
} from "reactstrap";

import FileList from "./FileList";

import Foto from "../../assets/profile-user.png";
import { Title, Perfil, Arquivos, BtnInteraction } from "../style";
import { useFirestoreSubCollection, useFirestoreDoc } from "../../utils";
import FirebaseStorageUpload from "../../FirebaseStorageUpload";

interface UploadFile {
  file: File;
  id: number;
  name: string;
  reacableSize: number;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

type UploadFileWithoutProgress = Omit<UploadFile, "progress, file">;

function ItemHistorico({ data }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Card style={{ marginBottom: 20 }}>
      <Button onClick={toggle} color="info" outline block>
        <Row form className={"d-flex align-items-center"}>
          <Perfil className="img-fluid mr-3" src={data.avatar || Foto} />
          {data.nome}
          <br />
          {data.date
            ? moment(data.date.toDate()).format("DD/MM/YYYY HH:mm")
            : ""}
        </Row>
      </Button>
      <Collapse isOpen={isOpen}>
        <CardBody>
          <Row key={data.key}>
            <Col md={12}>
              <hr />
            </Col>
            <Col md={8}>{data.text}</Col>
            <Col md={4}>{data.docs && <PostFiles file={data.docs} />}</Col>
          </Row>
        </CardBody>
      </Collapse>
    </Card>
  );
}

export default function Interacao({ id }: { id: string }) {
  const [posts] = useFirestoreSubCollection<Post>(
    "clientes",
    id,
    "interactions"
  );
  const user = auth().currentUser as { uid: string; displayName: string };
  const [usuario] = useFirestoreDoc<Usuarios>("usuarios", user?.uid);
  const [text, setText] = useState("");
  const [send, setSend] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [toUp, setToUp] = useState<any>([]);
  console.log(posts);
  useEffect(() => {
    const docs = uploadedFiles.map((item) => ({
      name: item.name,
      url: item.url,
      size: item.file.size,
      contentType: item.file.type,
    }));
    setToUp(docs);
  }, [uploadedFiles]);

  function handleUpload(files: File[]) {
    setSend(false);
    const uploadFiles: UploadFile[] = files.map((file: File) => ({
      file,
      id: +uniqueId(),
      name: file.name,
      reacableSize: file.size,
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles([...uploadedFiles, ...uploadFiles]);
    uploadFiles.forEach(upServer);
  }

  async function handleDelete(uploadId: number, fileName: string) {
    await storage()
      .ref(`/docs/${id}/post/${fileName}`)
      .delete();

    setUploadedFiles((files) => {
      return files.filter((file) => file.id !== uploadId);
    });
  }

  async function updateFile(id: number, data: Partial<UploadFile>) {
    setUploadedFiles((files) => {
      return files.map((file) =>
        id === file.id ? { ...file, ...data } : file
      );
    });
  }
  function upServer(upload: UploadFile) {
    new FirebaseStorageUpload(`/docs/${id}/post`, upload.file)
      .start(upload.name)
      .onProgress((p) => updateFile(upload.id, { progress: p * 100 }))
      .onGetDownloadUrl((url) => {
        updateFile(upload.id, { uploaded: true, url: url });
      });
  }
  function addText() {
    if (text) {
      firestore()
        .collection("clientes")
        .doc(id)
        .collection("interactions")
        .add({
          postId: posts.length + 1,
          text: text,
          date: firestore.Timestamp.now(),
          uid: user.uid,
          nome: usuario && usuario.nome,
          avatar: (usuario && usuario.avatar) || "",
          docs: toUp,
        });
    } else {
      alert("Você não inseriu nenhum texto");
    }
    setUploadedFiles([]);
    setText("");
  }
  return (
    <>
      <Title>
        <SwapHorizIcon />
        Interação
      </Title>
      {posts.map((post) => (
        <ItemHistorico key={post.key} data={post} />
      ))}

      <Card style={{ marginBottom: 20 }}>
        <CardBody>
          <Row>
            <Col md={12}>
              <Row form>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      rows="5"
                      type="textarea"
                      name="text"
                      id="exampleText"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  {uploadedFiles.length ? (
                    <FileList
                      file={uploadedFiles}
                      onDelete={handleDelete}
                      onFinish={setSend}
                    />
                  ) : (
                    "Adicione os Arquivos"
                  )}
                </Col>
              </Row>
              <BtnInteraction>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={addText}
                  type="button"
                  disabled={send}
                >
                  Enviar
                </Button>
                <Dropzone onDrop={handleUpload}>
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                  }) => (
                    <div {...getRootProps()}>
                      <Button>Arquivos</Button>
                      <Arquivos {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </BtnInteraction>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

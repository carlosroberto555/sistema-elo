import React, { useState, useEffect } from "react";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { firestore, auth, storage } from "firebase/app";
import moment from "moment";
import "moment/locale/pt-br";
import Dropzone from "react-dropzone";
import { uniqueId } from "lodash";
import PostFiles from "./PostFiles";
import { Row, Col, Input, FormGroup, Button, Card, CardBody } from "reactstrap";

import FileList from "./FileList";

import Foto from "../../assets/profile-user.png";
import {
  Container,
  Title,
  Containerperfil,
  Campocolor,
  Perfil,
  Arquivos,
  BtnInteraction,
} from "../style";
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

export default function Interacao({ id }: { id: string }) {
  const [posts] = useFirestoreSubCollection<Post>(
    "clientes",
    id,
    "interactions"
  );
  const [caso, snap] = useFirestoreDoc<Caso>("casos", id);
  const user = auth().currentUser as { uid: string; displayName: string };
  const [analista] = useFirestoreDoc<Usuarios>("usuarios", user?.uid);
  const [text, setText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [toUp, setToUp] = useState<any>([]);

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

  // async function upServer(upload: UploadFile) {
  //   storage()
  //     .ref(`/docs/${id}/post/${upload.name}`)
  //     .put(upload.file)
  //     .on(storage.TaskEvent.STATE_CHANGED, snap => {
  //       const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
  //       updateFile(upload.id, { progress })
  //         .then(() => {
  //           snap.ref
  //             .getDownloadURL()
  //             .then(url => {
  //               updateFile(upload.id, { uploaded: true, url: url });
  //             })
  //             .catch(() => {
  //               updateFile(upload.id, { error: true });
  //             });
  //         });
  //     });
  // }

  function upServer(upload: UploadFile) {
    new FirebaseStorageUpload(`/docs/${id}/post`, upload.file)
      .start(upload.name)
      .onProgress((p) => updateFile(upload.id, { progress: p * 100 }))
      .onGetDownloadUrl((url) => {
        updateFile(upload.id, { uploaded: true, url: url });
      });
    // .onFinish(snap => {
    //   console.log("chegou no finish");
    // });
  }

  function update(status: number) {
    snap && snap.ref.update({ status });
  }

  function addText() {
    if (text) {
      firestore()
        .collection("clientes")
        .doc(id)
        .collection("interactions")
        .add({
          text: text,
          date: firestore.Timestamp.now(),
          uid: user.uid,
          nome: user.displayName,
          // avatar: analista?.avatar,
          docs: toUp,
        });
    } else {
      alert("Você não inseriu nenhum texto");
    }
    setUploadedFiles([]);
    setText("");
    if (caso?.status === 6) {
      update(3);
    }
  }
  return (
    <>
      <Title>
        <SwapHorizIcon />
        Interação
      </Title>
      {posts.map((post) => (
        <Card style={{ marginBottom: 20 }}>
          <CardBody>
            <Row key={post.key}>
              <Col md={12}>
                <Row form className={"d-flex align-items-center"}>
                  <Col md={1}>
                    <Perfil className="img-fluid" src={post.avatar || Foto} />
                  </Col>
                  <Col md={11}>
                    {post.nome}
                    <br />
                    {post.date
                      ? moment(post.date.toDate()).format("DD/MM/YYYY HH:mm")
                      : ""}
                  </Col>
                </Row>
                <hr />
              </Col>
              <Col md={9}>{post.text}</Col>
              <Col md={3}>{post.docs && <PostFiles file={post.docs} />}</Col>
            </Row>
          </CardBody>
        </Card>
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
                    <FileList file={uploadedFiles} onDelete={handleDelete} />
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

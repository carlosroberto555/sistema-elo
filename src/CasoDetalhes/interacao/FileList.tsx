import React from "react";
import docsIcon from "../../assets/docs.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import filesize from "filesize";

import { FileInfo, Container } from "./styles";
import { Icon } from "../style";

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
export default function FileList({
  file,
  onDelete,
  onFinish,
}: {
  file: any;
  onDelete: any;
  onFinish: any;
}) {
  return (
    <Container>
      {file.map((uploaded: UploadFile) => (
        <li key={uploaded.id}>
          <FileInfo>
            <Icon src={docsIcon} />
            <div>
              <strong>{uploaded.name}</strong>
              <span>
                {filesize(uploaded.reacableSize)}{" "}
                {!!uploaded.url && (
                  <button onClick={() => onDelete(uploaded.id, uploaded.name)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>
          {onFinish(!uploaded.uploaded)}
          <div>
            {!uploaded.uploaded && !uploaded.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" },
                }}
                strokeWidth={10}
                value={uploaded.progress}
              />
            )}
            {uploaded.url && (
              <a href={uploaded.url} target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploaded.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {uploaded.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}

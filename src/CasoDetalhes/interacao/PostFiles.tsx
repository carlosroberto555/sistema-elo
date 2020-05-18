import React from "react";
import docsIcon from "../../assets/docs.png";
import { MdCheckCircle, MdLink } from "react-icons/md";

import { FileInfo, Container } from "./styles";
import { Icon } from "../style";

interface docs {
  id: number;
  name: string;
  reacableSize: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string;
}
export default function PostFiles({ file }: { file: any }) {
  return (
    <Container>
      {file.map((arquivo: docs) => (
        <li key={arquivo.id}>
          <FileInfo>
            <Icon src={docsIcon} />
            <div>
              <strong>{arquivo.name}</strong>
              <span>{arquivo.reacableSize}</span>
            </div>
          </FileInfo>
          <div>
            <a href={arquivo.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
            <MdCheckCircle size={24} color="#78e5d5" />
          </div>
        </li>
      ))}
    </Container>
  );
}
